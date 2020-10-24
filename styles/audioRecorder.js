import {StyleSheet} from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: -15,
  },
  micContainer: {
    position: "absolute",
    alignItems: "center",
  },
  mic: {
    width: 120,
    height: 120,
  },
  buttons: {
    flexDirection: "row",
    marginTop: 130,
    alignItems: "center",
    marginBottom: 10,
  },
  playButton: {
    width: 30,
    height: 30,
    marginHorizontal: 9,
  },
  saveContainer: {
    width: 100,
    height: 25,
    borderWidth: 1,
    borderRadius: 20,
    margin: 9,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      height: 0.5,
      width: 0.5,
    },
  },
  saveText: {
    color: "#ff3279",
    fontSize: 12,
  },
});