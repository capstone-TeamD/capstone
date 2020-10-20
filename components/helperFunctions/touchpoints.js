import * as firebase from 'firebase';
import 'firebase/firestore';
import { firebaseConfig } from '../../firebaseConfig';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export const touchpointText = async (postcardId) => {
  // await db
  //   .collection('postcards')
  //   .doc(postcardId)
  //   .get().then((doc) =>
  //     console.log('fetchedData', doc.data)
  //   )
}