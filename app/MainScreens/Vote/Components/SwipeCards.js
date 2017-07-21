'use strict';

import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import SwipeCards from 'react-native-swipe-cards';
import DoubleClick from 'react-native-double-click';


let Card = React.createClass({
    getInitialState() {
        return {
            blur: 0,
        }
    },

    makeBlur(){
        if(this.state.blur == 0){
            this.setState({blur:15})
        }
        else{
            this.setState({blur:0})
        }

    },


    render() {

        return (
            <View style={styles.card}>
                <TouchableOpacity onPress={() => this.makeBlur()}>
                    <Image style={{flex:1 ,width:400,height:400}} source={{uri:this.props.image}} blurRadius={this.state.blur} />
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
            cards: Cards,

        }
    },
    onClickHandler(){
        this.makeBlur()
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
                onClickHandler={this.onClickHandler}
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
        width: 400,
        height: 400,
    },
    noMoreCardsText: {
        fontSize: 22,
    }
})