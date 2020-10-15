import React, { Component } from 'react';
import cameraicon from '../assets/cameraicon.png';
import * as firebase from 'firebase';
import 'firebase/firestore';
import PhotoGrid from './PhotoGridProfile';
import { connect } from 'react-redux';
import user, { getUser } from './store/user';

import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { profilePhotos } from './store/photo';

class Profile extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
       await this.props.getUser(user.uid)
      }
      this.props.getProfilePhotos(this.props.user.postcards)
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { username, postcards, about } = this.props.user;
    const currentMs = Date.now()
    const currentDate = new Date(currentMs)
    const currentTime = currentDate.toLocaleTimeString('en-GB')
    const currentDay = currentDate.toLocaleDateString('en-GB')
    
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.icon} source={cameraicon} />
          <View style={styles.info}>
            <Text style={styles.infoName}>{username}</Text>
            <Text style={styles.infoDesc}>{about}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.edit}
          onPress={() => navigate('EditProfile')}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <View style={styles.gallery}>
          <PhotoGrid photos={this.props.postcards} numColumns={1} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'gray',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  gallery: {
    flex: 1,
    backgroundColor: '#BC8F8F',
  },
  edit: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    height: 22,
    // borderBottomWidth: .2,
    borderWidth: 0.2,
    borderBottomColor: '#585858',
  },
  buttonText: {
    fontSize: 12,
    color: 'black',
  },
  header: {
    flex: 0.3,
    paddingTop: -20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    alignContent: 'flex-start',
    backgroundColor: '#F8F8F8',
  },
  icon: {
    width: 80,
    height: 80,
    marginTop: 25,
    marginHorizontal: 30,
  },
  info: {
    marginTop: 10,
    alignItems: 'center',
  },
  infoName: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 3,
    textAlign: 'center',
  },
  infoDesc: {
    fontSize: 13,
    paddingBottom: 18,
  },
});

const mapState = (state) => {
  return {
    user: state.user,
    postcards: state.photo
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUser: (id) => dispatch(getUser(id)),
    getProfilePhotos: (data) => dispatch(profilePhotos(data))
  };
};

export default connect(mapState, mapDispatch)(Profile);
