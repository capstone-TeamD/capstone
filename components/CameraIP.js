import React, { useState, useEffect } from 'react';
import { Button, View, Platform, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Fire from './helperFunctions/Upload';
import { connect } from 'react-redux';
import { profilePhotos, addPhotoToProfile } from './store/photo';
import { getUser } from './store/user';
import PhotoEditor from './PhotoEditor';

export function CameraIP(props) {
  const [image, setImage] = useState(null);

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

  const upload = () => {
    Fire.shared
      .addPhoto(image, currentUser)
      .then((newPostcard) => {
        setImage(null);
        props.addPhotoToProfile(newPostcard);
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

    console.log('image picked', result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      {image === null ? (
        <View>
          <Button title='Pick an image from camera roll' onPress={pickImage} />
        </View>
      ) : (
        <PhotoEditor upload={upload} image={image} setImage={setImage} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

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
