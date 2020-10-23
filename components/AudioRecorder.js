import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import {audioUpload} from './helperFunctions/audio'

const { width, height } = Dimensions.get("window");
const recording = new Audio.Recording();

export default class AudioRecorder extends Component {
  constructor(props) {
    super();
    this.state={
      audioURI: ''
    }

    this.askMicPermissions = this.askMicPermissions.bind(this);
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.playbackRecording = this.playbackRecording.bind(this)
  }

  askMicPermissions = async () => {
    try {
      const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      console.log("permissions for microphone", response);
      if (response.granted) console.log("permission granted");
      const granted = await Permissions.getAsync(Permissions.AUDIO_RECORDING)
      console.log("granted", granted)
    } catch (error) {
      console.log("Mic permissions denied");
      console.warn(error);
    }
  };


  startRecording = async () => {
    try {
      recording._isDoneRecording = false
      recording.options = null
      recording.uri = null
      console.log("recording started", recording);
      await Audio.setAudioModeAsync({allowsRecordingIOS: true, playsInSilentModeIOS: true})
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      console.log("you are now recording")
      // You are now recording!
    } catch (error) {
        console.warn(error)
    }
  };

  stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
    } catch (error) {
      // Do nothing -- we are already unloaded.
    }
    const uri = recording.getURI()
    console.log("uri", uri)
    this.setState({
      audioURI: uri
    })
  };

  playbackRecording = async () => {
    try {
      const soundObject = await Audio.Sound.createAsync(
        { uri: this.state.audioURI },
        { shouldPlay: true }
      )
      // Your sound is playing!
      console.log('playing music')
      await soundObject.unloadAsync();
    } catch (error) {
      console.log('error', error)
    }
  }


  render() {
    console.log("hello from render");

    return (
      <View style={styles.container}>
        {/* <TouchableOpacity onPress={this.askMicPermissions}>
          <Text>Recorder</Text>
        </TouchableOpacity> */}

        <TouchableOpacity onPress={this.startRecording}>
          <Text>Start</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.stopRecording}>
          <Text>Stop</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.playbackRecording}>
          <Text>Replay</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.getAudio(this.state.audioURI)}>
          <Text>Save Audio</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => audioUpload(this.state.audioURI)}>
        <Text>Upload</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // justifyContent: "space-evenly",
    alignItems: "center",
  },
});

