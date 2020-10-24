import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { getUser } from './store/user';
import { useFocusEffect } from '@react-navigation/native';
import MailGrid from './MailGrid';

function Mailbox(props) {
  useFocusEffect(
    React.useCallback(() => {
      props.getUser(props.user.id);
    }, [])
  );

  const { navigate } = props.navigation;

  return (
    <View style={styles.container}>
      {props.user.mailbox.length ? (
        <View>
          {/* <Text style={styles.header}>You've Got Mail!</Text> */}
          <MailGrid 
          mail={props.user.mailbox}
          numColumn={1}
          navigate={navigate}
          />
        </View>
      ) : (
        <Text>Your mailbox is empty</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
});

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