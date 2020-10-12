import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { formatPhotoUri } from '../picsum'

export default function PhotoGrid({ photos, numColumns, onEndReached }) {
  const { width } = Dimensions.get('window')

  const size = width / numColumns

  return (
    <FlatList
      data={photos} //arrray of photos data from firestore/cloud
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      onEndReached={onEndReached}
      renderItem={({ item, index }) => (
        <TouchableOpacity>
          <Image
            key={index}
            style={styles.icon}
            source={{
              width: size,
              // uri: require('../assets/cameraicon.png')
            }}
          />
        </TouchableOpacity>
      )}
    />
  )
}

const styles = StyleSheet.create({
  icon: {
    // width: '100%',
    // height: '100%',
    marginTop: 15,
    marginHorizontal: 20
  }
})