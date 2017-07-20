import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import Login from '../Auth/Login'
import Rank from '../MainScreens/Rank'
import UpLoad from '../MainScreens/UpLoad'

import Profile from '../MainScreens/Profile'



import Register from '../Auth/Register'

import Vote from '../MainScreens/Vote'

export const TabView = TabNavigator({
    Rank:{
        screen: Rank,
        navigationOptions:{
            tabBarLabel: 'Rank'
        }
    },
    UpLoad:{
        screen: UpLoad,
        navigationOptions:{
            tabBarLabel: 'Upload'
        }

    },
    Profile:{
        screen: Profile,
        navigationOptions:{
            tabBarLabel: 'Profile'
        }
    }
})



export const VoteStack = StackNavigator({

    TabView: {
        screen: TabView,
        navigationOptions:{
            header: null,

        }
    },
    Vote: {
        screen: Vote,
        navigationOptions:{
            title:'null',
            header:null,
        }

    },


});



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
    VoteStack: {
        screen: VoteStack,
        navigationOptions:{
            header: null,

        }

    },




});



export const Root = StackNavigator({
    AuthStack:{
        screen: AuthStack,
        navigationOptions:{
            header: null,
        }
    },

})










