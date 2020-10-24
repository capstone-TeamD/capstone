import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    background: {
      width: "100%",
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      backgroundColor: "#fff",
    },
    logo: {
      width: 190,
      height: 130,
      marginRight: 25,
    },
    logoContainer: {
      position: "absolute",
      top: "7%",
      alignItems: "center",
      padding: 100,
    },
    buttonContainer: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      bottom: "1%"
    },
    loginButton: {
      width: "80%",
      height: 70,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 15,
      opacity: 0.5,
      borderRadius: 8,
      shadowColor: "#000000",
      shadowOpacity: 0.5,
      shadowRadius: 1,
      shadowOffset: {
        height: .5,
        width: .5
      },
    },
    registerButton: {
      width: "80%",
      height: 70,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 120,
      opacity: 0.5,
      borderRadius: 8,
      shadowColor: "#000000",
      shadowOpacity: 0.5,
      shadowRadius: 1,
      shadowOffset: {
        height: .5,
        width: .5
      },
    },
    buttonText: {
      fontSize: 17,
      fontWeight: "bold",
      color: "black",
      letterSpacing: 1,
    },
    title: {
      fontSize: 35,
      fontWeight: "bold",
      color: "#CD5C5C",
      marginTop: 15,
      shadowColor: "#000000",
      shadowOpacity: 0.2,
      shadowRadius: 1,
      shadowOffset: {
        height: 1,
        width: 1
      }
    }
  });
  