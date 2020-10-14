import * as firebase from 'firebase';
import 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig';

class Fire {
  constructor() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
  }
  // this is to add photo to firebase - storage bucket
  uploadPhotoAsync = async (uri) => {
    const path = `photos/${Date.now()}.jpg`;

    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();
      let upload = firebase.storage().ref(path).put(file);
      upload.on(
        'state_changed',
        (snapshot) => {
          console.log('Postcard is uploading...');
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
          creatorID: currentUser.id,
          creatorName: currentUser.username,
          dateCreated: this.timestamp,
          imageURI: remoteUri,
        })
        .then((docRef) => {
          this.firestore
            .collection('users')
            .doc(currentUser.id)
            .update({
              postcards: firebase.firestore.FieldValue.arrayUnion({imageId: docRef.id, imageURL: remoteUri}),
            })
            .then(function (ref) {
              console.log('New postcard added to user array!');
              // console.log('final ref in addPhoto', docRef.id);
              //added field to db
              res(ref);
            })
            .catch(function (error) {
              console.error('Error updating document: ', error);
            });
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
