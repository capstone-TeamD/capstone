// get current date and last update time
// const currentMs = Date.now()
// const currentDate = new Date(currentMs)
// const currentTime = currentDate.toLocaleTimeString('en-GB')
// const currentDay = currentDate.toLocaleDateString('end-GB')

// currentDate = { currentTime: currentDate.toLocaleTimeString('en-GB'), currentDay: currentDate.toLocaleDateString('end-GB') }

//last updated
// updateDate = {
//   updateTime: 10,
//   updateDay: 10,
//   updatetimeStamp: 10 //Date.now() ms
// }

if ((currentMs - updateDate.updatetimeStamp) > 86400000) {
  //more than one day has passed since update
  //update from database
} else {
  if (currentDate.currentDay === updateDate.currentDay) {
    if (currentDate.currentTime.slice(0, 2) > 7 && updateDate.updateTime.slice(0 , 2) < 7) {
      //last update was before 7AM
      // update from database
    } else {
      // load from local storage
    }
  } else {
    if (updateDate.updateTime.slice(0 , 2) < 7) {
      //last update was before 7AM && currentDay is +1 from updateDate
      ///update from database
    }
  }
}

const UPDATE_DATE = 'UPDATE_DATE';
const updateDateAction = (updateDate) => ({
  type: UPDATE_DATE,
  updateDate
})

export const fetchUpdate = (updateDate) => async (dispatch) => {
  const currentMs = Date.now()
  const currentDate = new Date(currentMs)
  const currentTime = currentDate.toLocaleTimeString('en-GB')
  const currentDay = currentDate.toLocaleDateString('end-GB')

  currentDate = { currentTime: currentDate.toLocaleTimeString('en-GB'), currentDay: currentDate.toLocaleDateString('end-GB') }

  const allPhotos = [];
  await db
    .collection('postcards')
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const data = doc.data();
        allPhotos.push({
          id: doc.id,
          username: data.creatorName,
          dateCreated: data.dateCreated,
          imageURI: data.imageURI,
        });
      });
    });

  const dir = `${FileSystem.cacheDirectory}postcards`;

  updateDateObj = {
    updateTime: currentTime,
    updateDay: currentDay,
    updatetimeStamp: Date.now()
  }
  

  if ((currentMs - updateDate.updatetimeStamp) > 86400000) {
    //more than one day has passed since update
    //update from database
    fetchDatabase(allPhotos, dir)
    dispatch(updateDateAction(updateDateObj))
  } else {
    if (currentDate.currentDay === updateDate.currentDay) {
      if (currentDate.currentTime.slice(0, 2) > 7 && updateDate.updateTime.slice(0 , 2) < 7) {
        //last update was before 7AM
        // update from database
        fetchDatabase(allPhotos, dir)
        dispatch(updateDateAction(updateDateObj))
      } else {
        // load from local storage
        loadFromCache(allPhotos, dir)
      }
    } else {
      if (updateDate.updateTime.slice(0 , 2) < 7) {
        //last update was before 7AM && currentDay is +1 from updateDate
        ///update from database
        fetchDatabase(allPhotos, dir)
        dispatch(updateDateAction(updateDateObj))
      } else {
        loadFromCache(allPhotos, dir)
      }
    }
  }

}

//updates from database if dispatch is canceled
const fetchDatabase = (allPhotos, dir) => async (dispatch) => {

  //read what is listed in directory, if no directory exist then makedir
  const {exists} = await FileSystem.getInfoAsync(dir)
  if (!exists) {
    await FileSystem.makeDirectoryAsync(dir)
  }
  // const localPostcards = await FileSystem.readDirectoryAsync(dir)

  console.log('from database')
  //delete local storage postcard directory and make new directory
  await FileSystem.deleteAsync(dir)
  await FileSystem.makeDirectoryAsync(dir)
  // download to local storage / cache
  const localPostcards = []
  allPhotos.forEach(async postcardDB => {
    const newUrl = await FileSystem.downloadAsync(postcardDB.imageURI, FileSystem.cacheDirectory + 'postcards//' + postcardDB.id)
      .then(() => {
        console.log('finsh downloading')
      }).catch(error => {
        console.error(error)
    })
    localPostcards.push({imageId: postcardDB.id, imageURL: newUrl.uri})
  })
  // dispatch(getPhotos(allPhotos))
  loadFromCache(localPostcards, dir)
}

const loadFromCache = (localPostcards, dir) => async (dispatch) => {
  const newPostcards = async () => Promise.all(localPostcards.map(async postcard => {
    const newURL =  await FileSystem.getInfoAsync(dir + `/${postcard.imageId}`)
    postcard.imageURL = newURL.uri
    return postcard
  }))
  newPostcards().then(data => dispatch(getPhotos(data)))
}

export const fetchPhotos = () => async (dispatch) => {
  try {
    
    const allPhotos = [];
    await db
      .collection('postcards')
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const data = doc.data();
          allPhotos.push({
            id: doc.id,
            username: data.creatorName,
            dateCreated: data.dateCreated,
            imageURI: data.imageURI,
          });
        });
      });

    //directory name
    const dir = `${FileSystem.cacheDirectory}postcards`;

    //read what is listed in directory, if no directory exist then makedir
    const {exists} = await FileSystem.getInfoAsync(dir)
    if (!exists) {
      await FileSystem.makeDirectoryAsync(dir)
    }
    const localPostcards = await FileSystem.readDirectoryAsync(dir)
    
    if (localPostcards.length === allPhotos.length) {
      // if local storage has all postcards, take from local storage
      console.log('from storage')
      const newPostcards = async () => Promise.all(allPhotos.map(async postcard => {
        const newURL =  await FileSystem.getInfoAsync(dir + `/${postcard.id}`)
        postcard.imageURI = newURL.uri
        return postcard
      }))
      newPostcards().then(data => dispatch(getPhotos(data)))
    } else {
      // if local storage has no postcards or lengh in database !== localPostcards
      console.log('from database')
      //delete local storage postcard directory and make new directory
      await FileSystem.deleteAsync(dir)
      await FileSystem.makeDirectoryAsync(dir)
      // download to local storage / cache
      allPhotos.forEach(async postcardDB => {
        await FileSystem.downloadAsync(postcardDB.imageURI, FileSystem.cacheDirectory + 'postcards//' + postcardDB.id)
          .then(() => {
            console.log('finsh downloading')
          }).catch(error => {
            console.error(error)
        })
      })
      dispatch(getPhotos(allPhotos))
    }

  } catch (error) {
    alert(error);
  }
};