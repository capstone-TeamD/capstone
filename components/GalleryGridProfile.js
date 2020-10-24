import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  RefreshControl,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SwipeListView } from 'react-native-swipe-list-view';
import styles from '../styles/galleryGridProfile'

export default function PhotoGrid({
  photos,
  numColumns,
  onEndReached,
  toggleModal,
  handleDelete,
  navigate,
}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    const wait = (timeout) => {
      return new Promise((resolve) => {
        setTimeout(resolve, timeout);
      });
    };
    setRefreshing(true);
    wait(2000).then(() => {
      console.log('refresh');
      return setRefreshing(false);
    });
  }, []);

  const { width } = Dimensions.get('window');
  const size = width / numColumns;

  return (
    <SwipeListView
      data={photos}
      keyExtractor={(item) => {
        return item.imageId;
      }}
      numColumns={numColumns}
      onEndReached={onEndReached}
      renderItem={({ item }) => (
        <Image
          key={item.imageId}
          style={styles.photo}
          source={{
            width: size,
            uri: item.imageURL,
          }}
        />
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      renderHiddenItem={({ item }) => (
        <View style={styles.container}>
          <TouchableOpacity
            style={{ ...styles.swipeButton, backgroundColor: 'red' }}
            onPress={() =>
              handleDelete(
                item.imageId,
                item.firebaseURL,
                item.imageURL,
                item.firebaseAudioURL
              )
            }
          >
            <Image source={require('../assets/delete.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.swipeButton, backgroundColor: '#FFA500' }}
            onPress={() => toggleModal(item.imageId)}
          >
            <Image source={require('../assets/share.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.swipeButton, backgroundColor: '#B8B8B8' }}
            onPress={() =>
              navigate('Postcard View', {
                imageId: item.imageId,
                imageURL: item.imageURL,
                audioURL: item.audioURL,
              })
            }
          >
            <Image source={require('../assets/magnify-plus.png')} />
          </TouchableOpacity>
        </View>
      )}
      rightOpenValue={-225}
    />
  );
}