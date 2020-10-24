import React from 'react'
import {TouchableOpacity, View, StyleSheet, ImageBackground, Text, FlatList} from 'react-native'
import {openPostcard, dateToDisplay} from './helperFunctions/Send'
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
        <View style={{width: '95%', padding: 5}}>
        <ImageBackground source={postcard} style={{ width: '100%', height: undefined, aspectRatio: 7/5, resizeMode:'contain'}}>

          <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
            <View style={{...styles.separation, justifyContent: 'center'}}>
              <Text>{item.messageText}</Text>
              <Text style={{alignSelf: 'center'}}> --{item.senderUsername}</Text>
            </View>
            <View style={styles.separation}>
              <View style={{
                height: '58%',
                justifyContent: 'flex-end',
                alignItems: 'center',
                }}>
                <Text>{dateToDisplay(item.sentDate)}</Text>
              </View>
              {/* <Text style={{ textAlign: 'center', marginTop: 35}}>
                Click to view postcard
              </Text> */}
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
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  postcard: {
    width: '100%',
    // borderWidth: 1,
    // marginTop: 10,
    padding: 10,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  separation: {
    padding: 5,
    width: '50%'
  },
});