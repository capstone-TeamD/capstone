import {StyleSheet} from "react-native";

export default StyleSheet.create({
  container: {
    flex: 0.1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  pointer: {
    height: 20,
    width: 20,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 3,
    opacity: 0.8,
  },
  panel: {
    backgroundColor: "#e1e1e4",
    paddingTop: 10,
    height: 300,
  },
  buttonHandler: {
    width: "100%",
    borderBottomWidth: 1,
    marginVertical: 5,
    opacity: 0.2,
    alignSelf: "center",
  },
});