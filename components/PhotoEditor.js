import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Text,
  ImageBackground,
  Image,
  TextInput,
  Button,
  Dimensions,
  Keyboard,
  Animated,
} from 'react-native';
import background from '../assets/whiteBG.jpg';
import { Loader } from './Loader';
import ButtonOptions from './ButtonOptions';
import TextBox from './TextBox';
import AudioRecorder from './AudioRecorder';

class PhotoEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      isActive: false,
      xCoord: 0,
      yCoord: 0,
      addingTouchpoint: false,
      textArray: [],
      loading: false,
      audioURI: '',
      audioArray: [],
      textActive: false,
      audioActive: false,
    };
    this.getText = this.getText.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.uploadPostcard = this.uploadPostcard.bind(this);
    this.showButton = this.showButton.bind(this);
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
        console.log('x', this.pan.x);
        console.log('y', this.pan.y);
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
      inputText: '',
      textArray: [...this.state.textArray, messageObj],
    });
  }

  getAudio(audioURI) {
    // console.log(this.state)
    const audioObj = {
      xCoord: this.state.xCoord,
      yCoord: this.state.yCoord,
      audioLink: audioURI,
    };
    this.setState({
      audioArray: [...this.state.audioArray, audioObj],
    });
  }

  uploadPostcard(type) {
    // console.log('uploadpostcard', this.state.textArray, this.state.audioArray)
    this.props.upload(this.state.textArray, this.state.audioArray);
    this.setState({ loading: type });
  }

  showButton(type) {
    if (type === 'text') {
      this.setState({
        textActive: true,
        audioActive: false,
      });
    }
    if (type === 'audio') {
      this.setState({
        textActive: false,
        audioActive: true,
      });
    }
  }

  onChangeText(text) {
    this.setState({
      inputText: text,
    });
  }

  render() {
    const texts = this.state.textArray.map((obj) => {
      return obj.message;
    });

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    const { upload, image, setImage } = this.props;
    console.log('state', this.state);
    return (
      <View style={styles.container}>
        <Loader loader={this.state.loading} />
        <ImageBackground source={background} style={styles.imageBackground}>
          <Image source={{ uri: image }} style={{ ...styles.innerPhoto }} />
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
              <Image source={require('../assets/cursor1.png')} />
            </View>
          </Animated.View>
        </ImageBackground>
        {this.state.isActive ? (
          <View style={styles.inputBox}>
            {this.state.textActive && (
              <TextBox
                onChangeText={this.onChangeText}
                inputText={this.state.inputText}
                getText={this.getText}
              />
            )}

            {this.state.audioActive && (
              <AudioRecorder getAudio={(audioURI) => this.getAudio(audioURI)} />
            )}

            <Button
              style={styles.button}
              title='Upload Postcard'
              onPress={() => this.uploadPostcard(true)}
            />
            <Button
              style={styles.button}
              title='Cancel'
              onPress={() => setImage(null)}
            />

            {texts[0] ? (
              texts.map((message, index) => (
                <View style={styles.textContainer} key={index}>
                  <Text style={styles.textSaved}>{message}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.text}>
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
              title='Upload Postcard'
              onPress={() => this.uploadPostcard(true)}
            />
            <Button
              style={styles.button}
              title='Cancel'
              onPress={() => setImage(null)}
            />
          </ImageBackground>
        )}
        <ButtonOptions
          buttonActive={this.state.isActive}
          showButton={this.showButton}
          textActive={this.state.textActive}
          audioActive={this.state.audioActive}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    flex: 1,
    marginBottom: -50,
  },
  pointer: {
    height: 18,
    width: 18,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 3,
  },
  imageBackground: {
    width: '100%',
    flex: 0.6,
  },
  button: {
    flex: 1,
  },
  innerPhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
    position: 'absolute',
  },
  inputBackground: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    padding: 35,
    textAlign: 'center',
  },
  textContainer: {
    marginTop: 15,
  },
  textSaved: {
    textAlign: 'center',
  },
  inputBox: {
    flex: 1,
    width: '100%',
    fontSize: 14,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
});

export default PhotoEditor;
