import {StyleSheet} from "react-native";

export default StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "stretch",
  },
  header: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    alignContent: "flex-start",
    backgroundColor: "#f6f6f6",
    borderBottomWidth: 0.2,
    padding: 30,
  },
  infoDesc: {
    fontSize: 13,
    color: "blue",
  },
  textInput: {
    margin: 13,
    marginTop: 20,
    padding: 11,
    textAlign: "left",
    flexDirection: "column",
  },
  rowLines: {
    flexDirection: "row",
  },
  inputBox: {
    fontSize: 14,
    marginHorizontal: 17,
    width: 255,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    paddingBottom: 2,
  },
  button: {
    marginTop: 60,
    marginBottom: -20,
    paddingVertical: 5,
    alignItems: "center",
    borderColor: "black",
    backgroundColor: "black",
    borderWidth: 2,
    borderRadius: 7,
    width: 110,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  logoutText: {
    color: "blue",
  },
  checkout: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    borderBottomColor: "#585858",
    color: "blue",
  },
  circleImage: {
    height: 90,
    width: 90,
    borderRadius: 500,
    marginBottom: 13,
  },
});