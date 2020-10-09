// @refresh reset
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig';
import Camera from './components/Camera';
import CameraIP from './components/CameraIP';
import { TouchableOpacity } from 'react-native-gesture-handler';

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// import LoginScreen from './screens/loginScreen';
// import SignupScreen from './screens/signupScreen';
// import ForgotPassScreen from './screens/forgotPassScreen';

// const Stack = createStackNavigator();

// const db = firebase.firestore();

// db.collection('users')
//   .add({
//     email: 'newtest@test.com',
//     password: '12345678',
//     username: 'newUser2',
//   })
//   .then(function (docRef) {
//     console.log('Document written with ID: ', docRef.id);
//   })
//   .catch(function (error) {
//     console.error('Error adding document: ', error);
//   });

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false,
    };
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
    // firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  // onAuthStateChanged = (user) => {
  //   this.setState({ isAuthenticationReady: true });
  //   this.setState({ isAuthenticated: !!user });
  // };

  render() {
    return (
      // <View>
      //   {this.isAuthenticated ? (
      //     <Text>Home Screen</Text>
      //   ) : (
      //     <NavigationContainer>
      //       <Stack.Navigator>
      //         <Stack.Screen name='Login' component={LoginScreen} />
      //         <Stack.Screen name='Signup' component={SignupScreen} />
      //         <Stack.Screen name='ForgotPass' component={ForgotPassScreen} />
      //         <Stack.Screen name='Home' component={HomeScreen} />
      //       </Stack.Navigator>
      //     </NavigationContainer>
      //   )}
      // </View>
      <View style={styles.container}>
        <CameraIP />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
