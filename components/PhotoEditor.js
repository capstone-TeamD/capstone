import React, { Component } from 'react';
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
  ActivityIndicator
} from 'react-native';

import background from '../assets/whiteBG.jpg';

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
      loading: false
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
      message: this.state.inputText
    }
    this.setState({
      inputText: '',
      textArray: [...this.state.textArray, messageObj]
    })
    //change opacity of button
    console.log(styles.pointer.backgroundColor)
    // styles.pointer.backgroundColor = 'white';
  }

  uploadPostcard(type) {
    this.props.upload(this.state.textArray)
    // console.log(state)
    this.setState({loading: type})
  }

  render() {
    const texts = this.state.textArray.map(obj => {
     return obj.message})
    // console.log('texts', texts)

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    console.log('width, height', width, height)

    const { upload, image, setImage } = this.props;

    return (
      <View style={styles.container}>
        <Modal
          transparent={true}
          animationType={'none'}
          visible={this.state.loading}
        >
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <ActivityIndicator
                animating={this.state.loading}
                size='large' />
            </View>
          </View>
        </Modal>
        <ImageBackground source={background} style={styles.imageBackground}>
          {/* <Image source={{ uri: image }} style={{...styles.innerPhoto, width: width, height: height}}/> */}
          <Image source={{ uri: image }} style={styles.innerPhoto}/>
          <Animated.View
            style={{
              transform: [
                { translateX: this.pan.x },
                { translateY: this.pan.y },
              ],
            }}
            {...this.panResponder.panHandlers}
          >
            <View style={styles.pointer} />
          </Animated.View>
        </ImageBackground>
        {this.state.isActive ? (
          <View style={styles.inputBox}>
            <TextInput
              value={this.state.inputText}
              onChangeText={(inputText) => this.setState({ inputText })}
              placeholder='Enter text'
              autoCapitalize='none'
              multiline={true}
              enablesReturnKeyAutomatically={true}
              style={styles.textInput}
            />
            <Button 
              style={styles.button}
              onPress={() => this.getText()}
              title='Save Changes'
            />
            <Button
              style={styles.button}
              title='Upload Postcard'
              // onPress={() => upload(this.state.textArray)}
              onPress={() => this.uploadPostcard(true)}
            />
            <Button
              style={styles.button}
              title='Cancel'
              onPress={() => setImage(null)}
            />
            {
              texts[0] ? texts.map((message) => <Text>{message}</Text>) : <Text>No messages saved! Move the touchpoint to add a message/audio</Text>
            }
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
              onPress={upload}
            />
            <Button
              style={styles.button}
              title='Cancel'
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
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  pointer: {
    height: 15,
    width: 15,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  imageBackground: {
    width: '100%',
    flex: 1,
  },
  inputBox: {
    flex: 1,
    width: '90%',
    fontSize: 15,
    textAlign: 'center',
  },
  textInput: {
    height: '30%',
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  button: {
    flex: 1,
  },
  innerPhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    position: 'absolute',
  },
  inputBackground: {
    flex: 1,
    width: '100%',
  },
  text: {
    padding: 40,
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
});

export default PhotoEditor;
