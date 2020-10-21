import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';
import {
  useDeviceOrientation,
  useDimensions,
} from '@react-native-community/hooks';
import { touchpointText } from './helperFunctions/touchpoints';
import TouchLabels from './TouchLabels';

export default function PhotoView(props) {
  const { landscape } = useDeviceOrientation();
  const { imageId, imageURL } = props.route.params;
  const [textArr, setTextArr] = useState([]);
  const [touchActive, setActive] = useState(false);

  useEffect(() => {
    console.log('useEffect');
    funcText(imageId);
  }, []);

  const funcText = async (imageId) => {
    const answer = await touchpointText(imageId);
    setTextArr(answer);
  };

  const { width, height } = useDimensions().window;

  console.log('width, height', width, height);

  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          width: width,
          height: height,
          resizeMode: 'contain',
        }}
      >
        <Image
          source={{ uri: imageURL }}
          style={{ width: '100%', height: landscape ? '100%' : '43%' }}
        />
      </View>
      {textArr && !touchActive ? (
        textArr.map((textObj, index) => {
          return (
            <View
              key={index}
              style={{
                ...styles.pointer,
                top: textObj.yCoord,
                left: textObj.xCoord,
              }}
            >
              {console.log('inside of body', touchActive)}
              <Button title='p' onPress={() => setActive(true)} />
            </View>
          );
        })
      ) : (
        <TouchLabels
          touchActive={touchActive}
          setActive={setActive}
          textArr={textArr}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pointer: {
    height: 18,
    width: 18,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 3,
    opacity: 0.8,
  },
});
