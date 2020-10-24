import * as firebase from 'firebase';
import 'firebase/firestore';
import { firebaseConfig } from '../../firebaseConfig';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

//retrieve text touchpoints from firestore
export const touchpointText = async (postcardId) => {
  let data;
  await db
    .collection('postcards')
    .doc(postcardId)
    .get()
    .then(async (doc) => {
      data = doc.data();
    })
    .catch((error) => console.error(error));
  return data.textArr;
};

//retrieve audio touchpoints from firestore
export const touchpointAudio = async (postcardId) => {
  let data;
  await db
    .collection('postcards')
    .doc(postcardId)
    .get()
    .then(async (doc) => {
      data = doc.data();
    })
    .catch((error) => console.error(error));
  return data.audioArr;
};
