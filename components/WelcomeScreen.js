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
          source={require("../assets/backgroundCS.jpg")}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.title}>postbox</Text>
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
    padding: 100,
  },
  loginButton: {
    width: "80%",
    height: 70,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    opacity: 0.4,
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  registerButton: {
    width: "80%",
    height: 70,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 120,
    opacity: 0.3,
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
    letterSpacing: 1,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#CD5C5C",
    marginTop: 15,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1
    }
  }
});

