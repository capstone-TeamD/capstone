import * as firebase from 'firebase';
import 'firebase/firestore';
import { firebaseConfig } from '../../firebaseConfig';
import * as FileSystem from 'expo-file-system';
// import {getUser} from './user'

// initialize app
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

// ACTION TYPES
export const GET_ALL_PHOTOS = "GET_ALL_PHOTOS";
export const DELETE_PHOTO = "DELETE_PHOTO";
export const GET_PROFILE_PHOTOS = 'GET_PROFILE_PHOTOS';

// ACTION CREATORS
export const getPhotos = (photos) => ({ type: GET_ALL_PHOTOS, photos });
export const deletePhoto = (id) => ({ type: DELETE_PHOTO, id });
export const getProfilePhotos = (photos) => ({ type: GET_PROFILE_PHOTOS, profile: photos });

// THUNK CREATORS

// fetch the photo data (links)
export const fetchPhotos = () => async (dispatch) => {
  try {
    
    const allPhotos = [];
    await db
      .collection("postcards")
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
      console.log('discover from storage', allPhotos)
      const newPostcards = async () => Promise.all(allPhotos.map(async postcard => {
        const newURL =  await FileSystem.getInfoAsync(dir + `/${postcard.id}`)
        postcard.imageURI = newURL.uri
        return postcard
      }))
      newPostcards().then(data => dispatch(getPhotos(data)))
    } else {
      // if local storage has no postcards or lengh in database !== localPostcards
      console.log('discover from database')
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
      // allPhotos = []

      dispatch(getPhotos(allPhotos))
    }

  } catch (error) {
    alert(error);
  }
};

const UPDATE_DATE = 'UPDATE_DATE';
const updateDateAction = (updateDate) => ({
  type: UPDATE_DATE,
  updateDate
})

export const fetchUpdate = (updateDate) => async (dispatch) => {
  if (updateDate === undefined) {
    const currentMs = Date.now()
    const currentDateForm = new Date(currentMs)
    const currentTime = currentDateForm.toLocaleTimeString('en-GB')
    const currentDay = currentDateForm.toLocaleDateString('end-GB')
    updateDateObj = {
      updateTime: currentTime,
      updateDay: currentDay,
      updatetimeStamp: Date.now()
    }
    updateDate = updateDateObj
  }
  const currentMs = Date.now()
  const currentDateForm = new Date(currentMs)
  const currentTime = currentDateForm.toLocaleTimeString('en-GB')
  const currentDay = currentDateForm.toLocaleDateString('end-GB')

  currentDate = { currentTime, currentDay}

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


  console.log('updateDate', updateDate)

  console.log('timedif', currentMs - updateDate.updatetimeStamp)
  if ((currentMs - updateDate.updatetimeStamp) > 86400000) {
    //more than one day has passed since update
    //update from database
    console.log('here1')
    fetchDatabase(allPhotos, dir)
    dispatch(updateDateAction(updateDateObj))
  } else {
    if (currentDate.currentDay === updateDate.currentDay) {
      if (currentDate.currentTime.slice(0, 2) > 7 && updateDate.updateTime.slice(0 , 2) < 7) {
        //last update was before 7AM
        // update from database
        console.log('here2')
        dispatch(fetchDatabase(allPhotos, dir))
        dispatch(updateDateAction(updateDateObj))
      } else {
        // load from local storage
        console.log('here3')
        loadFromCache(allPhotos, dir)
      }
    } else {
      if (updateDate.updateTime.slice(0 , 2) < 7) {
        //last update was before 7AM && currentDay is +1 from updateDate
        ///update from database
        console.log('here4')
        dispatch(fetchDatabase(allPhotos, dir))
        loadFromCache(allPhotos,dir, updateDate )
      } else {
        console.log('here5')
        dispatch(loadFromCache(allPhotos, dir))
      }
    }
  }

}

