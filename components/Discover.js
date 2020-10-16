import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, StyleSheet, Text, SafeAreaView, RefreshControl} from 'react-native';
import { fetchPhotos, fetchUpdate } from './store/photo';
import { connect } from 'react-redux';
import PhotoGrid from './PhotoGrid';
import { getUser } from './store/user';

class Discover extends Component {
  constructor() {
    super()
    this.pullRefresh = this.pullRefresh.bind(this)
  }

  componentDidMount() {
    this.props.getAllPhotos();
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
      this.props.checkUpdate(this.props.updateTimestamp)
      console.log('refresh')
      return setRefreshing(false)});
    }, []);
  }

  render() {
    console.log('all photos', this.props.allPhotos);
    console.log('updateDate', this.props.updateTimestamp)
    return <PhotoGrid numColumns={1} photos={this.props.allPhotos} checkUpdateDate={this.props.checkUpdate} updateTimestamp={this.props.updateTimestamp}/>;
  }
}

const mapState = (state) => {
  return {
    allPhotos: state.photo.photos,
    updateTimestamp: state.photo.updateDate
  };
};

const mapDispatch = (dispatch) => {
  return {
    getAllPhotos: () => dispatch(fetchPhotos()),
    checkUpdate: (obj) => dispatch(fetchUpdate(obj))
    // getUser: () => dispatch(getUser()),
  };
};

export default connect(mapState, mapDispatch)(Discover);
