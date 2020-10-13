import * as firebase from 'firebase';
import 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig';

class Fire {
  constructor() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
  }
  // this is to add photo to firebase - storage
  uploadPhotoAsync = async (uri) => {
    const path = `photos/${Date.now()}.jpg`;
    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();
      let upload = firebase.storage().ref(path).put(file);
      upload.on(
        'state_changed',
        (snapshot) => {
          console.log('Photo is uploading');
        },
        (err) => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    });
  };

  // this is to add photo uri to firebase - cloud firestore
  addPhoto = async (localUri, currentUser) => {
    const remoteUri = await this.uploadPhotoAsync(localUri);
    return new Promise((res, rej) => {
      this.firestore
        .collection('postcards')
        .add({
          // timestamp: this.timestamp,
          // image: remoteUri,
          creatorID: currentUser.uid,
          dateCreated: this.timestamp,
          imageURI: remoteUri,
        })
        .then((ref) => {
          // await db.collection('users')
          //   .doc(currentUser)
          //   .set({
          //     postcards: [...postcards, ref.uid],
          //   }, { merge: true })
          //   .then(function (ref) {
          //     console.log('Document successfully updated!');
          console.log('final ref in addPhoto', ref);
          res(ref);
          //   })
          //   .catch(function (error) {
          //     console.error('Error updating document: ', error);
          //   });
        })
        .catch((err) => {
          rej(err);
        });
    });
  };

  get firestore() {
    return firebase.firestore();
  }

  get timestamp() {
    return Date.now();
    // return new Date();
  }
}

Fire.shared = new Fire();

export default Fire;
