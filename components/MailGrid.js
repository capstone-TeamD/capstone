import React from 'react'
import {TouchableOpacity, View, StyleSheet, ImageBackground, Text, FlatList} from 'react-native'
import {openPostcard, dateToDisplay, timeToDisplay} from './helperFunctions/Send'
import postcard from '../assets/postcard.jpg'

export default function MailGrid ({
mail,
numColumns,
navigate,
onEndReached
}) {
return (
  <FlatList
    data={mail}
    keyExtractor={(item, idx) => {
      return idx.toString();
    }}
    numColumns={numColumns}
    onEndReached={onEndReached}
    renderItem={({ item , idx}) => (
      <TouchableOpacity
        key={idx}
        style={styles.postcard}
        onPress={() => openPostcard
          (item.postcardId, navigate)}
      >
        <View style={styles.container}>
        <ImageBackground source={postcard} style={styles.postcardImg}>
          <View style={styles.halves}>
            <View style={{...styles.separation, justifyContent: 'center'}}>
              <Text style={{}}>{item.messageText}</Text>
              <Text style={styles.sender}> from {item.senderUsername}</Text>
            </View>
            <View style={styles.separation}>
              <View style={styles.dateDisplay}>
                <Text style={{lineHeight: -25, margin: 5}}>{dateToDisplay(item.sentDate)}</Text>
                <Text style={{lineHeight: -25, margin: 5}}>{timeToDisplay(item.sentDate)}</Text>
              </View>
              <Text style={{ textAlign: 'center', marginTop: 35, color: '#AE5C6C' }}>
                Click to view
              </Text>
            </View>
          </View>
        </ImageBackground>
        </View>
      </TouchableOpacity>
    )}
  />
)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    width: '95%',
    padding: 5,
  },
  postcard: {
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  postcardImg: { 
    width: '100%',
    height: undefined,
    aspectRatio: 7/5,
    resizeMode:'contain'
  },
  halves: {
    flex: 1, flexDirection: 'row', padding: 10
  },
  separation: {
    padding: 5,
    width: '50%',
  },
  sender: {
    alignSelf: 'center',
    fontStyle: 'italic',
    marginTop: 5
  },
  dateDisplay: {
    height: '65%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
});