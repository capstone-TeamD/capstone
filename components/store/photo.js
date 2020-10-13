import * as firebase from 'firebase';
import 'firebase/firestore';
import { firebaseConfig } from '../../firebaseConfig';

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
    // get user by uid using the get method

    const allPhotos = [];
    await db
      .collection('photos')
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // console.log(doc.id, ' => ', doc.data());
          const data = doc.data();
          // console.log('photoID', doc.id);
          // console.log('photoURI', data.image);
          allPhotos.push({ id: doc.id, imageURI: data.image });
        });
      });

    dispatch(getPhotos(allPhotos));
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
