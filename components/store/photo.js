import * as firebase from "firebase";
import "firebase/firestore";
import { firebaseConfig } from "../../firebaseConfig";

// initialize app
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

// ACTION TYPES
export const GET_ALL_PHOTOS = "GET_ALL_PHOTOS";
export const DELETE_PHOTO = "DELETE_PHOTO";

// ACTION CREATORS
export const getPhotos = (photos) => ({ type: GET_ALL_PHOTOS, photos });
export const deletePhoto = (photo) => ({ type: DELETE_PHOTO, photo });

// THUNK CREATORS

// fetch the photo data (links)
export const fetchPhotos = () => async (dispatch) => {
  try {
    // get user by uid using the get method

    const allPhotos = [];
    await db
      .collection("postcards")
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

// delete a photo in the user's gallery
export const deleteSinglePhoto = (photo) => async (dispatch) => {
  try {
    console.log(photo.id)
    await db
      .collection("photos")
      .doc(photo.id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
      console.log("dispatch")
      dispatch(deletePhoto(photo.id));
  } catch (error) {
    alert(error);
  }
};

// REDUCER
export default function photo(state = {}, action) {
  switch (action.type) {
    case GET_ALL_PHOTOS:
      return action.photos;
    case DELETE_PHOTO:
      const filteredPhotos = state.filter((photo) => photo.id !== action.id);
      return filteredPhotos;
    default:
      return state;
  }
}
