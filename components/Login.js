import React, { Component } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { loginUser, getUser } from "./store/user";
import { Loader } from "./Loader";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.getUser(user.uid);
        if (this.props.user !== null) {
          this.props.navigation.navigate("Profile");
        }
      }
    });
  }

  handleLogin() {
    const { email, password } = this.state;

    this.setState({
      loading: true
    })
    this.props.loginUser(email, password);
    this.props.navigation.navigate("Profile");
  }

  render() {
    return (
      <View style={styles.container}>
        <Loader loader={this.state.loading} />
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
        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Signup")}
        >
          <Text style={styles.buttonlink}>
            Don't have an account yet? Sign up
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
    backgroundColor: "black",
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 8,
    width: 190,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonlink: {
    fontSize: 14,
    color: "#0000EE",
    marginTop: 18,
  },
});

const mapDispatch = (dispatch) => {
  return bindActionCreators({ loginUser, getUser }, dispatch);
};

export default connect(null, mapDispatch)(Login);
