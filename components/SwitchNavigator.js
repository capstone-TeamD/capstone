import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'
import Camera from './Camera'

const SwitchNavigator = createSwitchNavigator(
    {
        Login: {
            screen: Login
        },
        Signup: {
            screen: Signup
        },
        Profile: {
            screen: Profile
        },
        Camera: {
            screen: Camera
        }
    },
    {
        initialRouteName: 'Login'
    }
)

export default createAppContainer(SwitchNavigator)