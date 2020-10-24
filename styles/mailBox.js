import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      width: '95%',
      padding: 5,
    },
    postcard: {
      width: '100%',
      padding: 10,
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
      shadowColor: '#000000',
      shadowOpacity: 0.3,
      shadowRadius: 3,
      shadowOffset: {
        height: 1,
        width: 1,
      },
    },
    postcardImg: { 
      width: '100%',
      height: undefined,
      aspectRatio: 7/5,
      resizeMode:'contain'
    },
    halves: {
      flex: 1, flexDirection: 'row', padding: 10
    },
    separation: {
      padding: 5,
      width: '50%',
    },
    sender: {
      fontStyle: 'italic',
      marginTop: 5
    },
    dateDisplay: {
      height: '65%',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    containerBox: {
      flex: 1,
      backgroundColor: '#F8F8F8',
      justifyContent: "center",
      alignItems: "center"
    },
    header: {
      textAlign: 'center',
      fontWeight: 'bold',
      marginTop: 10,
    },
    noMail: {
      opacity: .3
    }
  });
