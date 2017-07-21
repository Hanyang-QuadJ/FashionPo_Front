import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import {

    StyleSheet,



} from 'react-native'


import Login from '../Auth/Login'
import Rank from '../MainScreens/Rank'
import UpLoad from '../MainScreens/UpLoad'
import TabView from '../config/TabView'

import Profile from '../MainScreens/Profile'
import Icon from 'react-native-vector-icons/Ionicons'



import Register from '../Auth/Register'

import Vote from '../MainScreens/Vote'

// export const TabView = TabNavigator({
//     Rank:{
//         screen: Rank,
//         navigationOptions:{
//             tabBarIcon:({tintColor}) => (<Icon name="ios-trophy" size={25} style={{color:tintColor}} />),
//             tabBarOptions:{
//                 showLabel:'false'
//             }
//
//         },
//
//     },
//     UpLoad:{
//         screen: UpLoad,
//         navigationOptions:{
//             tabBarIcon:({tintColor}) => (<Icon name="ios-camera" size={25} style={{color:tintColor}} />),
//             showLabel:'false'
//
//
//         }
//
//     },
//     Profile:{
//         screen: Profile,
//         navigationOptions:{
//             tabBarIcon:({tintColor}) => (<Icon name="ios-eye" size={25} style={{color:tintColor}} />),
//             showLabel:'false'
//
//         }
//     },
// }, {
//     tabBarOptions: {
//         activeTintColor: '#ff5733',
//         showLabel:false,
//         showIcon:true
//     },
//
//
// })







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

    },
    Vote: {
        screen: Vote,
        navigationOptions:{
            title:'null',
            header:null,
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











