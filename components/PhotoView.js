import React, { useState, useEffect } from "react";
import {View, Image, StyleSheet, Text} from "react-native"
import {
    useDeviceOrientation,
    useDimensions,
  } from "@react-native-community/hooks";
import { touchpointText } from './helperFunctions/touchpoints'

export default function PhotoView(props) {
  const {landscape} = useDeviceOrientation()
  const {imageId, imageURL} = props.route.params
  const [textArr, setTextArr] = useState([])

  useEffect(() => {
    console.log('useEffect')
    funcText(imageId)
  }, [])

  const funcText = async (imageId) => {
    const answer = await touchpointText(imageId)
    setTextArr(answer)
  }

  console.log('textArr', textArr)

  return (
    <View style={styles.container}>
      <Text>text</Text>
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

