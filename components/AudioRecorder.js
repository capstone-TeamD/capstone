import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { Audio } from "expo-av";
import * as Permissions from "expo-permissions";
import styles from '../styles/audioRecorder'

const { width, height } = Dimensions.get("window");
const recording = new Audio.Recording();

export default class AudioRecorder extends Component {
  constructor(props) {
    super();
    this.state = {
      audioURI: "",
      isRecording: "false",
    };

    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.playbackRecording = this.playbackRecording.bind(this);
  }

  componentDidMount() {
    this.askMicPermissions();
  }

  askMicPermissions = async () => {
    try {
      const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      if (response.granted) console.log("permission granted");
      const granted = await Permissions.getAsync(Permissions.AUDIO_RECORDING);
      console.log("granted", granted);
    } catch (error) {
      console.log("Mic permissions denied");
      console.warn(error);
    }
  };

  startRecording = async () => {
    try {
      recording._isDoneRecording = false;
      recording.options = null;
      recording.uri = null;
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      console.log("you are now recording");
    } catch (error) {
      console.warn(error);
    }
  };

  stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
    } catch (error) {
      // Do nothing -- we are already unloaded.
    }
    const uri = recording.getURI();
    console.log("uri", uri);
    this.setState({
      audioURI: uri,
    });
  };

  playbackRecording = async () => {
    try {
      const soundObject = await Audio.Sound.createAsync(
        { uri: this.state.audioURI },
        { shouldPlay: true }
      );
      console.log("playing music");
      await soundObject.unloadAsync();
    } catch (error) {
      console.log("error", error);
    }
  };

  isRecordingState = async () => {
    await this.startRecording()
    this.setState({
      isRecording: !this.state.isRecording
    })
  }

  isStoppedRecording = async () => {
    await this.stopRecording()
    this.setState({
      isRecording: !this.state.isRecording
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.micContainer}>
          <Image style={styles.mic} source={require("../assets/mic2.png")} />
        </View>
        <View style={styles.buttons}>
          
          <TouchableOpacity onPress={this.isStoppedRecording}>
            <Image
              style={styles.playButton}
              source={require("../assets/stop.png")}
            />
          </TouchableOpacity>
          {this.state.isRecording ? (

          <TouchableOpacity onPress={this.isRecordingState}>
            <Image
              style={styles.playButton}
              source={require("../assets/record.png")}
            />
          </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={this.startRecording}>
            <Image
              style={styles.playButton}
              source={require("../assets/blankRecord.png")}
            />
          </TouchableOpacity>
          )}

          <TouchableOpacity onPress={this.playbackRecording}>
            <Image
              style={styles.playButton}
              source={require("../assets/play.png")}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.saveContainer}
          onPress={() => this.props.getAudio(this.state.audioURI)}
        >
          <Text style={styles.saveText}>Save Audio</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
