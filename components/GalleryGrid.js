import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { formatPhotoUri } from '../picsum';

export default function PhotoGrid({ photos, numColumns, onEndReached }) {
  const { width } = Dimensions.get('window');

  const size = width / numColumns;

  return (
    <FlatList
      data={photos}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      onEndReached={onEndReached}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.container}>
          <Image
            key={item.id}
            style={styles.photo}
            source={{
              // width: size,
              uri: item.imageURI,
            }}
          />
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  photo: {
    // backgroundColor: 'black',

    width: '100%',
    height: '100%',
  },
  container: {
    marginBottom: 15,
    height: '100%',
  },
});
