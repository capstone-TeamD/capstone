import React, { Component } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/welcomeScreen"


export default class WelcomeScreen extends Component {
  render() {
    const {navigate} = this.props.navigation

    return (
      <ImageBackground
        style={styles.background}
          source={require("../assets/backgroundCS.jpg")}
      >
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../assets/pbLogo2.png')}/>
        </View>
        <View style={styles.buttonContainer}>
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
        </View>
      </ImageBackground>
    );
  }
}
