import React, { Component } from 'react';
import cameraicon from '../assets/cameraicon.png';
import * as firebase from 'firebase';
import 'firebase/firestore';
import PhotoGrid from './GalleryGridProfile';
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

// const [state, dispatch] = useReducer(reducer, initialState);
// const { photos, nextPage, loading, error } = state;

class Profile extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.getUser(user.uid);
      }
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { username, postcards, about } = this.props.user;

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
          <PhotoGrid photos={postcards} numColumns={1} />
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
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUser: (id) => dispatch(getUser(id)),
  };
};

export default connect(mapState, mapDispatch)(Profile);
