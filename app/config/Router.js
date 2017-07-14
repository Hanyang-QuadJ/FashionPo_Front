import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import Login from '../Auth/Login'



import Register from '../Auth/Register'

import TabView from '../config/TabView'
import Vote from '../MainScreens/Vote'
import Rank from '../MainScreens/Rank'
import UpLoad from '../MainScreens/UpLoad'
import Profile from '../MainScreens/Profile'




export const MainTab = TabNavigator({
    Vote: {
        screen : Vote
    },
    Profile:{
        screen : Profile
    },
    UpLoad:{
        screen: UpLoad
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
    TabView: {
        screen: TabView,
        navigationOptions:{
            header: null,

        }

    }


});



export const Root = StackNavigator({
    AuthStack:{
        screen: AuthStack,
        navigationOptions:{
            header: null,
        }
    },

})










