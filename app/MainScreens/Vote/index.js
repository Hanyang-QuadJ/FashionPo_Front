import React, {Component} from 'react'


import {
    Text,
    View,
    StatusBar,
    StyleSheet,
    Navigator,
    Image,
    TouchableOpacity,
    AsyncStorage,


} from 'react-native'
import Button from "react-native-button";


export default class index extends Component {
    constructor(props) {

        super(props);
        this.state = {
            randomPost: "",
            fired: false,
            msg: ""
        };
    }

    async pressFireButton(post_id, written_by) {
        console.log("post : "+post_id);
        console.log("wrttenBy : "+written_by);

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
                    this.setState({
                        fired:true,
                        msg:responseData
                    });
                    console.log(responseData);
                })
                .catch(error => {
                    console.log(error);
                })
        })


    }


    componentDidMount() {
        alert("!");
        AsyncStorage.getItem("token").then((value) => {
            fetch('http://54.162.160.91/api/post/random', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
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


    }


    render() {

        let button = null;
        if (this.state.fired === false) {
            button = <Button
                onPress={() => this.pressFireButton(this.state.randomPost.post_id, this.state.randomPost.writtenBy)}
                style={{fontSize: 10, color: 'black', padding: 20, letterSpacing: 3}}>
                Fire!
            </Button>
        }
        else {

            button = <Text>{this.state.msg}</Text>
        }
        return (

            <View style={styles.container}>
                <Text>{this.state.randomPost._id}</Text>

                {button}
            </View>





        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',
    },


});


