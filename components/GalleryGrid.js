import React from "react";
import { Dimensions, FlatList, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function PhotoGrid({ photos, numColumns, onEndReached }) {
  const { width } = Dimensions.get("window");

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
              width: size,
              uri: item.imageURI,
            }}
          />
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginBottom: 7,
    width: "100%",
  },
  photo: {
    height: 130,
  },
});
