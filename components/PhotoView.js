import React, { useState, useEffect } from "react";
import {View, Image, StyleSheet, Text, Button} from "react-native"
import {
    useDeviceOrientation,
    useDimensions,
  } from "@react-native-community/hooks";
import { touchpointText } from './helperFunctions/touchpoints'
import { TouchableOpacity } from "react-native-gesture-handler";

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

  const { width, height } = useDimensions().window

  console.log('width, height', width, height)
  return (
    <View style={styles.container}>
      <View style={{position: 'absolute', width: width, height: height, resizeMode:'contain'}}>
      <Image source={{uri: imageURL }} style={{width: '100%', height: landscape ? '100%' : '43%'}}/>
      </View>
      {
        textArr.map((textObj, index) => {
          return (
          <TouchableOpacity 
            key={index}
            style={{top: textObj.yCoord, left: textObj.xCoord, position:'absolute', borderWidth: 5, backgroundColor:
         'white'}}
            onPress={() => console.log(textObj.xCoord, textObj.yCoord, textObj.message)}>
              <Image source={require('../assets/pencil-outline.png')}/>
            <Text>{textObj.message}
              </Text>
            </TouchableOpacity>
        )})
      }
    </View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    // flexDirection: 'column',
  }
})

