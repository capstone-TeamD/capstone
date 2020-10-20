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
  Keyboard,
  Button,
} from 'react-native';

import testPhoto from '../assets/testPhoto.jpg';
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
      textArray: []
    };
    this.getText = this.getText.bind(this)
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
    onPanResponderMove: Animated.event([
      null,
      { dx: this.pan.x, dy: this.pan.y },
    ]),
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

  render() {
    const texts = this.state.textArray.map(obj => {
     return obj.message})
     console.log('texts', texts)
     console.log('texts', texts)
    const {upload, image} = this.props
    console.log(this.state);
    return (
      <View style={styles.container}>
        <ImageBackground source={background} style={styles.imageBackground}>
          <Image source={{uri: image}} style={styles.innerPhoto} />
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
              placeholder='Text input'
              autoCapitalize='none'
              onSubmitEditing={Keyboard.dismiss}
            />
            <Button 
              title='Submit'
              onPress={() => this.getText()}
            />
            <Button title='Upload' onPress={() => upload(this.state.textArray)} />
            {
              texts[0] ? texts.map((message) => <Text>{message}</Text>) : <Text>Add a touchpoint!</Text>
            }
          </View>
        ) : (
          <ImageBackground source={background} style={styles.inputBackground} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    alignSelf: "center",
    // backgroundColor: "blue"

  },
  pointer: {
    height: 15,
    width: 15,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  imageBackground: {
    // marginTop: 20,
    width: '100%',
    // height: 225,
    flex: 1,
    // resizeMode: 'contain',
    // justifyContent: 'center',
  },
  inputBox: {
    flex: 1,
    width: '100%',
    fontSize: 15,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    textAlign: 'center',
  },
  innerPhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    position: 'absolute',
    borderWidth: 1,
  },
  inputBackground: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
  },
});

export default PhotoEditor;
