import * as firebase from 'firebase';
import 'firebase/firestore';
import { firebaseConfig } from '../../firebaseConfig';
import * as FileSystem from 'expo-file-system';

// initialize app
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

// ACTION TYPES
export const GET_ALL_PHOTOS = 'GET_ALL_PHOTOS';
export const DELETE_PHOTO = 'DELETE_PHOTO';
export const GET_PROFILE_PHOTOS = 'GET_PROFILE_PHOTOS';
export const ADD_PHOTO = 'ADD_PHOTO';

// ACTION CREATORS
export const getPhotos = (photos) => ({ type: GET_ALL_PHOTOS, photos });
export const deletePhoto = (id) => ({ type: DELETE_PHOTO, id });
export const getProfilePhotos = (photos) => ({
  type: GET_PROFILE_PHOTOS,
  profile: photos,
});
export const addPhotoToProfile = (newPhotoObj) => ({
  type: ADD_PHOTO,
  newPhotoObj,
});

// THUNK CREATORS

//pull update for featured daily
export const fetchUpdate = (currentId) => async (dispatch) => {
  try {
    //get the firestore postcards
    const allPhotos = [];
    let lastUpdate;
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

    const user = await db.collection('users').doc(currentId).get();
    const userData = user.data();
    lastUpdate = userData.discoverUpdate;

    //check if discover needs to be updated
    if (lastUpdate === undefined) {
      //in lastupdate is undefined, then return update object
      const currentMs = Date.now();
      const currentDateForm = new Date(currentMs);
      const currentTime = currentDateForm.toLocaleTimeString('en-GB');
      const currentDay = currentDateForm.toLocaleDateString('end-GB');
      updateDateObj = {
        currentTime,
        currentDay,
        timeStamp: Date.now(),
        //timestamp^ is used to calculate is more than one day has passed
      };
      lastUpdate = updateDateObj;
    }
    const currentMs = Date.now();
    const currentDateForm = new Date(currentMs);
    const currentTime = currentDateForm.toLocaleTimeString('en-GB');
    const currentDay = currentDateForm.toLocaleDateString('end-GB');

    currentDate = { currentTime, currentDay, timeStamp: Date.now() };

    const dir = `${FileSystem.cacheDirectory}postcards`;
    const localPostcards = await localStorageDirExist(dir);

    if (currentMs - lastUpdate.timeStamp === 0) {
      //first ever entry into featured daily
      console.log('new');
      dispatch(fetchDatabase(allPhotos, dir));
      discoverUpdateFirestore(currentId, currentDate);
    } else if (currentMs - lastUpdate.timeStamp > 86400000) {
      //more than one day has passed since update
      //update from database
      console.log('here1');
      dispatch(fetchDatabase(allPhotos, dir));
      discoverUpdateFirestore(currentId, currentDate);
    } else {
      if (currentDate.currentDay === lastUpdate.currentDay) {
        if (
          currentDate.currentTime.slice(0, 2) >= 7 &&
          lastUpdate.currentTime.slice(0, 2) < 7
        ) {
          //last update was before 7AM
          // update from database
          console.log('here2');
          dispatch(fetchDatabase(allPhotos, dir));
          discoverUpdateFirestore(currentId, currentDate);
        } else {
          // load from local storage
          console.log('here3');
          dispatch(loadFromCache(localPostcards, dir));
          discoverUpdateFirestore(currentId, lastUpdate);
        }
      } else {
        if (currentDate.currentTime.slice(0, 2) >= 7) {
          //last update was before 7AM && currentDay is +1 from lastUpdate
          ///update from database
          console.log('here4');
          dispatch(fetchDatabase(allPhotos, dir));
          discoverUpdateFirestore(currentId, currentDate);
        } else {
          console.log('here5');
          console.log(localPostcards);
          dispatch(loadFromCache(localPostcards, dir));
          discoverUpdateFirestore(currentId, lastUpdate);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};

//downloading photos into local storage
const fetchDatabase = (allPhotos, dir) => async (dispatch) => {
  try {
    console.log('fetch from database');
    //read what is listed in directory, if no directory exist then makedir
    const { exists } = await FileSystem.getInfoAsync(dir);
    if (exists) {
      await FileSystem.deleteAsync(dir);
    }
    await FileSystem.makeDirectoryAsync(dir);

    const databaseLength = allPhotos.length;
    const localPostcards = [];

    //create an array of the random numbers or generating featured daily
    const randomFiveNums = (totalPostcardAmt) => {
      while (localPostcards.length < 10) {
        const num = Math.floor(Math.random() * Math.max(totalPostcardAmt));
        if (!localPostcards.includes(num)) {
          localPostcards.push(num);
        }
      }
    };
    randomFiveNums(databaseLength);

    //downloading from database to local storage
    const postcardLink = async () =>
      Promise.all(
        localPostcards.map(async (postcardNum) => {
          const postcardDB = allPhotos[postcardNum];
          console.log(postcardDB);
          await FileSystem.downloadAsync(
            postcardDB.imageURI,
            FileSystem.cacheDirectory +
              'postcards//' +
              postcardDB.username +
              '-' +
              postcardDB.id
          )
            .then(() => {
              console.log('finsh downloading');
            })
            .catch((error) => {
              console.error(error);
            });
          return { imageId: postcardDB.id, username: postcardDB.username };
        })
      );
    postcardLink().then((data) => {
      console.log('dispatch', data);
      dispatch(loadFromCache(data, dir));
    });
  } catch (err) {
    console.log(err);
  }
};

//loading photos from local storage
const loadFromCache = (localPostcards, dir) => async (dispatch) => {
  console.log('loadFromCache');
  try {
    const newPostcards = async () =>
      Promise.all(
        localPostcards.map(async (postcard) => {
          if (typeof postcard === 'string') {
            const newURL = await FileSystem.getInfoAsync(dir + `/${postcard}`);
            const indexsplit = postcard.indexOf('-');
            return {
              imageId: postcard.slice(indexsplit + 1),
              imageURI: newURL.uri,
              username: postcard.slice(0, indexsplit),
            };
          } else {
            const uri = postcard.username + '-' + postcard.imageId;
            const newURL = await FileSystem.getInfoAsync(dir + `/${uri}`);
            return {
              imageId: postcard.imageId,
              imageURI: newURL.uri,
              username: postcard.username,
            };
          }
        })
      );
    newPostcards().then((data) => {
      dispatch(getPhotos(data));
    });
  } catch (err) {
    console.log(err);
  }
};

//gets the discover update field
const discoverUpdateFirestore = async (userId, updateDate) => {
  await db
    .collection('users')
    .doc(userId)
    .update({
      discoverUpdate: updateDate,
    })
    .then(function () {
      console.log('Document successfully updated!');
    })
    .catch(function (error) {
      console.error('Error updating document: ', error);
    });
};

// delete a photo in the user's gallery
export const deleteSinglePhoto = (
  id,
  userId,
  firebaseURL,
  localURL,
  firebaseAudioURL
) => async (dispatch) => {
  try {
    const nameArr = firebaseURL.split('%')[1];
    const fileName = nameArr.split('.jpg')[0];
    const finalFile = fileName.slice(2);
    const photoRef = firebase.storage().ref().child(`photos/${finalFile}.jpg`);
    // TO DO: need to verify that photo file name is the same as audio file name during upload
    // const audioRef = firebase.storage().ref().child(`audio/${finalFile}.mp3`);
    await photoRef
      .delete()
      .then(async function () {
        console.log('Document successfully deleted from firebase storage');
        await db
          .collection('postcards')
          .doc(id)
          .delete()
          .then(async function () {
            console.log(
              'Document successfully deleted from cloud firestore - postcards'
            );
            const deleteObj = {
              imageId: id,
              imageURL: firebaseURL,
              audioURL: '',
            };
            if (firebaseAudioURL) {
              deleteObj.audioURL = firebaseAudioURL;
            }
            await db
              .collection('users')
              .doc(userId)
              .update({
                postcards: firebase.firestore.FieldValue.arrayRemove(deleteObj),
              })
              .then(async () => {
                console.log(
                  'Document successfully deleted from cloud firestore - user'
                );
                await FileSystem.deleteAsync(localURL)
                  .then(function () {
                    console.log(
                      'Document successfully deleted from local storage'
                    );
                    dispatch(deletePhoto(id));
                  })
                  .catch(function (error) {
                    console.error(
                      'Error removing document from local storage: ',
                      error
                    );
                  });
              })
              .catch(function (error) {
                console.error(
                  'Error removing document from cloud firestore - user: ',
                  error
                );
              });
          })
          .catch(function (error) {
            console.error(
              'Error removing document from cloud firestore - postcards: ',
              error
            );
          });
      })
      .catch(function (error) {
        console.error('Error removing document from firebase storage: ', error);
      });
  } catch (error) {
    alert(error);
  }
};

//create function to check if local storage exist to make code DRY
export const localStorageDirExist = async (dirName) => {
  const { exists } = await FileSystem.getInfoAsync(dirName);
  if (!exists) {
    await FileSystem.makeDirectoryAsync(dirName);
  }
  return await FileSystem.readDirectoryAsync(dirName);
};

//get profile photos 
export const profilePhotos = (profilePhotosArr) => async (dispatch) => {
  const profileDir = `${FileSystem.cacheDirectory}profile`;
  const localPostcards = await localStorageDirExist(profileDir);

  //check if firestore matches local storage
  if (localPostcards.length === profilePhotosArr.length) {
    console.log('profile photos loading from local storage');
    const newPostcards = async () =>
      Promise.all(
        profilePhotosArr.map(async (postcard) => {
          const newURL = await FileSystem.getInfoAsync(
            profileDir + `/${postcard.imageId}`
          );
          const audio = await FileSystem.getInfoAsync(
            `${FileSystem.cacheDirectory}audio` +
              `/${postcard.imageId}` +
              '.mp3'
          );
          if (audio.exists) {
            postcard.firebaseAudioURL = postcard.audioURL;
            postcard.audioURL = audio.uri;
          } else {
            postcard.firebaseAudioURL = '';
            postcard.audioURL = '';
          }
          postcard.firebaseURL = postcard.imageURL;
          postcard.imageURL = newURL.uri;
          return postcard;
        })
      );
    newPostcards().then((data) => dispatch(getProfilePhotos(data)));
  } else {
    // if local storage not up to date
    console.log('profile photos loading from database');

    await FileSystem.deleteAsync(profileDir);
    await FileSystem.makeDirectoryAsync(profileDir);

    const postcardLinks = [];

    profilePhotosArr.forEach(async (postcardDB) => {
      let audioURL = '';
      if (postcardDB.audioURL) {
        const newAudioURL = await FileSystem.downloadAsync(
          postcardDB.audioURL,
          FileSystem.cacheDirectory + 'audio/' + postcardDB.imageId + '.mp3'
        );
        audioURL = newAudioURL.uri;
      }
      await FileSystem.downloadAsync(
        postcardDB.imageURL,
        FileSystem.cacheDirectory + `profile/` + postcardDB.imageId
      )
        .then((data) => {
          console.log('finsh downloading');
          postcardLinks.unshift({
            imageId: postcardDB.imageId,
            imageURL: data.uri,
            FirebaseURL: postcardDB.imageURL,
            audioURL: audioURL,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });
    dispatch(getProfilePhotos(postcardLinks));
  }
};

const intialState = {
  photos: [],
  profile: [],
};

// REDUCER
export default function photo(state = intialState, action) {
  switch (action.type) {
    case GET_ALL_PHOTOS:
      return { ...state, photos: action.photos };
    case DELETE_PHOTO:
      const filteredPhotos = state.profile.filter(
        (photo) => photo.imageId !== action.id
      );
      return { ...state, profile: filteredPhotos };
    case GET_PROFILE_PHOTOS:
      return { ...state, profile: action.profile };
    case ADD_PHOTO:
      const currentPhotos = [...state.profile];
      currentPhotos.unshift(action.newPhotoObj);
      console.log('got to addPhoto in reducer');
      return { ...state, profile: currentPhotos };
    default:
      return state;
  }
}
