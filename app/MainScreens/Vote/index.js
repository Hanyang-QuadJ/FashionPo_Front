import React, {Component} from 'react'
import SwipeCards from 'react-native-swipe-cards';
// import RNFetchBlob from 'react-native-fetch-blob';

import {
    Text,
    View,
    StatusBar,
    StyleSheet,
    Navigator,
    Image,
    TouchableOpacity,
    AsyncStorage,
    Dimensions,
    Alert,


} from 'react-native'
import Button from "react-native-button";
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image'


export default class index extends Component {
    constructor(props) {

        super(props);
        this.state = {
            loaded: false, index: 0, images: [],
            randomPost: "",
            fired: false,
            msg: "",
            blur: 0,
            url: "https://s3.amazonaws.com/fashionpoimagebucket/test.png",
            preFetch: false
        };
        Image.prefetch("https://s3.amazonaws.com/fashionpoimagebucket/resize.jpg").then(() => {
            this.setState({
                loaded: true
            })
        })




    }

    async loadImages() {
        const proms = Image.prefetch("https://s3.amazonaws.com/fashionpoimagebucket/test.png");
        try {
            await Promise.all(proms);
        } catch (e) {
            Alert.alert('Images could not loaded');
        }
    }

    componentWillMount() {
    }

    makeBlur(url) {
        if (url === "https://s3.amazonaws.com/fashionpoimagebucket/test.png") this.setState({url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMQsPjGTi_09uKhrCtXbF85Y1Ak4DwfhLiIjGzHMkwVllNxX0x"});
        else this.setState({url: "https://s3.amazonaws.com/fashionpoimagebucket/test.png"})
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     console.log("shouldComponentUpdate: " + JSON.stringify(nextProps) + " " + JSON.stringify(nextState));
    //     return false;
    // }

    async pressFireButton(post_id, written_by) {
        console.log("post : " + post_id);
        console.log("writtenBy : " + written_by);

        AsyncStorage.getItem("token").then((value) => {
            fetch('http://54.162.160.91/api/post/fire', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': value
                },
                body: JSON.stringify({

                    post_id: post_id,
                    writtenBy: written_by

                })
            })
                .then((response) => response.json())
                .then(responseData => {
                    console.log("!!!!");
                    console.log(responseData);
                    this.setState({
                        fired: true,
                        msg: responseData.message
                    });
                    console.log(responseData);
                    AsyncStorage.getItem("token").then((value) => {
                        fetch('http://54.162.160.91/api/post/random', {
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'x-access-token': value
                            },

                        })
                            .then((response) => response.json())
                            .then(responseData => {

                                console.log("!!!");
                                console.log(responseData.message);
                                this.setState({
                                    randomPost: responseData.message
                                });


                            })
                            .catch(error => {
                                console.log(error);
                            })
                    })
                })
                .catch(error => {
                    console.log(error);
                })
        })


    }


