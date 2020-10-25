import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Text,
  ImageBackground,
  Image,
  Button,
  Dimensions,
  Keyboard,
  Animated,
  Alert,
} from 'react-native';
import background from '../assets/whiteBG.jpg';
import { Loader } from './Loader';
import ButtonOptions from './ButtonOptions';
import TextBox from './TextBox';
import AudioRecorder from './AudioRecorder';
import styles from '../styles/photoEditor';

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
      orientation: '',
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
      xCoord: this.state.xCoord / this.props.width,
      yCoord: this.state.yCoord / this.props.height,
      message: this.state.inputText,
    };
    this.setState({
      inputText: '',
      textArray: [...this.state.textArray, messageObj],
    });
    Keyboard.dismiss();
  }

  getAudio(audioURI) {
    const audioObj = {
      xCoord: this.state.xCoord / this.props.width,
      yCoord: this.state.yCoord / this.props.height,
      audioLink: audioURI,
    };
    this.setState({
      audioArray: [...this.state.audioArray, audioObj],
    });
    // alert("Audio saved!")
    Alert.alert(
      'Success!',
      'Audio saved.',
      [
        {
          text: 'OK',
        },
      ],
      { cancelable: false }
    );
  }

  uploadPostcard(type) {
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
            {this.state.textActive ? (
              <TextBox
                onChangeText={this.onChangeText}
                inputText={this.state.inputText}
                getText={this.getText}
                texts={this.state.textArray}
              />
            ) : (
              <View style={styles.buttonContainer} />
            )}

            {this.state.audioActive ? (
              <AudioRecorder getAudio={(audioURI) => this.getAudio(audioURI)} />
            ) : (
              <View style={styles.buttonContainer} />
            )}
            {!texts[0] && (
              //TODO: later add saved touchpoint texts to screen for viewing
              // texts.map((message, index) => (
              //   <View style={styles.textContainer} key={index}>
              //     <Text style={styles.textSaved}>{message}</Text>
              //   </View>
              // ))
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
          setImage={setImage}
          uploadPostcard={this.uploadPostcard}
        />
      </View>
    );
  }
}

export default PhotoEditor;
