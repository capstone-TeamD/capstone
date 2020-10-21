import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Button } from "react-native";


export default class Profile extends Component {
  render() {
    const { navigate } = this.props.navigation;
    console.log(this.props);

    return (
      <View style={styles.container}>
        <Text>Mailbox</Text>
        <TouchableOpacity>
          <Button title="recorder" onPress={() => navigate("Audio Recorder")}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    alignItems: "center",
    justifyContent: "center",
  },
});
