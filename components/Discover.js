import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, StyleSheet, Text, SafeAreaView, RefreshControl} from 'react-native';
import { fetchPhotos, fetchUpdate } from './store/photo';
import { connect } from 'react-redux';
import PhotoGrid from './GalleryGrid';
import { getUser } from './store/user';

class Discover extends Component {
  constructor() {
    super()
    this.pullRefresh = this.pullRefresh.bind(this)
  }

  componentDidMount() {
    // this.props.getAllPhotos();
    this.props.checkUpdate(this.props.currentUser)
    // this.props.getUser();
  }

  pullRefresh() {
    const [refreshing, setRefreshing] = React.useState(false);
    React.useCallback(() => {
      const wait = timeout => {
        return new Promise(resolve => {
          setTimeout(resolve, timeout);
        });
      };
      setRefreshing(true);
      wait(2000).then(() => {
      this.props.checkUpdate(this.props.currentUser)
      console.log('refresh')
      return setRefreshing(false)});
    }, []);
  }

  render() {
    console.log('all photos', this.props.allPhotos);
    // console.log('updateDate', this.props.updateTimestamp)
    return <PhotoGrid numColumns={1} photos={this.props.allPhotos} checkUpdateDate={this.props.checkUpdate} updateTimestamp={this.props.updateTimestamp} refreshing={this.props.pullRefresh}/>;
  }
}

const mapState = (state) => {
  return {
    allPhotos: state.photo.photos,
    currentUser: state.user.id
    // updateTimestamp: state.photo.updateDate
  };
};

const mapDispatch = (dispatch) => {
  return {
    getAllPhotos: () => dispatch(fetchPhotos()),
    checkUpdate: (userId) => dispatch(fetchUpdate(userId))
    // getUser: () => dispatch(getUser()),
  };
};

export default connect(mapState, mapDispatch)(Discover);
