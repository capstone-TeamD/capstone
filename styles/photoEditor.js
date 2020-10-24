import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'space-evenly',
      width: '100%',
      height: '100%',
      flex: 1,
      marginBottom: -50,
      backgroundColor: '#fff',
    },
    pointer: {
      height: 18,
      width: 18,
      backgroundColor: 'blue',
      borderRadius: 10,
      borderColor: 'black',
      borderWidth: 3,
    },
    imageBackground: {
      width: '100%',
      flex: 0.6,
      backgroundColor: '#fff',
    },
    buttonContainer: {
      margin: 15,
    },
    innerPhoto: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      resizeMode: 'cover',
    },
    inputBackground: {
      flex: 1,
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
      textAlign: 'center',
      backgroundColor: '#fff',
    },
  });
  