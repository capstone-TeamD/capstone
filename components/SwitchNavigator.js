import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'

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
        }
    },
    {
        initialRouteName: 'Login'
    }
)

export default createAppContainer(SwitchNavigator)