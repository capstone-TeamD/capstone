import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getUser } from './store/user';
import { viewPostcard } from './helperFunctions/Send';
import { useFocusEffect } from '@react-navigation/native';

function Mailbox(props) {
  useFocusEffect(
    React.useCallback(() => {
      props.getUser(props.user.id);
    }, [])
  );

  const { navigate } = props.navigation;

  const openPostcard = async (postcardId, navigate) => {
    await viewPostcard(postcardId)
      .then((localUrl) => {
        navigate('Postcard View', {
          imageId: postcardId,
          imageURL: localUrl,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const dateToDisplay = (msFormat) => {
    let date = new Date(msFormat);
    let formattedDate = date.toLocaleDateString('en-US');
    let formattedTime = date.toLocaleTimeString('en-US');
    return `${formattedDate} at ${formattedTime}`;
  };

  // console.log('user in mailbox', props.user);

  return (
    <View style={styles.container}>
      {props.user.mailbox.length ? (
        <View>
          <Text style={styles.header}>You've Got Mail!</Text>
          {props.user.mailbox.map((msg, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.message}
              onPress={() => openPostcard(msg.postcardId, navigate)}
            >
              <View style={styles.separation}>
                <Text> From: {msg.senderUsername}</Text>
                <Text> Sent on: {dateToDisplay(msg.sentDate)}</Text>
              </View>
              <View style={styles.separation}>
                <Text> Message: {msg.messageText}</Text>
                <Text style={{ textAlign: 'center', marginTop: 10 }}>
                  Click to view postcard
                </Text>
              </View>
            </TouchableOpacity>
          ))}
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
    alignItems: 'center',
    // justifyContent: 'center',
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
  message: {
    width: '80%',
    borderWidth: 1,
    margin: 10,
    padding: 5,
  },
  separation: {
    padding: 5,
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
