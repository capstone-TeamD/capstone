import React, { Component } from "react";
import cameraicon from "../assets/cameraicon.png";
import * as firebase from "firebase";
import "firebase/firestore";
import PhotoGrid from "./GalleryGrid";
import { connect } from "react-redux";
import { getUser } from "./store/user";

import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";

// const [state, dispatch] = useReducer(reducer, initialState);
// const { photos, nextPage, loading, error } = state;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.signout = this.signout.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.getUser(user.uid);
      }
    });
  }

  signout() {
    try {
      firebase.auth().signOut();
    } catch (error) {
      alert(error);
    }
  }

  render() {
    const {username} = this.props.user
    console.log(this.props.user)

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.icon} source={cameraicon} />
          <View style={styles.info}>
            <Text style={styles.infoName}>{username}</Text>
            <Text style={styles.infoDesc}>description</Text>
          </View>
        </View>
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
        <View style={styles.gallery}>
          {/* <PhotoGrid
          photos={[cameraicon, cameraicon, cameraicon, cameraicon]}
          numColumns={1}
        /> */}
        </View>
        {/* <ScrollView vertical style={styles.gallery}> */}
        {/* <Text>Gallery Scrolling</Text> */}
        {/* postcards */}
        {/* <Image style={styles.icon} source={cameraicon} />
          <Image style={styles.icon} source={cameraicon} />
          <Image style={styles.icon} source={cameraicon} />
          <Image style={styles.icon} source={cameraicon} /> */}
        {/* </ScrollView> */}
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
  },
  gallery: {
    flex: 1,
    backgroundColor: "#BC8F8F",
  },
  checkout: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    height: 22,
    // borderBottomWidth: .2,
    borderWidth: 0.2,
    borderBottomColor: "#585858",
  },
  buttonText: {
    fontSize: 12,
    color: "black",
  },
  header: {
    flex: 0.3,
    paddingTop: -20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    alignContent: "flex-start",
    backgroundColor: "#F8F8F8",
  },
  icon: {
    width: 80,
    height: 80,
    marginTop: 25,
    marginHorizontal: 30,
  },
  info: {
    marginTop: 10,
  },
  infoName: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 3,
    textAlign: "center",
  },
  infoDesc: {
    fontSize: 13,
    paddingBottom: 18,
  },
});

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUser: (id) => dispatch(getUser(id)),
  };
};

export default connect(mapState, mapDispatch)(Profile);