//updates from database if dispatch is canceled
const fetchDatabase = (allPhotos, dir) => async (dispatch) => {
  console.log('firstfunc')
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
        console.log('postcardDB', postcardDB)
        console.log('finsh downloading')
      }).catch(error => {
        console.error(error)
    })
    localPostcards.push({imageId: postcardDB.id, imageURL: newUrl.uri})
  })
  // return localPostcards
  // dispatch(getPhotos(allPhotos))
  loadFromCache(localPostcards, dir)
}

const loadFromCache = (localPostcards, dir) => async (dispatch) => {
  console.log('localPostcards', localPostcards)
  const newPostcards = async () => Promise.all(localPostcards.map(async postcard => {
    console.log(postcard)
    const newURL =  await FileSystem.getInfoAsync(dir + `/${postcard.id}`)
    postcard.imageURL = newURL.uri
    return postcard
  }))
  newPostcards().then(data => {
    dispatch(getPhotos(data))
    dispatch(updateDateAction(updateDate))
  })
}

// delete a photo in the user's gallery
export const deleteSinglePhoto = (id, userId, firebaseURL) => async (dispatch) => {
  try {
    console.log("photo ID", id)
    await db
      .collection("postcards")
      .doc(id)
      .delete()
      .then(async function () {
        console.log("Document successfully deleted!");

        await db.collection("users")
        .doc(userId)
        .update({postcards: firebase.firestore.FieldValue.arrayRemove({
          imageId: id,
          imageURL: firebaseURL
        })}).then(() => {console.log("deleted from user database")})
        .catch(function (error) {
          console.error("error removing image from user", error)
        })
        
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
      await dispatch(deletePhoto(id));

  } catch (error) {
    alert(error);
  }
};


//profile photo fetch
export const profilePhotos = (profilePhotosArr) => async (dispatch) => {

  const profileDir = `${FileSystem.cacheDirectory}profile`;
  const {exists} = await FileSystem.getInfoAsync(profileDir);

  if (!exists) {
    await FileSystem.makeDirectoryAsync(profileDir)
  }
  const localPostcards = await FileSystem.readDirectoryAsync(profileDir)
  // console.log('localPostcards', localPostcards)

  if (localPostcards.length === profilePhotosArr.length) {
    console.log('profile from storage')
    const newPostcards = async () => Promise.all(profilePhotosArr.map(async postcard => {
      const newURL =  await FileSystem.getInfoAsync(profileDir + `/${postcard.imageId}`)
      postcard.firebaseURL = postcard.imageURL
      postcard.imageURL = newURL.uri
      return postcard
    }))
    newPostcards().then(data => dispatch(getProfilePhotos(data)))
  } else {
    // if local storage has no postcards or lengh in database !== localPostcards
    console.log('profile from database')
    // delete local storage postcard directory and make new directory
    await FileSystem.deleteAsync(profileDir)
    await FileSystem.makeDirectoryAsync(profileDir)

    // download to local storage / cache
    const postcardLinks = []

    profilePhotosArr.forEach(async postcardDB => {
      console.log(postcardDB)
      await FileSystem.downloadAsync(postcardDB.imageURL, FileSystem.cacheDirectory + `profile//` + postcardDB.imageId)
        .then((data) => {
          console.log("finsh downloading")
          postcardLinks.unshift({imageId: postcardDB.imageId, imageURL: data.uri, FirebaseURL: postcardDB.imageURL})
        }).catch(error => {
          console.error(error)
      })
    })
    dispatch(getProfilePhotos(postcardLinks))
    // console.log('postcardLinks', postcardLinks)
  }
}

const intialState = {
  photos: [],
  profile: [],
}

// REDUCER
export default function photo(state = intialState,  action) {
  switch (action.type) {
    case GET_ALL_PHOTOS:
      return {...state, photos: action.photos};
    case DELETE_PHOTO:
      const filteredPhotos = state.profile.filter((photo) => photo.id !== action.id);
      return {...state, profile: filteredPhotos};
    case GET_PROFILE_PHOTOS:
      return {...state, profile: action.profile};
    case UPDATE_DATE:
      return 'inreducer'
      // return action.updateDate;
      return {...state, profile: action.profile};
    default:
      return state;
  }
}
