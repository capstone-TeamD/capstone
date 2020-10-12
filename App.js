// @refresh reset
// import { StatusBar } from 'expo-status-bar';
import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";
import SwitchNavigator from "./components/navigation/SwitchNavigator";
import { Provider } from "react-redux";
import store from "./components/store/index";

import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./components/navigation/TabNavigator";


// initialize app
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();


export default class App extends Component {
  state = {
      isLoggedIn: false,
    };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ isLoggedIn: true });
      } else {
        this.setState({ isLoggedIn: false });
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          {this.state.isLoggedIn ? <BottomTabNavigator /> : <SwitchNavigator />}
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

