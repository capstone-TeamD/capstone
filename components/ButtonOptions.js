import React from "react";
import { View, StyleSheet, Button } from "react-native";
import {
  useDeviceOrientation,
  useDimensions,
} from "@react-native-community/hooks";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import styles from '../styles/buttonOptions';

export default function BottonOptions({
  buttonActive,
  showButton,
  uploadPostcard,
  setImage,
}) {
  const { landscape } = useDeviceOrientation();
  const { width, height } = useDimensions().window;
  const sheetRef = React.createRef();
  const fall = new Animated.Value(0);

  const renderContent = () => (
    <View style={styles.panel}>
      <Button color="black" title="Text" onPress={() => showButton("text")} />
      <View
        style={{
          width: width,
          borderBottomWidth: 1,
          marginVertical: 5,
          opacity: 0.2,
          alignSelf: "center",
        }}
      />
      <Button color="black" title="Audio" onPress={() => showButton("audio")} />
      <View style={styles.buttonHandler} />
      <Button
        style={styles.button}
        title="Upload"
        onPress={() => uploadPostcard(true)}
      />
      <View style={styles.buttonHandler} />
      <Button color="red" title="Cancel" onPress={() => setImage(null)} />
    </View>
  );


  return (
    <View style={styles.container}>
      {buttonActive ? (
        <View style={styles.container}>
          <BottomSheet
            ref={sheetRef}
            snapPoints={[80, 305, 0]}
            renderContent={renderContent}
            initalSnap={0}
            callbackNode={fall}
            enabledGestureInteraction={true}
          />
        </View>
      ) : null}
    </View>
  );
}
