
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





export default class index extends Component{
    constructor(props) {
        super(props);
        this.state = {
            randomPost:"",
        };
    }

    componentDidMount() {
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


                    this.setState({
                        randomPost:responseData
                    });
                    console.log(this.state.randomPost)




                })
                .catch(error => {
                    console.log(error);
                })
        })


    }



    render(){


        return(

            <View style={styles.container}>
                <Text>{this.state.randomPost._id}</Text>


            </View>





        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        justifyContent:'center',
       alignItems:'center',
    },



});
