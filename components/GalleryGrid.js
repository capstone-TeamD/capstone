import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { viewDiscoverPostcard } from './helperFunctions/Send';
import styles from '../styles/galleryGrid'

export default function PhotoGrid({
  photos,
  numColumns,
  onEndReached,
  checkUpdateDate,
  userId,
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
      checkUpdateDate(userId);
      return setRefreshing(false);
    });
  }, []);
  const { width } = Dimensions.get('window');
  const navigation = useNavigation();

  const openDiscoverPostcard = async (imageId, imageURI) => {
    await viewDiscoverPostcard(imageId).then((result) => {
      let audioToRender = '';
      if (result !== 'no audio') {
        audioToRender = result;
      }
      navigation.navigate('Postcard View', {
        imageId: imageId,
        imageURL: imageURI,
        audioURL: audioToRender,
      });
    });
  };

  return (
    <FlatList
      data={photos}
      keyExtractor={(item) => {
        return item.imageId;
      }}
      numColumns={numColumns}
      onEndReached={onEndReached}
      renderItem={({ item }) => (
        <TouchableOpacity
          key={item.id}
          style={styles.container}
          onPress={() => openDiscoverPostcard(item.imageId, item.imageURI)}
        >
          <View style={styles.photoContainer}>
            <Image
              key={item.imageId}
              style={styles.photo}
              source={{
                uri: item.imageURI,
              }}
            />
            <Text style={styles.userText}>
              Created by: {`${item.username}`}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
}