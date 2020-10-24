import React from "react";
import { View, StyleSheet, Button, Keyboard} from "react-native";
import {
  useDeviceOrientation,
  useDimensions,
} from "@react-native-community/hooks";
import { TextInput } from "react-native-gesture-handler";
import styles from "../styles/textBox"

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
