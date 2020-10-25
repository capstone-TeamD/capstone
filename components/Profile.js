import React, { Component } from 'react';
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
  Modal,
  Dimensions,
  TextInput,
  Button,
  Keyboard,
  Alert,
} from 'react-native';
import { mailPostcard } from './helperFunctions/Send';
import styles from '../styles/profile'

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
    this.createSentAlert = this.createSentAlert.bind(this);
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

  async handleDelete(imageId, firebaseURL, localURL, firebaseAudioURL) {
    await this.props.deletePhoto(
      imageId,
      this.props.user.id,
      firebaseURL,
      localURL,
      firebaseAudioURL
    );
  }

  async sendPostard(recipientEmail, messageText) {
    const postcardId = this.state.imageId;
    const senderUsername = this.props.user.username;

    await mailPostcard(
      postcardId,
      senderUsername,
      recipientEmail,
      messageText
    ).then((response) => {
      console.log('response after mailing', response);
      if (response === 'sent') {
        this.createSentAlert();
      } else {
        this.invalidEmailAlert();
      }
    });
  }

  createSentAlert() {
    Alert.alert(
      'Success!',
      'Your postcard has been sent.',
      [
        {
          text: 'OK',
          onPress: () =>
            this.setState({ message: '', recipient: '', modalVisible: false }),
        },
      ],
      { cancelable: false }
    );
  }

  invalidEmailAlert() {
    Alert.alert(
      'Sorry!',
      "You've entered an invalid email address. Please try again.",
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      { cancelable: false }
    );
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
            source={require('../assets/defaultpic.png')}
          />
          <View style={styles.info}>
            <Text style={styles.infoName}>{username}</Text>
            <Text style={styles.infoDesc}>{about}</Text>
          </View>
          <View style={styles.infoLine} />
        </View>
        <View style={styles.gallery}>
          {
            this.props.user.postcards ? (
            <PhotoGrid
              photos={this.props.postcards}
              numColumns={1}
              handleDelete={this.handleDelete}
              getProfilePostcards={this.props.getProfilePhotos}
              navigate={navigate}
              toggleModal={this.toggleModal}
            />)
            :<Text 
              style={{opacity: .3}}
            >No postcards created</Text>
          }
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
                <Text style={styles.modalText}>Send to:</Text>
                <TextInput
                  style={styles.inputBox}
                  value={this.state.recipient}
                  onChangeText={(recipient) => this.setState({ recipient })}
                  placeholder='Enter e-mail address for recipient here'
                  autoCapitalize='none'
                />
                <TextInput
                  style={styles.inputBox}
                  value={this.state.message}
                  onChangeText={(message) => this.setState({ message })}
                  placeholder='Enter message here'
                  autoCapitalize='none'
                  multiline={true}
                  returnKeyType='done'
                  maxLength={160}
                  blurOnSubmit={true}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                />
                <Button
                  title='Send'
                  onPress={() => this.sendPostard(recipient, message)}
                />
                <Button
                  color='red'
                  title='Cancel'
                  onPress={this.toggleModal} />
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    postcards: state.photo.profile,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUser: (id) => dispatch(getUser(id)),
    deletePhoto: (imageId, userId, firebaseURL, localURL, firebaseAudioURL) =>
      dispatch(
        deleteSinglePhoto(
          imageId,
          userId,
          firebaseURL,
          localURL,
          firebaseAudioURL
        )
      ),
    getProfilePhotos: (data) => dispatch(profilePhotos(data)),
  };
};

export default connect(mapState, mapDispatch)(Profile);
