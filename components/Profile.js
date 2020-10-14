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
  Modal,
  TouchableHighlight,
} from 'react-native';

// const [state, dispatch] = useReducer(reducer, initialState);
// const { photos, nextPage, loading, error } = state;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      photoURI: '',
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.getUser(user.uid);
      }
    });
  }

  toggleModal = (item) => {
    // console.log('current item from flat list', item.item);
    let currentURI = item.item;
    if (item) {
      this.setState({
        modalVisible: !this.state.modalVisible,
        photoURI: currentURI,
      });
      console.log(this.state.photoURI);
    } else {
      this.setState({
        modalVisible: !this.state.modalVisible,
      });
    }
  };

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
          <PhotoGrid
            photos={postcards}
            numColumns={1}
            toggleModal={this.toggleModal}
          />
        </View>
        <View style={styles.centeredView}>
          <Modal
            animationType='slide'
            transparent={false}
            visible={this.state.modalVisible}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {/* <Text style={styles.modalText}>
                  Current URI: {`${this.state.photoURI}`}{' '}
                </Text> */}
                <Image
                  style={styles.photo}
                  source={{
                    uri: this.state.photoURI,
                  }}
                  resizeMode='contain'
                />
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                  onPress={this.toggleModal}
                >
                  <Text style={styles.textStyle}>Close Postcard</Text>
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
  // centeredView: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginTop: 0,
  // },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    // borderRadius: 20,
    // padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    // borderRadius: 20,
    padding: 10,
    // marginBottom: 200,
    // elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  photo: {
    width: '100%',
    height: '95%',
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
