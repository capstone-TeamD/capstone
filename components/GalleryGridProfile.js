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
import cameraicon from '../assets/cameraicon.png';
import { deleteTest } from './store/photo';
// import { SwipeListView } from "react-native-swipe-list-view";

// function for swipe delete
// function renderHiddenItem(photo) {
//   return (
//     <TouchableOpacity
//       styles={styles.deleteButton}
//       onSwipe={() => handleDelete(photo.id)}
//     >
//       <Text style={styles.deleteText} title="Delete"></Text>
//     </TouchableOpacity>
//   );
// }

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
              // width: size,
              uri: item.imageURL,
            }}
          />
          {/* <Text>Postcard ID: {item.imageId}</Text>
          <Text>Postcard is rendering from: {item.imageURL}</Text> */}
          {/* <SwipeListView
            renderHiddenItem={({ item }) => renderHiddenItem(item)}
            rightOpenValue={-75}
          /> */}

          <TouchableOpacity
            onPress={() =>
              handleDelete(item.imageId, item.firebaseURL, item.imageURL)
            }
          >
            <Button title='Delete'></Button>
          </TouchableOpacity>
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
  deleteButton: {
    alignSelf: 'flex-end',
    width: 75,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    marginVertical: 3,
  },
  deleteText: {
    fontSize: 12,
    color: 'white',
  },
});
