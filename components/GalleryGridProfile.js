import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  Button,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function PhotoGrid({
  photos,
  numColumns,
  onEndReached,
  toggleModal,
  handleDelete,
}) {
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
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            toggleModal({ item });
          }}
        >
          <Image
            key={item.imageId}
            style={styles.photo}
            source={{
              uri: item.imageURL,
            }}
          />
          <TouchableOpacity
            onPress={() =>
              handleDelete(item.imageId, item.firebaseURL, item.imageURL)
            }
          >
            <Text style={styles.buttonDelete}>Delete</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '100%',
  },
  photo: {
    height: 140,
  },
  icon: {
    width: 80,
    height: 80,
    marginTop: 25,
    marginHorizontal: 30,
  },
  buttonDelete: {
    fontSize: 13,
    alignSelf: "center",
    color: "blue",
    margin: 3,
  }
});
