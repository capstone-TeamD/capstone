import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Button,
  Text
} from 'react-native';
import styles from '../styles/photoView';

export default function TouchLabelsText({textObj, yHeight, xWidth}) {
  const [touchActive, setActive] = useState(false);
  return (
    <>
    {
      touchActive ? 
      (<View
        style={{
          ...styles.box,
          top: textObj.yCoord * yHeight,
          left: textObj.xCoord * xWidth,
        }}
      >
        <View style={styles.triangle} />
        <Text style={styles.boxText} onPress={() => setActive(false)}>
          {textObj.message}
        </Text>
      </View>):(<View
      style={{
        ...styles.pointer,
        top: textObj.yCoord * yHeight,
        left: textObj.xCoord * xWidth,
      }}
    >
      <Button title='p' onPress={() => setActive(true)} />
    </View>) 
    }
    </>
  )
}