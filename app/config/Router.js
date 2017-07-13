import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import Login from '../Auth/Login'
import Register from '../Auth/Register'




export const AuthStack = StackNavigator({
    Login: {
        screen: Login,
        navigationOptions:{
            header: null,
            title:'Login',

        }
    },
    Register: {
        screen: Register,
        navigationOptions:{
            title:'Register',
        }

    },
});






