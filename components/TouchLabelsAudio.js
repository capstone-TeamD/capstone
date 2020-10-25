import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/photoView'

export default function TouchLabelsAudio({audioArr, xWidth, yHeight, playAudio}) {

  return (
    <TouchableOpacity
    style={{
      top: audioArr[0].yCoord * yHeight,
      left: audioArr[0].xCoord * xWidth,
      position: 'absolute',
    }}
    onPress={() => playAudio()}
    >
    <Image
      style={styles.mic}
      source={require('../assets/micCircle.png')}
    />
    </TouchableOpacity>
  )
}