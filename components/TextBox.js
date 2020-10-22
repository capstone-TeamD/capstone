import React from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import {
  useDeviceOrientation,
  useDimensions,
} from "@react-native-community/hooks";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

export default function TextBox({ inputText }) {
  const { landscape } = useDeviceOrientation();
  const { width, height } = useDimensions().window;
 

  return (
    <View style={styles.inputBox}>
      <TextInput
        value={inputText}
        onChangeText={(inputText) => this.setState({ inputText })}
        placeholder="Enter text"
        autoCapitalize="none"
        multiline={true}
        enablesReturnKeyAutomatically={true}
        style={styles.textInput}
        returnKeyType="done"
        maxLength={25}
        blurOnSubmit={true}
        onSubmitEditing={() => {
          Keyboard.dismiss();
        }}
      />
      <Button
        style={styles.button}
        onPress={() => this.getText()}
        title="Save Touchpoint"
      />
      <Button
        style={styles.button}
        title="Upload Postcard"
        onPress={() => this.uploadPostcard(true)}
      />
      <Button
        style={styles.button}
        title="Cancel"
        onPress={() => setImage(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputBox: {
    flex: 1,
    width: "100%",
    fontSize: 14,
    textAlign: "center",
    backgroundColor: "#fff",
  },
  textInput: {
    width: "70%",
    height: "15%",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    padding: 14,
    borderColor: "#585858",
    backgroundColor: "#F5F5F5",
    shadowColor: "#000000",
    shadowOpacity: 0.7,
    shadowRadius: 1,
    shadowOffset: {
      height: -1,
      width: -1,
    },
  },
});
