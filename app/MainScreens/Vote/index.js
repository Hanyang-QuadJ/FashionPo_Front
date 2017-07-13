
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
            user: ""
        };
    }

    componentDidMount() {
        AsyncStorage.getItem("token").then((value) => {
            fetch('http://54.162.160.91/api/user/authed', {
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
                        user: responseData.user[0]
                    });
                })
                .catch(error => {
                    console.log(error);
                })
        })


    }



    render(){


        return(
            <View style={styles.container}>

                    <Text>메일 : {this.state.user.email}</Text>
                    <Text>이름 : {this.state.user.username}</Text>
                    <Text>비번 : {this.state.user.password}</Text>
                    <Text>했다 시발</Text>


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
