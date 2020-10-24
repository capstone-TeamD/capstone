import React from 'react';
import {
  View,
  Modal,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import styles from '../styles/loader'

//TODO: change the state for loading to the redux store

export const Loader = (props) => {
  const { loader } = props

  return (
    <Modal
    transparent={true}
    animationType={'none'}
    visible={loader}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={loader}
            size='large' />
        </View>
      </View>
    </Modal>
  )
}