import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import cameraicon from "../assets/cameraicon.png";
import * as firebase from "firebase";
import "firebase/firestore";

import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.signout = this.signout.bind(this);
  }

  signout() {
    try {
      firebase.auth().signOut();
    } catch (error) {
      alert(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.icon} source={cameraicon} />
          <View style={styles.info}>
            <Text>username</Text>
            <Text>description</Text>
            <TouchableOpacity onPress={() =>
                Alert.alert("LOGOUT", "Are you sure? You want to logout?", [
                  { text: "Cancel", onPress: () => console.log("Cancel") },
                  { text: "Confirm", onPress: this.signout },
                ])
              }>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
          </View>
        </View>
        <ScrollView vertical style={styles.gallery}>
          <Text>Gallery Scrolling</Text>
          {/* postcards */}
          <Image style={styles.icon} source={cameraicon} />
          <Image style={styles.icon} source={cameraicon} />
          <Image style={styles.icon} source={cameraicon} />
          <Image style={styles.icon} source={cameraicon} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "gray",
    alignItems: "stretch",
    justifyContent: "center",
    // width: 50
  },
  gallery: {
    flex: 5,
    backgroundColor: "lightblue",
  },
  header: {
    flex: 0.4,
    flexDirection: "row",
    alignContent: "flex-end",
    backgroundColor: "lightpink",
  },
  icon: {
    width: 80,
    height: 80,
    marginTop: 50,
    marginHorizontal: 25,
  },
  info: {
    marginTop: 50,
  },
  buttonText: {
    fontSize: 14,
    color: "blue",
  },
});
