import React, { Component } from 'react';
import panda from '../assets/panda.jpg';
import * as firebase from 'firebase';
import 'firebase/firestore';
import PhotoGrid from './GalleryGridProfile';
import { connect } from 'react-redux';
import { getUser } from './store/user';
import { deleteSinglePhoto, profilePhotos } from './store/photo';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Dimensions,
  TextInput,
  Button,
  Keyboard,
} from 'react-native';
import { mailPostcard } from './helperFunctions/Send';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      imageId: '',
      recipient: '',
      message: '',
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.sendPostcard = this.sendPostard.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        await this.props.getUser(user.uid);
      }
      await this.props.getProfilePhotos(this.props.user.postcards);
    });
  }

  toggleModal = (imageId) => {
    if (imageId) {
      this.setState({
        modalVisible: !this.state.modalVisible,
        imageId: imageId,
      });
    } else {
      this.setState({
        modalVisible: !this.state.modalVisible,
        recipient: '',
        message: '',
      });
    }
  };

  async handleDelete(imageId, firebaseURL, localURL) {
    console.log('firebase', firebaseURL);
    await this.props.deletePhoto(
      imageId,
      this.props.user.id,
      firebaseURL,
      localURL
    );
  }

  sendPostard(recipientEmail, messageText) {
    const postcardId = this.state.imageId;
    const senderUsername = this.props.user.username;
    // console.log(postcardId, senderId, recipientEmail, messageText);
    mailPostcard(postcardId, senderUsername, recipientEmail, messageText);
    this.setState({ messageText: '', recipient: '', modalVisible: false });
  }

  render() {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const { navigate } = this.props.navigation;
    const { username, about } = this.props.user;

    const recipient = this.state.recipient;
    const message = this.state.message;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.circleImage}
            source={require('../assets/nip.jpg')}
          />
          <View style={styles.info}>
            <Text style={styles.infoName}>{username}</Text>
            <Text style={styles.infoDesc}>{about}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.edit}
          onPress={() => navigate('EditProfile')}
        >
          <Image source={require('../assets/pencil-outline.png')} />
        </TouchableOpacity>
        <View style={styles.gallery}>
          <PhotoGrid
            photos={this.props.postcards}
            numColumns={1}
            handleDelete={this.handleDelete}
            getProfilePostcards={this.props.getProfilePhotos}
            navigate={navigate}
            toggleModal={this.toggleModal}
          />
        </View>
        <View style={styles.centeredView}>
          <Modal
            transparent={true}
            visible={this.state.modalVisible}
            supportedOrientations={['portrait', 'landscape']}
            animationType='fade'
          >
            <View style={styles.container}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Send postcard to:</Text>
                <TextInput
                  style={styles.inputBox}
                  value={this.state.recipient}
                  onChangeText={(recipient) => this.setState({ recipient })}
                  placeholder='Enter e-mail address for recipient here'
                  autoCapitalize='none'
                />
                <Text style={styles.modalText}>Include a message:</Text>
                <TextInput
                  style={styles.inputBox}
                  value={this.state.message}
                  onChangeText={(message) => this.setState({ message })}
                  placeholder='Enter message here'
                  autoCapitalize='none'
                  multiline={true}
                  returnKeyType='done'
                  maxLength={200}
                  blurOnSubmit={true}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                />
                <Button
                  title='Send'
                  onPress={() => this.sendPostard(recipient, message)}
                />
                <Button title='Cancel' onPress={this.toggleModal} />
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
    width: '100%',
    height: '100%',
    backgroundColor: '#e1e1e4',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  gallery: {
    flex: 1,
    backgroundColor: '#fff',
  },
  edit: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    height: 25,
    width: '20%',
    borderWidth: 0.2,
    borderBottomColor: '#585858',
    marginBottom: 5,
    borderRadius: 6,
  },
  header: {
    flex: 0.5,
    paddingTop: -20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    alignContent: 'flex-start',
    backgroundColor: '#F8F8F8',
    marginBottom: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  info: {
    marginTop: 10,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  infoName: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 10,
    textAlign: 'center',
  },
  infoDesc: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 17,
    marginBottom: 4,
  },
  modalView: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  circleImage: {
    height: 110,
    width: 110,
    borderRadius: 500,
    borderWidth: 0.3,
    borderColor: '#B8B8B8',
  },
  inputBox: {
    height: 50,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
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
