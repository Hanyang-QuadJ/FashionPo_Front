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
    fireWithDoubleClick() {
        alert('This is awesome \n Double tap succeed');
    },

    render() {
        console.log(this.props.picURL);

        let tags = [];
        for (let i = 0; i < this.props.tags.length; i++) {
            tag.push(<Text style={styles.tag}>this.props.tag</Text>);
        }
        return (
            <View style={styles.card}>
                <TouchableOpacity onPress={() => this.makeBlur()}>
                    {
                        this.state.blur === 0
                            ? (
                            <Image style={{flex: 1, width: 400, height: 400}} source={{uri: this.props.picURL}}
                                   blurRadius={this.state.blur}>
                            </Image>


                        ) : (
                            <Image style={{flex: 1, width: 400, height: 400}} source={{uri: this.props.picURL}}
                                   blurRadius={this.state.blur}>
                                {tags}
                            </Image>
                        )
                    }
150/120     120/100

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


export default React.createClass({


    getInitialState() {
        return {
            cards: [],
            loaded: false,

        }
    },

    componentDidMount(){

        AsyncStorage.getItem("token")

            .then(
                (response) => {

                    fetch('http://54.162.160.91/api/post/random', {
                        method: 'get',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'x-access-token': response
                        },
                    })

                        .then((response) => response.json())
                        .then((responseJson) => {
                            var tempArray = [];
                            for (let i = 0; i < responseJson.message.length; i++) {
                                let prefix = "https://s3.amazonaws.com/fashionpoimagebucket/";
                                console.log(responseJson.message[i]);
                                responseJson.message[i].picURL = prefix + responseJson.message[i].picURL;
                                tempArray.push(responseJson.message[i]);
                            }
                            console.log(tempArray);
                            this.setState({

                                cards: tempArray,
                                loaded: true
                            });
                        })
                        .catch((error) => {
                            console.error(error);
                        });

                }
            )
            .catch((err) => {
                console.log("error is: " + err);
            });
    },

    onClickHandler(){
        this.makeBlur()
    },
    handleYup (card) {
        AsyncStorage.getItem("token")

            .then(
                (response) => {

                    fetch('http://54.162.160.91/api/post/fire', {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'x-access-token': response
                        },
                        body:JSON.stringify({
                            post_id : card._id,
                            writtenBy : card.writtenBy
                        })
                    })

                        .then((response) => response.json())
                        .then((responseJson) => {
                            console.log(responseJson);
                        })
                        .catch((error) => {
                            console.error(error);
                        });

                }
            )
            .catch((err) => {
                console.log("error is: " + err);
            });
        console.log(card._id);
        console.log(card.writtenBy);

    },
    handleNope (card) {
        AsyncStorage.getItem("token")

            .then(
                (response) => {

                    fetch('http://54.162.160.91/api/post/dislike', {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'x-access-token': response
                        },
                        body:JSON.stringify({
                            post_id: card._id,
                        })
                    })

                        .then((response) => response.json())
                        .then((responseJson) => {
                            console.log(responseJson);
                        })
                        .catch((error) => {
                            console.error(error);
                        });

                }
            )
            .catch((err) => {
                console.log("error is: " + err);
            });

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
                handleYup={this.handleYup}
                handleNope={this.handleNope}
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