import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import cameraicon from '../assets/cameraicon.png';

export default function PhotoGrid({ photos, numColumns, onEndReached }) {
  const { width } = Dimensions.get('window');

  const size = width / numColumns;

  return (
    <FlatList
      data={photos}
      keyExtractor={(item, index) => index.toString()}
      numColumns={numColumns}
      onEndReached={onEndReached}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.container}>
          <Image
            // key={item.id}
            style={styles.photo}
            source={{
              // width: size,
              uri: item,
            }}
          />

          {/* <Image style={styles.icon} source={cameraicon} />
          <Text>Photo URI: {item}</Text> */}
        </TouchableOpacity>
      )}
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
    height: 130,
  },
  icon: {
    width: 80,
    height: 80,
    marginTop: 25,
    marginHorizontal: 30,
  },
});
