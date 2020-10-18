import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { fetchUpdate } from './store/photo';
import { connect } from 'react-redux';
import PhotoGrid from './GalleryGrid';

class Discover extends Component {
  constructor() {
    super();
    this.pullRefresh = this.pullRefresh.bind(this);
  }

  componentDidMount() {
    this.props.checkUpdate(this.props.currentUser);
  }

  pullRefresh() {
    const [refreshing, setRefreshing] = React.useState(false);
    React.useCallback(() => {
      const wait = (timeout) => {
        return new Promise((resolve) => {
          setTimeout(resolve, timeout);
        });
      };
      setRefreshing(true);
      wait(2000).then(() => {
        // this.props.checkUpdate(this.props.currentUser)
        console.log('refresh');
        return setRefreshing(false);
      });
    }, []);
  }

  render() {
    console.log('all photos', this.props.allPhotos);
    // console.log('updateDate', this.props.updateTimestamp)
    return (
      <PhotoGrid
        numColumns={1}
        photos={this.props.allPhotos}
        checkUpdateDate={this.props.checkUpdate}
        updateTimestamp={this.props.updateTimestamp}
        refreshing={this.props.pullRefresh}
      />
    );
  }
}

const mapState = (state) => {
  return {
    allPhotos: state.photo.photos,
    currentUser: state.user.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    checkUpdate: (userId) => dispatch(fetchUpdate(userId)),
  };
};

export default connect(mapState, mapDispatch)(Discover);
