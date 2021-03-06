import React, { Component } from "react";
import * as firebase from "firebase";
import "firebase/firestore";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { updateUserProfile, getUser } from "./store/user";
import styles from '../styles/editProfile'

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.user.id || "",
      username: this.props.user.username || "",
      about: this.props.user.about || "",
      photo: "",
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  selected(selected) {
    this.setState({
      selectedItem: selected,
    });
  }

  handleUpdate() {
    const { username, about, id } = this.state;

    this.props.update(username, about, id);
    this.props.getUser(id);
    this.props.navigation.navigate("Profile");
  }

  signout() {
    try {
      firebase.auth().signOut();
    } catch (error) {
      alert(error);
    }
  }

  render() {
    const { user } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.circleImage} source={require("../assets/defaultpic.png")} />
          <View>
            <Text style={styles.infoDesc}>Choose Photo</Text>
          </View>
        </View>
        <View style={styles.textInput}>
          <View style={styles.rowLines}>
            <Text>Username</Text>
            <TextInput
              style={styles.inputBox}
              value={this.state.username}
              onChangeText={(username) => this.setState({ username })}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.textInput}>
            <View style={styles.rowLines}>
              <Text>About</Text>
              <TextInput
                style={styles.inputBox}
                value={this.state.about}
                onChangeText={(about) => this.setState({ about })}
                autoCapitalize="none"
                multiline={true}
                placeholder='tell us about yourself'
              />
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={this.handleUpdate}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checkout}
            onPress={() =>
              Alert.alert("LOGOUT", "Are you sure? You want to logout?", [
                { text: "Cancel", onPress: () => console.log("Cancel") },
                { text: "Confirm", onPress: this.signout },
              ])
            }
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    update: (username, about, id) =>
      dispatch(updateUserProfile(username, about, id)),
    getUser: (id) => dispatch(getUser(id)),
  };
};

export default connect(mapState, mapDispatch)(EditProfile);
