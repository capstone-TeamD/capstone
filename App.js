// @refresh reset
// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig';
import SwitchNavigator from './components/SwitchNavigator';
import { Provider } from 'react-redux';
import store from './components/store/index'

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();

// for testing
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
    <Provider store={store}>
    <View style={styles.container}>
      <SwitchNavigator />
    </View>
    </Provider>
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
