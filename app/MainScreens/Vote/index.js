
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

    async pressFireButton(post_id,written_by) {
        this.setState({showProgress: true})
        this.setState({fired: true})
        try {
            let response = await fetch('http://54.162.160.91/api/post/fire', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                    post_id : post_id ,
                    writtenBy : written_by

                })
            });
            let res = await response.json();
            if (response.status >= 200 && response.status < 300) {
                //Handle success
                let accessToken = res.token;
                console.log(accessToken);
                //On success we will store the access_token in the AsyncStorage
                this.storeToken(accessToken);

            } else {

                let error = res;
                throw error;
            }
        } catch (error) {
            this.setState({error: error.message});
            console.log(error);
            this.setState({showProgress: false});
        }
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
                        randomPost:responseData.randomPost
                    });
                    console.log(this.state.randomPost)




                })
                .catch(error => {
                    console.log(error);
                })
        })


    }



    render(){

        let button = null;
        if(this.state.fired === false){
            button = <Button
                onPress={() => this.pressFireButton(this.state.randomPost._id,this.state.randomPost.writtenBy)}
                style={{fontSize: 10, color: 'black', padding: 20, letterSpacing: 3}}>
                Fire!
            </Button>
        }
        return(

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

        justifyContent:'center',
       alignItems:'center',
    },



});

