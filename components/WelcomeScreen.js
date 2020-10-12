import React, { Component } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

export default class WelcomeScreen extends Component {
  render() {
    const {navigate} = this.props.navigation

    return (
      <ImageBackground
        style={styles.background}
        //   source={require("../assets/dummy.photo.jpg")}
      >
        <View style={styles.logoContainer}>
          {/* <Image style={styles.logo} source={require("../assets/logo.png")} /> */}
          <Text>LOGO</Text>
        </View>
        <TouchableOpacity style={styles.loginButton}>
          <Text
            style={styles.buttonText}
            onPress={() => navigate("Login")}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton}>
          <Text
            style={styles.buttonText}
            onPress={() => navigate("Signup")}
          >
            Signup
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
    padding: 20,
  },
  loginButton: {
    width: "100%",
    height: 70,
    backgroundColor: "gold",
    justifyContent: "center",
    alignItems: "center",
  },
  registerButton: {
    width: "100%",
    height: 70,
    backgroundColor: "#BC8F8F",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff",
  },
});

