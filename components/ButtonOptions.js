import React from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import {
  useDeviceOrientation,
  useDimensions,
} from "@react-native-community/hooks";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

export default function BottonOptions({ buttonActive, showButton, textActive, audioActive}) {
console.log("buttonOptions")
  const { landscape } = useDeviceOrientation();
  const { width, height } = useDimensions().window;
  const sheetRef = React.useRef(null);
  const fall = new Animated.Value(1);

  const renderContent = () => (
    <View style={styles.panel}>
      <View >
        {/* <Text style={styles.text}>Text</Text> */}
        <Button title="Text" onPress={() => showButton("text")}/>
        {console.log("textActive", textActive)}
        <View
          style={{
            width: width,
            borderBottomWidth: 1,
            marginVertical: 20,
            opacity: 0.2,
            alignSelf: "center",
          }}
        />
      </View>
      <View>
        {/* <Text style={styles.text}>Audio</Text> */}
        <Button title="Audio" onPress={() => showButton("audio")}/>
        {console.log("textActive", audioActive)}
      </View>
      {/* <View
        style={{
          width: width,
          borderBottomWidth: 1,
          marginVertical: 20,
          opacity: 0.2,
          alignSelf: "center",
        }}
      />
      <TouchableOpacity onPress={() => sheetRef.current.snapTo(1)}>
        <Text style={styles.text}>Close</Text>
      </TouchableOpacity> */}
      {/* <Button title="cancel" onPress={() => alert("hello")} /> */}
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View styles={styles.panelHandle} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {buttonActive ? (
        <View style={styles.container}>
          <BottomSheet
            ref={sheetRef}
            snapPoints={[150, 0]}
            renderHeader={renderHeader}
            renderContent={renderContent}
            borderRadius={0}
            initalSnap={1}
            callbackNode={fall}
            enabledGestureInteraction={true}
          />
          <Animated.View
            style={{
              margin: 20,
              opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
            }}
          ></Animated.View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    width: "90%",
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
    padding: 30,
    backgroundColor: "#e1e1e4",
    paddingTop: 20,
    paddingBottom: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: "black",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignSelf: "center",
    // marginBottom: 10,
    // borderBottomWidth: 1,
  },
  text: {
    alignSelf: "center",
    fontSize: 14,
  },
});
