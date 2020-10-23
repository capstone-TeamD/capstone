import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

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

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    borderWidth: 2,
    backgroundColor: '#303030',
    borderColor: '#303030',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 2,
    },
  },
  triangle: {
    width: 10,
    height: 10,
    position: 'absolute',
    top: -10,
    left: 15,
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderBottomWidth: 8,
    borderBottomColor: '#303030',
    borderRadius: 20,
  },
  boxText: {
    fontSize: 12,
    color: 'white',
  },
});
