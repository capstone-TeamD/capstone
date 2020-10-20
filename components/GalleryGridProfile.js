import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  RefreshControl,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
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
      console.log("refresh");
      return setRefreshing(false);
    });
  }, []);

  const { width } = Dimensions.get("window");
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
        <Image
          key={item.imageId}
          style={styles.photo}
          source={{
            width: size,
            uri: item.imageURL,
          }}
        />
      )}
      renderHiddenItem={({ item }) => (
        <View style={styles.container}>
          <TouchableOpacity
            style={{...styles.swipeButton, backgroundColor: "red"}}
            onPress={() =>
              handleDelete(item.imageId, item.firebaseURL, item.imageURL)
            }
          >
            <Image source={require("../assets/delete.png")} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.swipeButton, backgroundColor: "#FFA500"}}
            onPress={() => alert("hello")}
          >
            <Image source={require("../assets/share.png")} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.swipeButton, backgroundColor: "#B8B8B8"}}
            onPress={() => toggleModal({ item })}
          >
            <Image source={require("../assets/magnify-plus.png")} />
          </TouchableOpacity>
        </View>
      )}
      rightOpenValue={-225}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    display: "flex",
    flexDirection: "row-reverse",
  },
  photo: {
    height: 140,
    marginBottom: 3,
  },
  icon: {
    width: 80,
    height: 80,
    marginTop: 25,
    marginHorizontal: 30,
  },
  swipeButton: {
    width: 75,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFA500",
    marginBottom: -3,
  },
});
