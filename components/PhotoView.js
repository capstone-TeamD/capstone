import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Button, TouchableOpacity, Text } from "react-native";
import {
  useDeviceOrientation,
  useDimensions,
} from "@react-native-community/hooks";
import { touchpointText, touchpointAudio } from "./helperFunctions/touchpoints";
import TouchLabels from "./TouchLabels";
import { Audio } from "expo-av";

export default function PhotoView(props) {
  const { landscape } = useDeviceOrientation();
  const { imageId, imageURL, audioURL } = props.route.params;
  const [textArr, setTextArr] = useState([]);
  const [audioArr, setAudioArr] = useState([]);
  const [touchActive, setActive] = useState(false);

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
      const soundObject = await Audio.Sound.createAsync(
        { uri: audioURL },
        { shouldPlay: true }
      );
      // Your sound is playing!
      console.log("playing music");
    } catch (error) {
      console.log("error", error);
    }
  };

  const { width, height } = useDimensions().window;

  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
          width: width,
          height: height,
          resizeMode: "contain",
        }}
      >
        <Image
          source={{ uri: imageURL }}
          style={{ width: "100%", height: landscape ? "100%" : "30%" }}
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
              <Button title="p" onPress={() => setActive(true)} />
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
      <>
        {audioArr[0] ? (
          <TouchableOpacity style={{
            top: audioArr[0].yCoord,
            left: audioArr[0].xCoord,
          }} onPress={() => playAudio()}>
             <Image style={styles.mic}
              source={require("../assets/micCircle.png")} 
            /> 
          </TouchableOpacity>
        ) : null}
      </>
      <View style={styles.text}>
        <Text>Tap on touchpoints to reveal or close messages/audio</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pointer: {
    height: 20,
    width: 20,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 3,
    opacity: 0.8,
  },
  mic: {
    width: 25,
    height: 25,
  },
  text: {
    alignSelf: "center",
    marginTop: "75%",
  }
});
