
import React, {Component} from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

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

    navigateToVote(){
        this.props.navigation.navigate('Vote')
    }

    shouldComponentUpdate() {

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
                    console.log("Load: " +responseData);
                    return true
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
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={()=>this.navigateToVote()}><Icon name="ios-arrow-back" size={24} color="white"/></TouchableOpacity>
                    <Text style={styles.titleText}>Fashion Po</Text>
                    <TouchableOpacity><Icon name="ios-camera" size={24} color="white"/></TouchableOpacity>
                </View>
                <View style={styles.sub}>
                    <Text>Rank</Text>
                </View>

                    {users}





            </View>




        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',

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
    sub:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }



});
