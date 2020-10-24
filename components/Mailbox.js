import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { getUser } from './store/user';
import { useFocusEffect } from '@react-navigation/native';
import MailGrid from './MailGrid';
import styles from '../styles/mailBox';


function Mailbox(props) {
  useFocusEffect(
    React.useCallback(() => {
      props.getUser(props.user.id);
    }, [])
  );

  const { navigate } = props.navigation;

  return (
    <View style={styles.containerBox}>
      {props.user.mailbox.length ? (
        <View>
          <MailGrid 
          mail={props.user.mailbox}
          numColumn={1}
          navigate={navigate}
          />
        </View>
      ) : (
        <Text style={styles.noMail}>Your mailbox is empty</Text>
      )}
    </View>
  );
}

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUser: (id) => dispatch(getUser(id)),
  };
};

export default connect(mapState, mapDispatch)(Mailbox);