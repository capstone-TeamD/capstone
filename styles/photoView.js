import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container: {
      flex: 1,
    },
    pointer: {
      height: 20,
      width: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      borderColor: 'black',
      borderWidth: 3,
      opacity: 0.8,
      position: 'absolute'
    },
    mic: {
      width: 25,
      height: 25,
    },
    text: {
      alignSelf: 'center',
      marginTop: '70%',
      marginHorizontal: 20,
      position: 'absolute',
    },

    box: {
      position: 'absolute',
      borderWidth: 2,
      backgroundColor: '#303030',
      borderColor: '#303030',
      padding: 5,
      paddingHorizontal: 10,
      borderRadius: 3,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000000',
      shadowOpacity: 0.3,
      shadowRadius: 2,
      shadowOffset: {
        height: 1,
        width: 2,
      },
      position: 'absolute'
    },
    triangle: {
      width: 10,
      height: 10,
      position: 'absolute',
      top: -10,
      left: 15,
      borderLeftWidth: 10,
      borderLeftColor: 'transparent',
      borderRightWidth: 10,
      borderRightColor: 'transparent',
      borderBottomWidth: 8,
      borderBottomColor: '#303030',
      borderRadius: 20,
    },
    boxText: {
      fontSize: 12,
      color: 'white',
    },
  });
  