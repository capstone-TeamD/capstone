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

// ACTION CREATORS
export const getPhotos = (photos) => ({ type: GET_ALL_PHOTOS, photos });

// THUNK CREATORS

// fetch the photo data (links)
export const fetchPhotos = () => async (dispatch) => {
  try {
    const allPhotos = [];
    await db
      .collection('postcards')
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // console.log(doc.id, ' => ', doc.data());
          const data = doc.data();
          // console.log('postcard ID', doc.id);
          // console.log('username', data.creatorName);
          // console.log('photoURI', data.imageURI);
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
      const newPostcards = async () => Promise.all(allPhotos.map(async postcard => {
        const newURL =  await FileSystem.getInfoAsync(dir + `/${postcard.id}`)
        postcard.imageURI = newURL.uri
        return postcard
      }))
      newPostcards().then(data => dispatch(getPhotos(data)))
    } else {
      // if local storage has no postcards or lengh in database !== localPostcards

      //delete local storage postcard directory and make new directory
      await FileSystem.deleteAsync(dir)
      await FileSystem.makeDirectoryAsync(dir)

      //download to local storage / cache
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

// REDUCER
export default function photo(state = {}, action) {
  switch (action.type) {
    case GET_ALL_PHOTOS:
      return action.photos;
    default:
      return state;
  }
}
