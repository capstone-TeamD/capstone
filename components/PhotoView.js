import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  useDeviceOrientation,
  useDimensions,
} from '@react-native-community/hooks';
import { touchpointText, touchpointAudio } from './helperFunctions/touchpoints';
import TouchLabels from './TouchLabels';
import { Audio } from 'expo-av';
import styles from '../styles/photoView'
import TouchLabelsText from './TouchLabelsText';
import TouchLabelsAudio from './TouchLabelsAudio';

export default function PhotoView(props) {
  const { landscape } = useDeviceOrientation();
  const { imageId, imageURL, audioURL } = props.route.params;
  const [textArr, setTextArr] = useState([]);
  const [audioArr, setAudioArr] = useState([]);

  useEffect(() => {
    funcText(imageId);
    funcAudio(imageId);
  }, []);

  const funcText = async (imageId) => {
    const msgs = await touchpointText(imageId);
    setTextArr(msgs);
  };

  //function to take the audio url from local storage and have it ready to play
  const funcAudio = async (imageId) => {
    const aud = await touchpointAudio(imageId);
    setAudioArr(aud);
  };

  const playAudio = async () => {
    const recording = new Audio.Recording();
    try {
      await Audio.Sound.createAsync({ uri: audioURL }, { shouldPlay: true });
      // Your sound is playing!
      console.log('playing music');
    } catch (error) {
      console.log('error', error);
    }
  };

  const { width, height } = useDimensions().window;

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
          style={{ width: '100%', height: landscape ? '100%' : '30%' }}
        />
      </View>
      {textArr.length > 0 ? (
        textArr.map((textObj, index) => {
          return (
            landscape ? 
              <TouchLabelsText textObj={textObj} key={index} xWidth={width} yHeight={height * 3.3}/> :
              <TouchLabelsText textObj={textObj} key={index} xWidth={width} yHeight={height}/>
          )
        })): null }
      <>
        {audioArr[0] ? (
          landscape ? 
          <TouchLabelsAudio audioArr={audioArr} xWidth={width} yHeight={height * 3.3} playAudio={playAudio}/> : <TouchLabelsAudio audioArr={audioArr} xWidth={width} yHeight={height} playAudio={playAudio}/>
        ) : null }
      </>
      <View style={styles.text}>
        <Text>Tap on touchpoints to reveal or hide messages/audio</Text>
      </View>
    </View>
  );
}

