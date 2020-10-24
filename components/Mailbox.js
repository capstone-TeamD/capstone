import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { getUser } from './store/user';
import { viewPostcard } from './helperFunctions/Send';
import { useFocusEffect } from '@react-navigation/native';

import postcard from '../assets/postcard.jpg' 
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
    // backgroundColor: '#F8F8F8',
    // backgroundColor: 'yellow',
    // alignItems: 'center',
    // justifyContent: 'center',
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

// {props.user.mailbox.map((msg, idx) => (
//   <TouchableOpacity
//     key={idx}
//     style={styles.message}
//     onPress={() => openPostcard(msg.postcardId, navigate)}
//   >
//     <ImageBackground source={postcard}    style={{ width: '100%', height: undefined, aspectRatio: 7/5, resizeMode:'contain'}}>

//     <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
//       <View style={{...styles.separation, justifyContent: 'center'}}>
//         <Text>{msg.messageText}</Text>
//         <Text style={{
//           alignSelf: 'center'
//             }}> --{msg.senderUsername}</Text>
//       </View>

//       <View style={styles.separation}>
//         <View style={{
//           height: '59%',
//           justifyContent: 'flex-end',
//           alignItems: 'center',
//           }}>
//           <Text>{dateToDisplay(msg.sentDate)}</Text>
//         </View>
//         <Text style={{ textAlign: 'center', marginTop: 35}}>
//           Click to view postcard
//         </Text>
//       </View>
//     </View>

//     </ImageBackground>
//   </TouchableOpacity>
// ))}