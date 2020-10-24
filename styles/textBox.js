//textBox for touchpoints styling
import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    textContainer: {
      flex: 1,
      flexDirection: "column",
      marginTop: 20,
      marginBottom: -50
    },
    textInput: {
      width: "70%",
      height: 45,
      alignSelf: "center",
      borderWidth: 0.5,
      borderRadius: 5,
      margin: 15,
      padding: 14,
      borderColor: "#585858",
      backgroundColor: "#F5F5F5",
      shadowColor: "#000000",
      shadowOpacity: 0.2,
      shadowRadius: 1,
      shadowOffset: {
        height: -1,
        width: -1,
      },
    },
  });
  