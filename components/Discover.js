import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {fetchPhotos} from './store/photo'
import { connect } from 'react-redux';
import PhotoGrid from './GalleryGrid';

class Discover extends Component {
  componentDidMount() {
    this.props.getAllPhotos()
  }

  render() {
    return (
      <>
      <PhotoGrid numColumns={1} photos={this.props.allPhotos}/>
      </>
      // <View style={styles.container}>
      // </View>
    );
  }
}

const mapState = (state) => {
  return {
    allPhotos: state.photo
  }
}

const mapDispatch = (dispatch) => {
  return {
    getAllPhotos: () => dispatch(fetchPhotos())
  }
}

export default connect(mapState, mapDispatch)(Discover)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
