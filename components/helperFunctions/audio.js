// upload audio to firestore
// audio api from expo already tell downloads the uri to local storage
// readFileSystem(dir) methods to get the uri
// get the contents of the file and turn it into a blob formet to upload
// upload in audio folder

import * as firebase from 'firebase';
import 'firebase/firestore';
import { Platform } from 'react-native';
import { firebaseConfig } from '../../firebaseConfig';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export const audioUpload = async (uri) => {
  //if recording is the name of the class object for recording start and stop
  //may need to use readFileSystem(uri) ? depends on what that uri is and it it matches the getURI() output
  console.log('uri', uri)
  return new Promise(async (res, rej) => {
    const response = await fetch(uri)
    const file = await response.blob();
    let format = 'mp3' //android platform
    // if (Platform.OS !== 'andriod') {
    //   format = 'm4a'//ios platform
    // }
    const path = `audio/${Date.now()}.${format}`
    let upload = firebase.storage().ref(path).put(file)
    upload.on(
      'state_changed',
        (snapshot) => {
          console.log('Audio is uploading...');
        },
        (err) => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        })
  })
}

//On Upload, the firebaseURL has to be uploaded to the firestore audio field
// in the addphoto upload.js file add a field
/* 
//between line 40 and 41 
const audioUru = await audioUpload()
//line 50 add
audioFile: audioUri
*/


//download audio
//download from the storage area into your local storage

/*
// the postcard gets selected and needs the audiofile url (firebase)
const dir = `${FileSystem.cacheDirectory}audio`
const postcardId = ...
FileSytem.downloadAsync(firebaseURL, dir + postcardId)

*/


//listen to the audio thorugh the expo api docs