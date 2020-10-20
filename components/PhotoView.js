import React from "react";
import {View} from "react-native"
import {
    useDeviceOrientation,
    useDimensions,
  } from "@react-native-community/hooks";

export default function PhotoView() {
    const {landscape} = useDeviceOrientation()
  return (
  <View>

  </View>);
}
