// @refresh reset
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig';
import SwitchNavigator from './components/SwitchNavigator';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Profile from './components/Profile';
import Mailbox from './components/Mailbox';
import Upload from './components/CameraIP';
import Discover from './components/Discover';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
  const isLoggedin = true;

  return (
    <NavigationContainer>
      {isLoggedin ? (
        <Tab.Navigator>
          <Tab.Screen
            name='Profile'
            component={Profile}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name='face-profile'
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name='Mailbo'
            component={Mailbox}
            options={{
              tabBarLabel: 'Mailbox',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name='mailbox'
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name='Mailbox'
            component={Upload}
            options={{
              tabBarLabel: 'Upload',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name='camera' color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name='Discover'
            component={Discover}
            options={{
              tabBarLabel: 'Discover',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name='earth' color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <SwitchNavigator />
      )}
    </NavigationContainer>
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
