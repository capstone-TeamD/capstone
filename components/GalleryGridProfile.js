import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  Button,
  RefreshControl,
  View
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SwipeListView } from "react-native-swipe-list-view";


export default function PhotoGrid({
  photos,
  numColumns,
  onEndReached,
  toggleModal,
  handleDelete,
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
        // <TouchableOpacity
        //   style={styles.container}
        //   onClick={() => {
        //     toggleModal({ item });
        //   }}
        // >
        <Image
          key={item.imageId}
          style={styles.photo}
          source={{
            width: size,
            uri: item.imageURL,
          }}
        />
        // </TouchableOpacity>
      )}
      renderHiddenItem={({ item }) => (
        <View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() =>
            handleDelete(item.imageId, item.firebaseURL, item.imageURL)
          }
          >
          {console.log('here I am')}
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() =>
            handleDelete(item.imageId, item.firebaseURL, item.imageURL)
          }
          >
          {console.log('here I am')}
          <Text style={styles.deleteText}>Share</Text>
        </TouchableOpacity>
          </View>
        
      )}
      rightOpenValue={-225}
    />
  );
}


const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
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
  deleteButton: {
    alignSelf: "flex-end",
    width: 75,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  deleteText: {
    fontSize: 13,
    color: "white",
  },
});
