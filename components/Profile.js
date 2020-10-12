import { StatusBar } from "expo-status-bar";
import React, { Component, useEffect, useReducer, useCallback } from "react";
import cameraicon from '../assets/cameraicon.png';
import {getList} from '../picsum';
import { actionCreators, initialState, reducer } from '../photos'
import PhotoGrid from './GalleryGrid'

import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  ActivityIndicator
} from "react-native"


// const [state, dispatch] = useReducer(reducer, initialState);
// const { photos, nextPage, loading, error } = state;

export default class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.icon}
            source={cameraicon}
            />
          <View style={styles.info}>
            <Text>username</Text>
            <Text>description</Text>
          </View>
        </View>
        <View style={styles.gallery}>
        <PhotoGrid
          photos={[cameraicon, cameraicon, cameraicon, cameraicon]}
          numColumns={1}
        />
        </View>
        {/* <ScrollView vertical style={styles.gallery}> */}
          {/* <Text>Gallery Scrolling</Text> */}
          {/* postcards */}
          {/* <Image
                style={styles.icon}
                source={cameraicon}
                />
          <Image
                style={styles.icon}
                source={cameraicon}
                />
          <Image
                style={styles.icon}
                source={cameraicon}
                />
          <Image
                style={styles.icon}
                source={cameraicon}
                /> */}
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
      // width: 50
    },
    gallery: {
      flex: 2,
      backgroundColor: 'lightblue'
    },
    header: {
      flex: 0.8,
      flexDirection: 'row',
      alignContent: 'flex-end',
      backgroundColor: 'lightpink'
    },
    icon: {
      width: 80,
      height: 80,
      marginTop: 50,
      marginHorizontal: 25,
    },
    info: {
      marginTop: 50
    }
})