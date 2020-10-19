import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDimensions, useDeviceOrientation } from "@react-native-community/hooks"

export default function PhotoEditor() {
  const {landscape} = useDeviceOrientation()
  // console.log(landscape)

  return (
    <View styles={styles.container}>
      <Text style={styles.textBox}>Edit</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dodgerblue',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    height: "30%",
    // height: landscape ? "100%" : "30%"
  },
  // textBox: {
    
  // }
});
