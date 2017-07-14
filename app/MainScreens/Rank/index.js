
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





export default class index extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            swap: 1,

        };
    }

    componentWillReceiveProps() {

        AsyncStorage.getItem("token").then((value) => {
            fetch('http://54.162.160.91/api/user', {
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
                        user: responseData
                    });
                    console.log("Load");
                })
                .catch(error => {
                    console.log(error);
                })
        })


    }

    componentDidMount(){
        AsyncStorage.getItem("token").then((value) => {
            fetch('http://54.162.160.91/api/user', {
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
                        user: responseData
                    });
                    console.log("data : "+this.state.user);
                })
                .catch(error => {
                    console.log(error);
                })
        })

    }






    render(){

        const users = [];


        for (var i = 0; i < this.state.user.length; i++) {
            users.push(<Text key={this.state.user[i].email}>{this.state.user[i].email}</Text>);
        }


        return(
            <View style={styles.container}>
                <View style={styles.container}>
                    {users}


                </View>

            </View>




        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },



});
