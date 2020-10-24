import React from "react";
import { View, StyleSheet, Button, Keyboard} from "react-native";
import {
  useDeviceOrientation,
  useDimensions,
} from "@react-native-community/hooks";
import { TextInput } from "react-native-gesture-handler";

export default function TextBox({ inputText, onChangeText, getText }) {
  const { landscape } = useDeviceOrientation();
  const { width, height } = useDimensions().window;

  return (
    <View style={styles.textContainer}>
      <TextInput
        value={inputText}
        onChangeText={(inputText) => onChangeText(inputText)}
        placeholder="Enter Description"
        autoCapitalize="none"
        enablesReturnKeyAutomatically={true}
        style={styles.textInput}
        returnKeyType="done"
        maxLength={30}
        blurOnSubmit={true}
        onSubmitEditing={() => {
          Keyboard.dismiss();
        }}
      />
      <Button
        style={styles.button}
        onPress={() => getText(inputText)}
        title="Save Touchpoint"
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
