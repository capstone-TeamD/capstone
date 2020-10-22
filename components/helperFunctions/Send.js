import * as firebase from 'firebase';
import 'firebase/firestore';
import { firebaseConfig } from '../../firebaseConfig';
import * as FileSystem from 'expo-file-system';
import { localStorageDirExist } from '../store/photo';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export const mailPostcard = (
  postcardId,
  senderUsername,
  recipientEmail,
  messageText
) => {
  return new Promise((res, rej) => {
    db.collection('users')
      .where('email', '==', recipientEmail)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // console.log(doc.id, ' => ', doc.data());
          db.collection('users')
            .doc(doc.id)
            .update({
              mailbox: firebase.firestore.FieldValue.arrayUnion({
                postcardId: postcardId,
                senderUsername: senderUsername,
                messageText: messageText,
                sentDate: Date.now(),
              }),
            })
            .then(() => {
              console.log('Postcard sent!');
              res('sent');
            })
            .catch((error) => {
              console.error('Error updating documents', error);
              res('fail');
            });
        });
      })
      .catch(function (error) {
        console.error('Error getting documents: ', error);
      });
  });
};

export const viewPostcard = (postcardId) => {
  return new Promise((res, rej) => {
    db.collection('postcards')
      .doc(postcardId)
      .get()
      .then(async (doc) => {
        const postcard = doc.data();
        const remoteUri = postcard.imageURI;
        const dirName = `${FileSystem.cacheDirectory}messages/`;
        await localStorageDirExist(dirName);
        await FileSystem.downloadAsync(
          remoteUri,
          FileSystem.cacheDirectory + 'messages//' + postcardId
        )
          .then((data) => {
            console.log('New postcard message added to local storage!');
            res(data.uri);
          })
          .catch((error) => {
            console.error(
              'Error adding postcard message to local storage: ',
              error
            );
          });
      })
      .catch((error) => {
        console.error('Error retrieving postcard info: ', error);
      });
  });
};
