import * as firebase from 'firebase';
import 'firebase/firestore';
import { firebaseConfig } from '../../firebaseConfig';

// initialize app
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

// ACTION TYPES
export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";


// ACTION CREATORS
export const login = (user) => ({ type: LOGIN, user });
export const signup = (user) => ({ type: SIGNUP, user });

// THUNK CREATORS
export const loginUser = (email, password) => async (dispatch) => {
  try {
    // check to see if user credentials are authenticated or not
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    dispatch(getUser(response.user.uid));
  } catch (error) {
    alert(error);
  }
};

// fetch the user data
export const getUser = (uid) => async (dispatch) => {
  try {
    // get user by uid using the get method
    const user = await db.collection('users').doc(uid).get();
    dispatch(login(user.data() || null));
  } catch (error) {
    alert(error);
  }
};

// user signup and authentication
export const signupUser = (email, password, username) => async (dispatch) => {
  try {
    // create new user and save its credentials
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    // if user does not exist, create the user object to store in the collection of users DB
    let user;
    if (response.user.uid) {
      user = {
        email: email,
        password: password,
        username: username,
        postcards: [],
      };
    }

    // add user object to the user database
    db.collection('users').doc(response.user.uid).set(user);
    dispatch(signup(response.user));
  } catch (error) {
    alert(error);
  }
};

// update profile info
export const updateUserProfile = (username, about, id) => async () => {
  try {
    // find current userID
    const profile = db.collection("users").doc(id);

    // update profile info with user input in firestore
    await profile.update({
      username: username,
      about: about,
    });
  } catch (error) {
    alert(error);
  }
};

// REDUCER
export default function user(state = {}, action) {
  switch (action.type) {
    case LOGIN:
      return action.user;
    case SIGNUP:
      return action.user;
    default:
      return state;
  }
}
