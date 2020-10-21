import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from '../Profile';
import Mailbox from '../Mailbox';
import Upload from '../CameraIP';
import Discover from '../Discover';
import EditProfile from '../EditProfile';
import PhotoEditor from '../PhotoEditor';
import PhotoView from '../PhotoView';
import Audio_Recorder from '../Audio_Recorder';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#e1e1e4',
  },
  headerTintColor: 'black',
  headerBackTitle: 'Back',
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='EditProfile' component={EditProfile} />
      <Stack.Screen name='Postcard View' component={PhotoView} />
    </Stack.Navigator>
  );
};

const MailStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name='Mailbox' component={Mailbox} />
      <Stack.Screen name='Audio Recorder' component={Audio_Recorder} />
    </Stack.Navigator>
  );
};

const UploadStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name='Create Postcard' component={Upload} />
      {/* <Stack.Screen name='PhotoEditor' component={PhotoEditor} /> */}
    </Stack.Navigator>
  );
};

const DiscoverStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name='Discover' component={Discover} />
    </Stack.Navigator>
  );
};

export {
  ProfileStackNavigator,
  DiscoverStackNavigator,
  UploadStackNavigator,
  MailStackNavigator,
};
