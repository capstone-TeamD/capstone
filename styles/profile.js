import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: '#e1e1e4',
      alignItems: 'stretch',
      justifyContent: 'space-around',
    },
    gallery: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center'
    },
    edit: {
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
      backgroundColor: '#F8F8F8',
      height: 25,
      width: '20%',
      borderWidth: 0.2,
      borderBottomColor: '#585858',
      marginBottom: 5,
      borderRadius: 6,
    },
    header: {
      flex: 0.5,
      paddingTop: -20,
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'column',
      alignContent: 'flex-start',
      backgroundColor: '#F8F8F8',
      paddingBottom: 10,
      paddingTop: 10,
    },
    info: {
      marginTop: 10,
      alignItems: 'center',
      marginHorizontal: 10,
    },
    infoName: {
      fontWeight: 'bold',
      fontSize: 15,
      marginBottom: 10,
      textAlign: 'center',
    },
    infoDesc: {
      fontSize: 13,
      textAlign: 'center',
      lineHeight: 17,
      marginBottom: 4,
      paddingHorizontal: 10,
    },
    modalView: {
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 15
    },
    modalText: {
      fontSize: 17,
      textAlign: 'center',
      margin: 10,
      marginTop: 10
    },
    infoLine: {
      borderBottomWidth: 0.2,
      paddingTop: 5,
      paddingBottom: 10,
      width: '100%',
      opacity: 0.3,
    },
    textStyle: {
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    circleImage: {
      height: 90,
      width: 90,
      marginTop: 10,
      borderRadius: 500,
      borderWidth: 0.3,
      borderColor: '#B8B8B8',
      flexBasis: "auto"
    },
    inputBox: {
      height: 50,
      width: '80%',
      borderColor: 'gray',
      borderWidth: 1,
      margin: 10,
      padding: 10,
      borderRadius: 5
    },
  });