'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, AsyncStorage} from 'react-native';

import SwipeCards from 'react-native-swipe-cards';
import DoubleClick from 'react-native-double-click';


let Card = React.createClass({
    getInitialState() {
        return {
            blur: 0,
            loaded: false,
        }
    },

    makeBlur(){
        if (this.state.blur === 0) {
            this.setState({blur: 15})
        }
        else {
            this.setState({blur: 0})
        }

    },

    componentDidMount(){

    },

    componentWillReceiveProps(nextProps){
        this.setState({blur: nextProps.blur});
    },

    render() {
        // this.setState({blur:0});
        return (
            <View style={styles.card}>
                <TouchableOpacity onPress={() => this.makeBlur()}>
                    {
                        this.state.blur === 0
                            ? (
                            <Image style={{flex: 1, width: 400, height: 400}} source={{uri: this.props.image}}
                                   blurRadius={this.state.blur}>
                            </Image>
                            // <Image
                            //     blurRadius={this.state.blur}
                            //     style={{width: 300, height: 300}}
                            //     source={{
                            //         uri: this.state.urls[this.state.indexPic],
                            //         cache: 'only-if-cached'
                            //     }}
                            // />
                        ) : (
                            <Image style={{flex: 1, width: 400, height: 400}} source={{uri: this.props.image}}
                                   blurRadius={this.state.blur}>
                                <Text style={styles.tag}>Tag Here Tag Here Tag Here</Text>
                            </Image>
                        )
                    }


                </TouchableOpacity>

            </View>
        )
    }
})


class NoMoreCards extends Component {

    render() {
        return (
            <View>
                <Text style={styles.noMoreCardsText}>No more cards</Text>
            </View>
        )
    }
}

const Cards = [

    {image: 'https://s3.amazonaws.com/fashionpoimagebucket/1.jpg', blur: 0},
    {image: 'https://s3.amazonaws.com/fashionpoimagebucket/2.jpg', blur: 0},
    {image: 'https://s3.amazonaws.com/fashionpoimagebucket/3.jpg', blur: 0},
    {image: 'https://s3.amazonaws.com/fashionpoimagebucket/4.jpg', blur: 0},
    {image: 'https://s3.amazonaws.com/fashionpoimagebucket/5.jpg', blur: 0},
    {image: 'https://s3.amazonaws.com/fashionpoimagebucket/6.jpg', blur: 0},
    {image: 'https://s3.amazonaws.com/fashionpoimagebucket/7.jpg', blur: 0},
    {image: 'https://s3.amazonaws.com/fashionpoimagebucket/8.jpg', blur: 0},
    {image: 'https://s3.amazonaws.com/fashionpoimagebucket/9.jpg', blur: 0},
    {image: 'https://s3.amazonaws.com/fashionpoimagebucket/10.jpg', blur: 0},

]

export default React.createClass({


    getInitialState() {
        return {
            cards: Cards,
            loaded: false,
            posts: 0,
        }
    },

    componentDidMount(){

        // AsyncStorage.getItem("token")
        //
        //     .then(
        //         (response) => {
        //
        //             fetch('https://facebook.github.io/react-native/movies.json',{
        //                 method: 'post',
        //                 headers: {
        //                     'Accept': 'application/json',
        //                     'Content-Type': 'application/json',
        //                     'x-access-token': response
        //                 },
        //             })
        //
        //                 .then((response) => response.json())
        //                 .then((responseJson) => {
        //                     this.setState({
        //                         posts: responseJson,
        //                         loaded: 1
        //                     });
        //                 })
        //                 .catch((error) => {
        //                     console.error(error);
        //                 });
        //
        //         }
        //     )
        //     .catch((err) => {
        //         console.log("error is: " + err);
        //     });
    },

    onClickHandler(){
        this.makeBlur()
    },
    handleYup (card) {


    },
    handleNope (card) {


    },
    handleMaybe (card) {


    },
    render() {
        // If you want a stack of cards instead of one-per-one view, activate stack mode
        // stack={true}
        return (

            <SwipeCards
                cards={this.state.cards}
                // onClickHandler={this.onClickHandler}
                renderCard={(cardData) => <Card {...cardData}/>}
                renderNoMoreCards={() => <NoMoreCards />}

                hasMaybeAction
            />
        )
    }
})

const styles = StyleSheet.create({
    card: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 400,
        height: 400,
    },
    noMoreCardsText: {
        fontSize: 22,
    },
    tag: {
        fontSize: 22,
    }
})