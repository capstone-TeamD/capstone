import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as firebase from 'firebase';
import 'firebase/firestore';


export default class Signup extends Component {
  constructor() {
    super()
    this.state = {
      userName: "",
      email: "",
      password: "",
    }
    this.handleSignUp = this.handleSignUp.bind(this)
  }

  handleSignUp() {
    const { email, password } = this.state

    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Profile'))
      .catch(error => console.log(error))
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          value={this.state.userName}
          onChangeText={(userName) => this.setState({ userName })}
          placeholder="Username"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.inputBox}
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.inputBox}
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.buttonlink}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputBox: {
    width: "75%",
    margin: 7,
    padding: 11,
    fontSize: 15,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    textAlign: "center",
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 7,
    alignItems: "center",
    backgroundColor: "#BC8F8F",
    borderColor: "#BC8F8F",
    borderWidth: 3.5,
    borderRadius: 8,
    width: 200,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonSignup: {
    fontSize: 12,
  },
  buttonlink: {
    fontSize: 15,
    color: "#0000EE",
    marginTop: 18,
  },
});