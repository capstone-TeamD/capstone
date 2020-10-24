import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as firebase from 'firebase';
import 'firebase/firestore';
import { connect } from 'react-redux'
import { signupUser } from './store/user'
import { Loader } from './Loader'
import styles from '../styles/auth'


class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      email: "",
      password: "",
      loading: false
    }
    this.handleSignUp = this.handleSignUp.bind(this)
  }

  handleSignUp() {
    const { email, password, username } = this.state

    this.setState({
      loading: true
    })
    this.props.signup(email, password, username)
    this.props.navigation.navigate('Profile')
    this.setState({
      loading: false
    })
  }

  render() {

    return (
      <View style={styles.container}>
        <Loader loader={this.state.loading} />
        <TextInput
          style={styles.inputBox}
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
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

const mapDispatch = dispatch => {
  return {
    signup: (username, email, password) => dispatch(signupUser(username, email, password))
  }
}


export default connect(null, mapDispatch)(Signup)