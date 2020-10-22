import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Profile from "../Profile";
import Mailbox from "../Mailbox";
import Upload from "../CameraIP";
import Discover from "../Discover";
import EditProfile from "../EditProfile";
import PhotoView from "../PhotoView";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#e1e1e4",
  },
  headerTintColor: "black",
  headerBackTitle: "Back",
};

const ProfileStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerStyle: {
            backgroundColor: "#e1e1e4",
          },
          headerTintColor: "black",
          headerBackTitle: "Back",
          headerRight: () => (
            <TouchableWithoutFeedback style={{paddingHorizontal:15}} onPress={() => navigation.navigate("Edit Profile")}>
            <MaterialCommunityIcons name="menu" size={24} />
            </TouchableWithoutFeedback>
          ),
        }}
      />
      <Stack.Screen name="Edit Profile" component={EditProfile} />
      <Stack.Screen name="Postcard View" component={PhotoView} />
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
      <Stack.Screen name="Create Postcard" component={Upload} />
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
