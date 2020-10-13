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
    // check if discover needs to fetch data from the database
    // access local storage to get the amount of photos in database (array length)
    // if localStorage length === collection length , get from local storage

    //find collection length

    const allPhotos = [];
    await db
      .collection('postcards')
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // console.log(doc.id, ' => ', doc.data());
          const data = doc.data();
          // console.log('photoID', doc.id);
          // console.log('photoURI', data.image);
          allPhotos.push({ id: doc.id, imageURI: data.imageURI });
        });
      });

    //directory name
    const dir = `${FileSystem.cacheDirectory}postcards`;
    console.log(allPhotos)

    //read what is listed in directory
    const localPostcards = await FileSystem.readDirectoryAsync(dir)
    // console.log('localPostcards', localPostcards)
    
    if (localPostcards.length === allPhotos.length) {
      console.log('here')
      // if local storage has all postcards, take from local storage
      console.log('localPostcards', localPostcards)
      const mapArr = localPostcards.map(async postcard => {
        const info =  await FileSystem.getInfoAsync(dir + `/${postcard}`)
        // console.log(postcard, info.uri)
        return info.uri
      })
      // allPhotos = localPostcards
      // console.log(mapArr)
    } else {

      console.log('from firestore')
      // if local storage has no postcards or amt in database !== localPostcards

      //delete local storage postcard directory and reload directory
      await FileSystem.deleteAsync(dir)
      await FileSystem.makeDirectoryAsync(dir)

      //download to directory -- replace URI with imageURI and id can be used as the name
      allPhotos.forEach(async postcardDB => {
        await FileSystem.downloadAsync(postcardDB.imageURI, FileSystem.cacheDirectory + 'postcards//' + postcardDB.id).then(() => {
          console.log('finsh downloading')
        }).catch(error => {
          console.log(uri)
          console.error(error)
        })
      })
    }

    dispatch(getPhotos(allPhotos))

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
