import * as firebase from 'firebase';
import 'firebase/firestore';
import { firebaseConfig } from '../../firebaseConfig';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export const touchpointText = async (postcardId) => {
  let data;
  await db
    .collection('postcards')
    .doc(postcardId)
    .get()
    .then(async (doc) => {
      data = doc.data();
      // console.log('insideFunc', data.textArr)
      // return data.textArr
      // console.log('fetchedData', doc.data())
    })
    .catch((error) => console.error(error));
  return data.textArr;
};

export const touchpointAudio = async (postcardId) => {
  let data;
  await db
    .collection('postcards')
    .doc(postcardId)
    .get()
    .then(async (doc) => {
      data = doc.data();
      // console.log('insideFunc', data.audioArr)
      // return data.textArr
      // console.log('fetchedData', doc.data())
    })
    .catch((error) => console.error(error));
  return data.audioArr;
};
