import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Editor() {
  return (
    <View styles={styles.container}>
      <Text>Edit</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
