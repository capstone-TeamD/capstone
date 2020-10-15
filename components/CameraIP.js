import React, { useState, useEffect } from 'react';
import {
  Button,
  Image,
  View,
  Platform,
  SafeAreaView,
  Text,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Fire from './Fire';
import { connect } from 'react-redux';
import { fetchPhotos, profilePhotos } from './store/photo';
import { getUser } from './store/user';

export function CameraIP(props) {
  const [image, setImage] = useState(null);

  const currentUser = props.currentUser;

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
      .then(() => {
        setImage(null);
        props.getAllPhotos();
        props.getUser(currentUser.id);
        props.getProfilePhotos(currentUser.postcards)
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('image picked', result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Button title='Pick an image from camera roll' onPress={pickImage} />
      <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
        {image === null ? (
          <Text>No image has been selected.</Text>
        ) : (
          <View>
            <Image
              source={{ uri: image }}
              style={{ width: 300, height: 300 }}
            />
            <Button title='Upload' onPress={upload} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const mapState = (state) => {
  return {
    currentUser: state.user,
    profilePostcard: state.photo
  };
};

const mapDispatch = (dispatch) => {
  return {
    getAllPhotos: () => dispatch(fetchPhotos()),
    getUser: (id) => dispatch(getUser(id)),
    getProfilePhotos: (profileArr) => dispatch(profilePhotos(profileArr))
  };
};

export default connect(mapState, mapDispatch)(CameraIP);
