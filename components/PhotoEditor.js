import React, { Component } from "react";
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  ImageBackground,
  Image,
  TextInput,
  Button,
  Dimensions,
  Modal,
  Keyboard,
} from 'react-native';
import background from '../assets/whiteBG.jpg';
import { Loader } from './Loader';

class PhotoEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      isActive: false,
      xCoord: 0,
      yCoord: 0,
      addingTouchpoint: false,
      textArray: [],
      loading: false,
      audioURI: '',
      audioObj: []
    };
    this.getText = this.getText.bind(this)
    this.uploadPostcard = this.uploadPostcard.bind(this)
  }

  pan = new Animated.ValueXY();
  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      this.pan.setOffset({
        x: this.pan.x._value,
        y: this.pan.y._value,
      });
    },
    onPanResponderMove: Animated.event(
      [null, { dx: this.pan.x, dy: this.pan.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: () => {
      this.pan.flattenOffset();
      if (this.pan.x._value > 0) {
        console.log("x", this.pan.x);
        console.log("y", this.pan.y);
        this.setState({
          isActive: true,
          xCoord: this.pan.x._value,
          yCoord: this.pan.y._value,
        });
      }
    },
  });

  getText() {
    const messageObj = {
      xCoord: this.state.xCoord,
      yCoord: this.state.yCoord,
      message: this.state.inputText,
    };
    this.setState({
      inputText: "",
      textArray: [...this.state.textArray, messageObj],
    });
  }

  uploadPostcard(type) {
    this.props.upload(this.state.textArray)
    this.setState({loading: type})
  }

  render() {
    const texts = this.state.textArray.map((obj) => {
      return obj.message;
    });

    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;
    console.log("width, height", width, height);

    const { upload, image, setImage } = this.props;

    return (
      <View style={styles.container}>
        <Loader loader={this.state.loading} />
        <ImageBackground source={background} style={styles.imageBackground}>
          <Image source={{ uri: image }} style={styles.innerPhoto} />
          <Animated.View
            style={{
              transform: [
                { translateX: this.pan.x },
                { translateY: this.pan.y },
              ],
            }}
            {...this.panResponder.panHandlers}
          >
            <View>
              <Image source={require("../assets/cursor1.png")} />
            </View>
          </Animated.View>
        </ImageBackground>
        {this.state.isActive ? (
          <View style={styles.inputBox}>
            <TextInput
              value={this.state.inputText}
              onChangeText={(inputText) => this.setState({ inputText })}
              placeholder="Enter text"
              autoCapitalize="none"
              multiline={true}
              enablesReturnKeyAutomatically={true}
              style={styles.textInput}
              returnKeyType="done"
              maxLength = {25}
              blurOnSubmit={true}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
            />
            <Button
              style={styles.button}
              onPress={() => this.getText()}
              title="Save Touchpoint"
            />
            <Button
              style={styles.button}
              title="Upload Postcard"
              onPress={() => this.uploadPostcard(true)}
            />
            <Button
              style={styles.button}
              title="Cancel"
              onPress={() => setImage(null)}
            />
            {texts[0] ? (
              texts.map((message, index) => 
              <View style={styles.textContainer} key={index}>
              <Text style={styles.textSaved}>{message}</Text>
              </View>
              )
            ) : (
              <Text style={styles.text} >
                No messages saved! Move the touchpoint to add a message/audio
              </Text>
            )}
          </View>
        ) : (
          <ImageBackground source={background} style={styles.inputBackground}>
            <Text style={styles.text}>
              Drag and drop the pointer to select a location to add a touchpoint
              to your postcard, or click the upload button below to send as is.
            </Text>
            <Button
              style={styles.button}
              title="Upload Postcard"
              onPress={upload}
            />
            <Button
              style={styles.button}
              title="Cancel"
              onPress={() => setImage(null)}
            />
          </ImageBackground>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  pointer: {
    height: 18,
    width: 18,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 3,
  },
  imageBackground: {
    width: "100%",
    flex: 1,
  },
  inputBox: {
    flex: 1,
    width: "100%",
    fontSize: 14,
    textAlign: "center",
    backgroundColor: "#fff",
  },
  textInput: {
    width: "70%",
    height: "15%",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    padding: 14,
    borderColor: "#585858",
    backgroundColor: "#F5F5F5",
    shadowColor: "#000000",
    shadowOpacity: .7,
    shadowRadius: 1,
    shadowOffset: {
      height: -1,
      width: -1,
    },
  },
  button: {
    flex: 1,
  },
  innerPhoto: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
  },
  inputBackground: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  text: {
    padding: 35,
    textAlign: "center",
  },
  textContainer: {
    marginTop: 15,
  },  
  textSaved: {
    textAlign: "center",
  }
});

export default PhotoEditor;
