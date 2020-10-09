// @refresh reset
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig';
import SwitchNavigator from './components/SwitchNavigator';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// db.collection('users')
//   .add({
//     email: 'newtest@test.com',
//     password: '12345678',
//     username: 'newUser2',
//   })
//   .then(function (docRef) {
//     console.log('Document written with ID: ', docRef.id);
//   })
//   .catch(function (error) {
//     console.error('Error adding document: ', error);
//   });

export default function App() {
  return (
    <View style={styles.container}>
      <SwitchNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
