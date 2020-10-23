import * as firebase from 'firebase';
import 'firebase/firestore';
import { firebaseConfig } from '../../firebaseConfig';
import * as FileSystem from 'expo-file-system';
import {audioUpload} from './audio'
import {localStorageDirExist} from '../store/photo'

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
  addPhoto = async (localUri, currentUser, messageObj, audioObj) => {
    console.log('addPhoto func', messageObj, audioObj)
  // addPhoto = async (localUri, currentUser, messageObj = [])=> { 
    const remoteUri = await this.uploadPhotoAsync(localUri);
    // audioupload function that needs the uri
    console.log('audioObj', audioObj)
    let audioFirebaseUri = '';
    if (audioObj.length) {
      audioFirebaseUri = await audioUpload(audioObj[0].audioLink)
      audioObj[0].audioLink = audioFirebaseUri
    }
    return new Promise((res, rej) => {
      this.firestore
        .collection('postcards')
        .add({
          creatorID: currentUser.id,
          creatorName: currentUser.username,
          dateCreated: this.timestamp,
          imageURI: remoteUri,
          textArr: messageObj, 
          audioArr: audioObj //added audio obj to firestore
        })
        .then((docRef) => {
          this.firestore
            .collection('users')
            .doc(currentUser.id)
            .update({
              postcards: firebase.firestore.FieldValue.arrayUnion({
                imageId: docRef.id,
                imageURL: remoteUri,
                audioURL: audioFirebaseUri //added the audioURL to postcard firestore
              }),
            })
            .then(async function () {
              console.log('New postcard added to user array!');
              //download audio file to local storage
              if (audioObj.length) {
                const audioDir = `${FileSystem.cacheDirectory}audio`
                await localStorageDirExist(audioDir)
                await FileSystem.downloadAsync(audioFirebaseUri,
                  FileSystem.cacheDirectory + 'audio//' + docRef.id)
                  .then(() => {
                    console.log('Audio added to local storage!');
                  })
                  .catch((error) => {
                    console.error('Error dispatching new photo: ', error);
                  });
              }
              await FileSystem.downloadAsync(
                remoteUri,
                FileSystem.cacheDirectory + 'profile//' + docRef.id
              )
                .then((data) => {
                  console.log('New postcard added to local storage!');
                  //do not need to add audio uri to newpostcard because that is info to render for the profile flatlist
                  const newPostcard = {
                    imageId: docRef.id,
                    imageURL: data.uri,
                    firebaseURL: remoteUri,
                  };
                  res(newPostcard);
                })
                .catch((error) => {
                  console.error('Error dispatching new photo: ', error);
                });
            })
            .catch((error) => {
              console.error('Error adding new photo to local storage: ', error);
            });
        })
        .catch(function (error) {
          console.error('Error updating document: ', error);
        });
    }).catch((err) => {
      rej(err);
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
