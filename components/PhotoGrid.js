import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, View, RefreshControl } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import cameraicon from '../assets/cameraicon.png';

export default function PhotoGrid({ photos, numColumns, onEndReached, checkUpdateDate, updateTimestamp}) {
  const { width } = Dimensions.get('window');

  const size = width / numColumns;
  // console.log('grid photos', photos)
  const [refreshing, setRefreshing] = React.useState(false);
  const wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
    console.log('refresh')
    checkUpdateDate(updateTimestamp)
    return setRefreshing(false)});
  }, []);
  // console.log(onRefresh)
  return (
    <FlatList
      data={photos}
      keyExtractor={(item) => {return item.id}}
      numColumns={numColumns}
      onEndReached={onEndReached}
      renderItem={({ item }) => (
        <TouchableOpacity  key={item.id} style={styles.container}>
          <Image
            key={item.id}
            style={styles.photo}
            source={{
              // width: size,
              // uri: item.imageURI,
            }}
          />

          {/* <Image style={styles.icon} source={cameraicon} /> */}
          <Text>Postcard created by: {`${item.id}`}</Text>
        </TouchableOpacity>
      )}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