    // componentDidMount() {
    // let prefetchTask = Image.prefetch("https://s3.amazonaws.com/fashionpoimagebucket/test.png");
    // let prefetchTask = Image.prefetch(url);
    // let prefetchTask = Image.prefetch(url);
    // let prefetchTask = Image.prefetch(url);
    // RNFetchBlob
    //     .config({
    //         // add this option that makes response data to be stored as a file,
    //         // this is much more performant.
    //         fileCache : true,
    //     })
    //     .fetch('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwDmj_qvMf-y9DgMi62qIhCOZmLtpUTeTmCWeZZcjgZS1YuCaaWg', {
    //         //some headers ..
    //     })
    //     .then((res) => {
    //         // the temp file path
    //         console.log('The file saved to ', res.path())
    //     })
    // AsyncStorage.getItem("token").then((value) => {
    //     fetch('http://54.162.160.91/api/post/random', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //             'x-access-token': value
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then(responseData => {
    //
    //             console.log("!!!");
    //             console.log(responseData.message);
    //             this.setState({
    //                 randomPost: responseData.message
    //             });
    //
    //
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // })


    //}


    render() {

        // let url = this.state.randomPost.picURL;
        // if (url === undefined) url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwDmj_qvMf-y9DgMi62qIhCOZmLtpUTeTmCWeZZcjgZS1YuCaaWg';
        let button = null;

        button = <Button
            onPress={() => this.pressFireButton(this.state.randomPost._id, this.state.randomPost.writtenBy)}
            style={{fontSize: 10, color: 'black', padding: 20, letterSpacing: 3}}>
            Fire!
        </Button>
        console.log("----------------------blur----------------------");
        console.log(this.state.url);
        console.log("------------------------------------------------");
        // FastImage.preload([
        //     {
        //         uri: 'https://facebook.github.io/react/img/logo_og.png',
        //         headers: { Authorization: 'someAuthToken' },
        //     },
        //     {
        //         uri: 'https://facebook.github.io/react/img/logo_og.png',
        //         headers: { Authorization: 'someAuthToken' },
        //     },
        // ])
        let imageFuck = <Text></Text>;
        if (this.state.preFetch === true) {
            imageFuck = <Image
                // blurRadius={this.state.blur}
                style={{width: 300, height: 300}}
                source={{uri: this.state.url}}
            />
        }
        return (


            <View style={styles.container}>
                <View style={styles.navbar}>
                    <TouchableOpacity><Icon name="ios-camera" size={24} color="white"/></TouchableOpacity>
                    <Text style={styles.titleText}>Fashion Po</Text>
                    <TouchableOpacity><Icon name="md-arrow-round-forward" size={24} color="white"/></TouchableOpacity>
                </View>

                {/*<Text>{this.state.randomPost._id}</Text>*/}
                {/*<Text>{url}</Text>*/}
                <TouchableOpacity onPress={() => this.makeBlur(this.state.url)} style={{width: 300, height: 300}}>
                    {
                        this.state.loaded
                            ? (
                            <Image
                                style={{width: 300, height: 300}}
                                source={{
                                    uri: "https://s3.amazonaws.com/fashionpoimagebucket/resize.jpg",
                                    // uri: "https://s3.amazonaws.com/fashionpoimagebucket/test.png",
                                    cache: 'only-if-cached'
                                }}
                            />
                        ) : (
                            <Text>Loading images...</Text>
                        )
                    }
                    {/*<Image*/}
                    {/*// blurRadius={this.state.blur}*/}
                    {/*style={{width: 300, height: 300}}*/}
                    {/*// source={{uri: this.state.url}}*/}
                    {/*/>*/}
                    {/*<Image  source={{ uri: this.state.picArray[this.state.id] }}*/}
                    {/*style={styles.deck} />*/}
                    {/*<FastImage*/}
                    {/*style={{width: 300, height: 300}}*/}
                    {/*source={{*/}
                    {/*uri: 'https://s3.amazonaws.com/fashionpoimagebucket/test.png',*/}

                    {/*priority: FastImage.priority.normal,*/}
                    {/*}}*/}
                    {/*resizeMode={FastImage.resizeMode.contain}*/}
                    {/*/>*/}
                </TouchableOpacity>
                {button}
                {/*<View style={styles.innerFrame}>*/}
                {/*<View style={styles.padding}>*/}

                {/*<Text style={styles.userName}>*/}
                {/*Kendall Jenner*/}
                {/*</Text>*/}

                {/*<View style={styles.tagsArea}>*/}
                {/*<Text style={styles.tagsText}>#Valencia</Text>*/}
                {/*<Text style={styles.tagsText}>#Fashion</Text>*/}
                {/*<Text style={styles.tagsText}>#Pants</Text>*/}
                {/*<Text style={styles.tagsText}>#Shoes</Text>*/}
                {/*<Text style={styles.tagsText}>#Shorts</Text>*/}
                {/*</View>*/}
                {/*</View>*/}
                {/*</View>*/}
            </View>

        );
    }
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',

    },
    navbar: {
        paddingTop: 20,
        height: 64,
        backgroundColor: "#ff5733",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#DDDDDD',
        paddingHorizontal: 12,
        flexDirection: 'row', // step 1
        justifyContent: 'space-between', // step 2
        alignItems: 'center', // step 3
    },
    leftText: {
        color: 'white',
    },
    titleText: {
        fontWeight: '600',
        color: 'white',
    },
    rightText: {
        color: 'white',
    },
    pictureArea: {
        flex: 1,


    },
    profileImage: {

        width: width.width,
        height: 700,
        resizeMode: "cover",

    },
    innerFrame: {

        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.2)"

    },
    absolute: {
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0,
    },

    tags: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',

    },
    padding: {
        padding: 20,
        flex: 1,
        flexDirection: "column",
    },
    userNameArea: {
        flex: 0.5,
    },
    userName: {
        fontSize: 17,
        color: "white",
        fontWeight: "500",
        paddingBottom: 5,
    },
    tagsText: {
        fontSize: 15,
        color: "white",
        marginRight: 5,
    },
    tagsArea: {
        flex: 1,
        flexDirection: "row",

    },


});


