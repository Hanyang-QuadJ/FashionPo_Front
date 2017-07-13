

import React, { PureComponent } from 'react';
import { Animated, View, Text, StyleSheet, AsyncStorage } from 'react-native';
import  Icon  from 'react-native-vector-icons/Ionicons'
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import Vote from '../MainScreens/Vote'
import Profile from '../MainScreens/Profile'
import UpLoad from '../MainScreens/UpLoad'
import Rank from '../MainScreens/Rank'

import type { NavigationState } from 'react-native-tab-view/types';

type Route = {
    key: string,
    title: string,
    icon: string,
};

type State = NavigationState<Route>;

export default class TabView extends PureComponent<void, *, State> {
    static title = 'Bottom bar with indicator';
    static appbarElevation = 4;

    state: State = {
        index: 0,
        routes: [
            { key: '1', title: 'First', icon: 'ios-speedometer' },
            { key: '2', title: 'Second', icon: 'ios-game-controller-b' },
            { key: '3', title: 'Third', icon: 'ios-basketball' },
            { key: '4', title: 'Fourth', icon: 'ios-add-circle' },
        ],
        loaded:false,


    };

    _handleChangeTab = index => {
        this.setState({
            index,
        });
    };

    _renderIndicator = props => {
        const { width, position } = props;

        const translateX = Animated.multiply(position, width);

        return (
            <Animated.View
                style={[styles.container, { width, transform: [{ translateX }] }]}
            >
                <View style={styles.indicator} />
            </Animated.View>
        );
    };

    _renderIcon = ({ route }) => {
        return <Icon name={route.icon} size={24} style={styles.icon} />;
    };

    _renderBadge = ({ route }) => {
        if (route.key === '2') {
            return (
                <View style={styles.badge}>
                    <Text style={styles.count}>42</Text>
                </View>
            );
        }
        return null;
    };

    _renderFooter = props => {
        return (
            <TabBar
                {...props}
                renderIcon={this._renderIcon}
                renderBadge={this._renderBadge}
                renderIndicator={this._renderIndicator}
                style={styles.tabbar}
                tabStyle={styles.tab}
            />
        );
    };

    _renderScene = ({ route }) => {

        switch (route.key) {
            case '1':
                return(
                    <Vote state={this.state}/>
                )



            case '2':
                return (
                    <Profile
                        state={this.state}

                    />
                );
            case '3':
                return (
                    <UpLoad
                        state={this.state}

                    />
                );
            case '4':
                return (
                    <Rank
                        state={this.state}

                    />
                );
            default:
                return null;
        }
    };

    render() {
        return (
            <TabViewAnimated
                lazy={true}
                style={[styles.container, this.props.style]}
                navigationState={this.state}
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
        backgroundColor: '#222',
    },
    tab: {
        padding: 0,
    },
    icon: {
        backgroundColor: 'transparent',
        color: 'white',
    },
    indicator: {
        flex: 1,
        backgroundColor: '#0084ff',
        margin: 4,
        borderRadius: 2,
    },
    badge: {
        marginTop: 4,
        marginRight: 32,
        backgroundColor: '#f44336',
        height: 24,
        width: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
    },
    count: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: -2,
    },
});
