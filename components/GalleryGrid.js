import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, View, RefreshControl } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import cameraicon from '../assets/cameraicon.png';

export default function PhotoGrid({ photos, numColumns, onEndReached, checkUpdateDate, updateTimestamp, refreshing}) {
  const { width } = Dimensions.get('window');

  const size = width / numColumns;
  return (
    <FlatList
      data={photos}
      keyExtractor={(item) => {
        return item.imageId;
      }}
      numColumns={numColumns}
      onEndReached={onEndReached}
      renderItem={({ item }) => (
        <TouchableOpacity key={item.imageId} style={styles.container}>
          <Image
            key={item.imageId}
            style={styles.photo}
            source={{
              // width: size,
              uri: item.imageURI,
            }}
          />

          {/* <Image style={styles.icon} source={cameraicon} /> */}
          <Text>Postcard created by: {`${item.username}`}</Text>
        </TouchableOpacity>
      )}
      // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginBottom: 7,
    width: '100%',
  },
  photo: {
    backgroundColor: 'black',
    height: 130,
  },
  icon: {
    width: 80,
    height: 80,
    marginTop: 25,
    marginHorizontal: 30,
  },
});
