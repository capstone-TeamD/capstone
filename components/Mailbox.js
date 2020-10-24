import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { getUser } from './store/user';
import { viewPostcard } from './helperFunctions/Send';
import { useFocusEffect } from '@react-navigation/native';

import postcard from '../assets/postcard.jpg' 

function Mailbox(props) {
  useFocusEffect(
    React.useCallback(() => {
      props.getUser(props.user.id);
    }, [])
  );

  const { navigate } = props.navigation;

  const openPostcard = async (postcardId, navigate) => {
    await viewPostcard(postcardId)
      .then((responseObj) => {
        let imageToRender = responseObj.mbImageLink;
        let audioToRender = '';
        if (responseObj.mbAudioLink) {
          audioToRender = responseObj.mbAudioLink;
        }
        navigate('Postcard View', {
          imageId: postcardId,
          imageURL: imageToRender,
          audioURL: audioToRender,
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
    return `${formattedDate}
    at ${formattedTime}`;
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
              <ImageBackground source={postcard} style={{ width: '100%', height: undefined, aspectRatio: 7/5, resizeMode:'contain'}}>

              <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
                <View style={{...styles.separation, justifyContent: 'center'}}>
                  <Text>{msg.messageText}</Text>
                  <Text style={{
                    alignSelf: 'center'
                      }}> --{msg.senderUsername}</Text>
                </View>

                <View style={styles.separation}>
                  <View style={{
                    height: '59%',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    }}>
                    <Text>{dateToDisplay(msg.sentDate)}</Text>
                  </View>
                  <Text style={{ textAlign: 'center', marginTop: 35}}>
                    Click to view postcard
                  </Text>
                </View>
              </View>

              </ImageBackground>
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
    backgroundColor: 'white',
  },
  separation: {
    padding: 5,
    width: '50%'
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
