import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { formatPhotoUri } from '../picsum'

export default function PhotoGrid({ photos, numColumns, onEndReached }) {
  const { width } = Dimensions.get('window')

  const size = width / numColumns

  return (
    <FlatList
      data={photos} //arrray of uri data from firestore/cloud
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      onEndReached={onEndReached}
      renderItem={({ item, index }) => (
        <TouchableOpacity>
          <Image
            key={index}
            style={styles.photo}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/capstone-postcards.appspot.com/o/photos%2F1602514126417.jpg?alt=media&token=f2718311-7c8e-41e3-a0e3-b4f5d751c273'
            }}
           />
        </TouchableOpacity>
      )}
    />
  )
}

const styles = StyleSheet.create({
  photo: {
    backgroundColor: 'black',
    marginTop: 15,
  }
})