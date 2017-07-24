

import React, { PureComponent } from 'react';
import { Animated, View, Text, StyleSheet, AsyncStorage,TouchableWithoutFeedback } from 'react-native';
import  Icon  from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/SimpleLineIcons'
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import Vote from '../MainScreens/Vote'
import Profile from '../MainScreens/Profile'
import UpLoad from '../MainScreens/UpLoad'
import Rank from '../MainScreens/Rank'

import type { NavigationState } from 'react-native-tab-view/types';
import Button from "react-native-button";

const AnimatedIcon = Animated.createAnimatedComponent(Icon,Icon2);


type Route = {
    key: string,
    title: string,
    icon: string,
    username: string
};

type State = NavigationState<Route>;


export default class Main extends PureComponent<void, *, State> {

    static title = 'No animation';
    static backgroundColor = '#f47857';




    state: State = {
        index: 0,
        routes: [
            { key: '1',  icon: 'ios-eye'},
            { key: '2',  icon: 'ios-camera'},
            { key: '3',  icon: 'ios-person'  },

        ],


    };




    _handleChangeTab = index => {
        this.setState({
            index,
        });
    };



    _renderIcon = ({ navigationState, position }) => ({
                                                          route,
                                                          index,
                                                      }: { route: Route, index: number }) => {
        const inputRange = navigationState.routes.map((x, i) => i);
        const filledOpacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map(i => (i === index ? 1 : 0)),
        });
        const outlineOpacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map(i => (i === index ? 0 : 1)),
        });
        return (
            <View>
                <AnimatedIcon
                    name={route.icon}
                    size={30}
                    style={[styles.icon, { opacity: filledOpacity }]}
                />
                <AnimatedIcon
                    name={route.icon}
                    size={30}
                    style={[styles.icon2, styles.outline, { opacity: outlineOpacity }]}
                />
            </View>

        );
    };

    _renderFooter = props => {
        return (
            <View style={styles.tabbar}>
                {props.navigationState.routes.map((route, index) => {
                    return (
                        <TouchableWithoutFeedback
                            key={route.key}
                            onPress={() => props.jumpToIndex(index)}
                        >
                            <Animated.View style={styles.tab}>
                                {this._renderIcon(props)({ route, index })}

                            </Animated.View>
                        </TouchableWithoutFeedback>
                    );
                })}
            </View>
        );
    };


    _renderScene = ({ route }) => {

        switch (route.key) {
            case '1':
                return (
                    <Rank
                        navigation={this.props.navigation}

                    />

                );
            case '2':
                return (
                    <UpLoad



                    />
                );
            case '3':
                return (
                    <Profile



                    />
                );



            default:
                return null;
        }
    };

    render() {
        return (



            <TabViewAnimated
                style={[styles.container, this.props.style]}
                lazy
                navigationState={this.state}
                animationEnabled={false}
                swipeEnabled={false}
                renderScene={this._renderScene}
                renderFooter={this._renderFooter}
                onRequestChangeTab={this._handleChangeTab}

            />


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabbar: {
        backgroundColor: '#fffbf8',
        height: 45,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: 'rgba(0, 0, 0, .2)',
        paddingTop: 5,

    },

    icon2: {
        color: '#959595',
    },
    icon: {
        backgroundColor: 'transparent',
        position: 'absolute',
        textAlign: 'center',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        color: '#ff5733',
    },



    count: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: -2,
    },
});
