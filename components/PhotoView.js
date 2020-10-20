import React from "react";
import {View, Image, StyleSheet} from "react-native"
import {
    useDeviceOrientation,
    useDimensions,
  } from "@react-native-community/hooks";
import {touchpointText} from './helperFunctions/touchpoints'

export default function PhotoView(props) {
    const {landscape} = useDeviceOrientation()
    const {imageId, imageURL} = props.route.params

  touchpointText(imageId)
  // console.log('data', data)
  return (
    <View style={styles.container}>
      <Image source={{uri: imageURL }} style={{width: '100%', height: landscape ? '100%' : '43%'}}/>
    </View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

