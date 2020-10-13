import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../Profile";
import Mailbox from "../Mailbox";
import Upload from "../CameraIP";
import Discover from "../Discover";


const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#f6f6f6",
  },
  headerTintColor: "black",
  headerBackTitle: "Back",
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

const MailStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Mailbox" component={Mailbox} />
    </Stack.Navigator>
  );
};

const UploadStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Upload" component={Upload} />
    </Stack.Navigator>
  );
};

const DiscoverStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Discover" component={Discover} />
    </Stack.Navigator>
  );
};

export {
  ProfileStackNavigator,
  DiscoverStackNavigator,
  UploadStackNavigator,
  MailStackNavigator,
};
