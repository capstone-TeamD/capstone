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
