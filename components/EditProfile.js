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
import cameraicon from "../assets/cameraicon.png";
import { connect } from "react-redux";
import { updateUserProfile, getUser } from "./store/user";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id: this.props.user.id || "",
      username: this.props.user.username || "",
      about: this.props.user.about || "",
      isLoggedIn: true,
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate() {
    
    const { username, about, id } = this.state;

    this.props.update(username, about, id);
    this.props.getUser(id)
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
          <Image style={styles.icon} source={cameraicon} />
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
              />
            </View>
          </View>
          {/* <View style={styles.textInput}>
            <View style={styles.rowLines}>
              <Text>About</Text>
              <TextInput
                style={styles.inputBox}
                value={this.state.id}
                onChangeText={(about) => this.setState({ about })}
                autoCapitalize="none"
              />
            </View>
          </View> */}
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
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "stretch",
  },
  icon: {
    width: 80,
    height: 80,
    marginTop: 4,
    marginBottom: 3,
    marginHorizontal: 30,
  },
  header: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    alignContent: "flex-start",
    backgroundColor: "#f6f6f6",
    borderBottomWidth: 0.2,
  },
  infoDesc: {
    fontSize: 12,
  },
  textInput: {
    margin: 13,
    marginTop: 20,
    padding: 11,
    textAlign: "left",
    flexDirection: "column",
  },
  rowLines: {
    flexDirection: "row",
  },
  inputBox: {
    fontSize: 14,
    marginHorizontal: 17,
    width: 255,
    borderColor: "#d3d3d3",
    fontWeight: "bold",
    borderBottomWidth: 1,
    paddingBottom: 2,
  },
  button: {
    marginTop: 60,
    marginBottom: -20,
    paddingVertical: 4,
    alignItems: "center",
    // backgroundColor: "#BC8F8F",
    borderColor: "#BC8F8F",
    borderWidth: 2,
    borderRadius: 6,
    width: 90,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#BC8F8F",
  },
  checkout: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    borderBottomColor: "#585858",
  },
});

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    update: (username, about, id) => dispatch(updateUserProfile(username, about, id)),
    getUser: (id) => dispatch(getUser(id))
  };
};

export default connect(mapState, mapDispatch)(EditProfile);