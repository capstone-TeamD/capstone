import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { fetchPhotos } from './store/photo';
import { connect } from 'react-redux';
import PhotoGrid from './GalleryGrid';
import { getUser } from './store/user';

class Discover extends Component {
  componentDidMount() {
    this.props.getAllPhotos();
    // this.props.getUser();
  }

  render() {
    console.log('all photos', this.props.allPhotos);
    return <PhotoGrid numColumns={1} photos={this.props.allPhotos} />;
  }
}

const mapState = (state) => {
  return {
    allPhotos: state.photo,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getAllPhotos: () => dispatch(fetchPhotos()),
    // getUser: () => dispatch(getUser()),
  };
};

export default connect(mapState, mapDispatch)(Discover);
