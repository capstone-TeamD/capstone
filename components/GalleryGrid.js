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
      console.log('refresh');
      return setRefreshing(false);
    });
  }, []);
  const { width } = Dimensions.get('window');
  // console.log('photos', photos);
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
              Created By: {`${item.username}`}
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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7,
    width: '100%',
    marginTop: 10,
  },
  photoContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  photo: {
    marginTop: 10,
    backgroundColor: 'black',
    height: 150,
    width: '90%',
    alignSelf: 'center',
  },
  icon: {
    width: 80,
    height: 80,
    marginTop: 25,
    marginHorizontal: 30,
  },
  userText: {
    marginHorizontal: 5,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 3,
    fontSize: 11,
  },
});
