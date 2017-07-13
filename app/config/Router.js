import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import Login from '../Auth/Login'


import Vote from '../MainScreens/Vote';
import Register from '../Auth/Register'
import Rank from '../MainScreens/Rank'
import Upload from '../MainScreens/UpLoad'
import Profile from '../MainScreens/Profile'





export const MainTab = TabNavigator({
    Vote: {
        screen : Vote
    },
    Profile:{
        screen : Profile
    },
    UpLoad:{
        screen: Upload
    },
    Rank:{
        screen: Rank
    }



})

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
    MainTab: {
        screen: MainTab,
        navigationOptions:{
            header: null,

        }

    }


});



export const Root = StackNavigator({
    AuthStack:{
        screen: AuthStack
    },




})










