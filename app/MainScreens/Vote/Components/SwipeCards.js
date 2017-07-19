'use strict';

import React, { Component } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import SwipeCards from 'react-native-swipe-cards';

let Card = React.createClass({
    render() {
        return (
            <View style={[styles.card]}>
                <Image style={{width:300,height:300}} source={{uri:this.props.image}}/>
            </View>
        )
    }
})

class NoMoreCards extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text style={styles.noMoreCardsText}>No more cards</Text>
            </View>
        )
    }
}

const Cards = [
    {image:'https://s3.amazonaws.com/fashionpoimagebucket/1.jpg'},
    {image:'https://s3.amazonaws.com/fashionpoimagebucket/2.jpg'},
    {image:'https://s3.amazonaws.com/fashionpoimagebucket/3.jpg'},
    {image:'https://s3.amazonaws.com/fashionpoimagebucket/4.jpg'},
    {image:'https://s3.amazonaws.com/fashionpoimagebucket/5.jpg'},
    {image:'https://s3.amazonaws.com/fashionpoimagebucket/6.jpg'},
    {image:'https://s3.amazonaws.com/fashionpoimagebucket/7.jpg'},
    {image:'https://s3.amazonaws.com/fashionpoimagebucket/8.jpg'},
    {image:'https://s3.amazonaws.com/fashionpoimagebucket/9.jpg'},
    {image:'https://s3.amazonaws.com/fashionpoimagebucket/10.jpg'},

]

export default React.createClass({
    getInitialState() {
        return {
            cards: Cards
        }
    },
    handleYup (card) {
        console.log(`Yup for ${card.text}`)
    },
    handleNope (card) {
        console.log(`Nope for ${card.text}`)
    },
    handleMaybe (card) {
        console.log(`Maybe for ${card.text}`)
    },
    render() {
        // If you want a stack of cards instead of one-per-one view, activate stack mode
        // stack={true}
        return (
            <SwipeCards
                cards={this.state.cards}

                renderCard={(cardData) => <Card {...cardData} />}
                renderNoMoreCards={() => <NoMoreCards />}

                handleYup={this.handleYup}
                handleNope={this.handleNope}
                handleMaybe={this.handleMaybe}
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
        width: 300,
        height: 300,
    },
    noMoreCardsText: {
        fontSize: 22,
    }
})