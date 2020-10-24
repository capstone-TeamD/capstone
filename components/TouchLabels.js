import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import styles from '../styles/touchLabels'

export default function TouchLabels({ touchActive, setActive, textArr }) {
  return (
    <View>
      {textArr && touchActive
        ? textArr.map((textObj, index) => {
            return (
              <View
                key={index}
                style={{
                  ...styles.box,
                  top: textObj.yCoord,
                  left: textObj.xCoord,
                }}
              >
                <View style={styles.triangle} />
                <Text style={styles.boxText} onPress={() => setActive(false)}>
                  {textObj.message}
                </Text>
              </View>
            );
          })
        : null}
    </View>
  );
}

