import React, { Component } from "react";
import panda from "../assets/panda.jpg";
import * as firebase from "firebase";
import "firebase/firestore";
import PhotoGrid from "./GalleryGridProfile";
import { connect } from "react-redux";
import { getUser } from "./store/user";
import { deleteSinglePhoto, profilePhotos } from "./store/photo";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Dimensions
} from "react-native";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      photoURI: "",
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        await this.props.getUser(user.uid);
      }
      await this.props.getProfilePhotos(this.props.user.postcards);
    });
  }

  toggleModal = (item) => {
    if (item.item) {
      this.setState({
        modalVisible: !this.state.modalVisible,
        photoURI: item.item.imageURL,
      });
    } else {
      this.setState({
        modalVisible: !this.state.modalVisible,
      });
    }
  };

  async handleDelete(imageId, firebaseURL, localURL) {
    await this.props.deletePhoto(
      imageId,
      this.props.user.id,
      firebaseURL,
      localURL
    );
  }

  render() {
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    const { navigate } = this.props.navigation;
    const { username, about } = this.props.user;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.circleImage} source={require("../assets/nip.jpg")} />
          <View style={styles.info}>
            <Text style={styles.infoName}>{username}</Text>
            <Text style={styles.infoDesc}>{about}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.edit}
          onPress={() => navigate("EditProfile")}
        >
          <Image source={require("../assets/pencil-outline.png")} />
        </TouchableOpacity>
        <View style={styles.gallery}>
          <PhotoGrid
            photos={this.props.postcards}
            numColumns={1}
            handleDelete={this.handleDelete}
            toggleModal={this.toggleModal}
            getProfilePostcards={this.props.getProfilePhotos}
          />
        </View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            supportedOrientations={["portrait", "landscape"]}
            animationType="fade"
            width={windowWidth}
            height={windowHeight}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image
                  style={{ width: "100%", height: "landscape" ? "95%" : "30%" }}
                  source={{
                    uri: this.state.photoURI,
                  }}
                  resizeMode="contain"
                />
                <TouchableHighlight onPress={this.toggleModal}>
                  <Text style={styles.textStyle}>X</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#e1e1e4",
    alignItems: "stretch",
    justifyContent: "center",
  },
  gallery: {
    flex: 1,
    backgroundColor: "#fff",
  },
  edit: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    height: 25,
    width: "20%",
    borderWidth: 0.2,
    borderBottomColor: "#585858",
    marginBottom: 5,
    borderRadius: 6,
  },
  header: {
    flex: 0.5,
    paddingTop: -20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    alignContent: "flex-start",
    backgroundColor: "#F8F8F8",
    marginBottom: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  info: {
    marginTop: 10,
    alignItems: "center",
    marginHorizontal: 10,
  },
  infoName: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 10,
    textAlign: "center",
  },
  infoDesc: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 17
  },
  modalView: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  circleImage: {
    height: 110,
    width: 110,
    borderRadius: 500,
    borderWidth: 0.3,
    borderColor: "#B8B8B8",
  },
});

const mapState = (state) => {
  return {
    user: state.user,
    postcards: state.photo.profile,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUser: (id) => dispatch(getUser(id)),
    deletePhoto: (imageId, userId, firebaseURL, localURL) =>
      dispatch(deleteSinglePhoto(imageId, userId, firebaseURL, localURL)),
    getProfilePhotos: (data) => dispatch(profilePhotos(data)),
  };
};

export default connect(mapState, mapDispatch)(Profile);
