import React, { useState, useEffect } from 'react';
import {
  Image,
  View,
  Platform,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Fire from './helperFunctions/Upload';
import { connect } from 'react-redux';
import { profilePhotos, addPhotoToProfile } from './store/photo';
import { getUser } from './store/user';
import PhotoEditor from './PhotoEditor';
import * as Permissions from 'expo-permissions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../styles/cameraIP';
import {
  useDimensions,
} from '@react-native-community/hooks';

function CameraIP(props) {
  const [image, setImage] = useState(null);
  const {width, height} = useDimensions().window;
  const currentUser = props.currentUser;
  const { navigate } = props.navigation;

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const upload = (messageObj, audioObj) => {
    console.log('upload func', messageObj, audioObj);
    Fire.shared
      .addPhoto(image, currentUser, messageObj, audioObj)
      .then((newPostcard) => {
        setImage(null);
        props.addPhotoToProfile(newPostcard);
        navigate('Profile');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const pickFromCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
      console.log('image captured', result);
      if (!result.cancelled) {
        setImage(result.uri);
      }
    } else {
      Alert.alert('you need to give up permission to work');
    }
  };

  return (
    <View style={styles.container}>
      {image === null ? (
        <View
          style={{
            marginHorizontal: 32,
            marginTop: 32,
            height: 150,
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            style={{ alignItems: 'center', marginTop: -40 }}
            onPress={pickImage}
          >
            <Image source={require('../assets/image-multiple-outline1.png')} />
            <Text style={{ textAlign: 'center', padding: 5 }}>
              Pick an image from gallery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: 'center', marginTop: 10 }}
            onPress={pickFromCamera}
          >
            <Image source={require('../assets/camera-wireless-outline.png')} />
            <Text style={{ textAlign: 'center', padding: 5 }}>
              Take a photo
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <PhotoEditor upload={upload} image={image} setImage={setImage} width={width} height={height}/>
      )}
    </View>
  );
}

const mapState = (state) => {
  return {
    currentUser: state.user,
    profilePostcard: state.photo,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUser: (id) => dispatch(getUser(id)),
    getProfilePhotos: (profileArr) => dispatch(profilePhotos(profileArr)),
    addPhotoToProfile: (newPhoto) => dispatch(addPhotoToProfile(newPhoto)),
  };
};

export default connect(mapState, mapDispatch)(CameraIP);
