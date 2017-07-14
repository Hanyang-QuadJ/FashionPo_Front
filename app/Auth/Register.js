import React, {Component} from 'react';
import Button from 'react-native-button';


import {
    Text,
    TextInput,
    AppRegistry,
    View,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    StatusBar,
    AsyncStorage
} from 'react-native';


let STORAGE_KEY = 'id_token';

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            username: null,
            password: null,
            errors:[],
        };
    }



    async saveToken(item, selectedValue) {
        try {
            await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }




    async _userRegister () {
        try {
            let response = await fetch("http://54.162.160.91/api/auth/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({

                    email: this.state.email,
                    username: this.state.username,
                    password: this.state.password,

                })
            });

            let res = await response.text();


            if(response.status >= 200 && response.status < 300){
                console.log("res success is: " +res);
                this.props.navigation.navigate("Login")

            } else {
                let errors = res;
                throw errors;
            }

        } catch (errors){
            console.log("castch errors " + errors);

        }

    };

    render() {

        return(

            <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <StatusBar barStyle="dark-content"/>



                <View style={styles.middle}>

                    <Text style={ styles.textHead }>User Email</Text>
                    <TextInput style={ styles.textInput }
                               onChangeText={ (val) => this.setState({email: val}) }
                               value={ this.state.email }
                               placeholder="sample@fit.edu"
                               placeholderTextColor='#a7a7a7'
                               autoCorrect={ false }
                               autoCapitalize='none'
                               keyboardType='email-address'
                               onSubmitEditing={ () => this.passwordInput.focus() }
                               returnKeyType='next'/>
                    <Text>{this.state.email}</Text>
                    <View style={styles.hairline}/>

                    <Text style={ styles.textHead }>Username</Text>
                    <TextInput style={ styles.textInput }
                               onChangeText={ (val) => this.setState({username: val}) }
                               value={ this.state.username }
                               placeholder="babo"
                               placeholderTextColor='#a7a7a7'
                               autoCorrect={ false }
                               autoCapitalize='none'
                               keyboardType='email-address'
                               onSubmitEditing={ () => this.passwordInput.focus() }
                               returnKeyType='next'/>

                    <Text style={ styles.textHead }>Password</Text>
                    <TextInput style={ styles.textInput }
                               onChangeText={ (val) => this.setState({password: val}) }
                               value={ this.state.password }
                               secureTextEntry={ true }
                               autoCorrect={ false }
                               returnKeyType='next'/>
                    <View style={styles.hairline}/>

                </View>
                <Button
                    onPress={this._userRegister.bind(this)}
                    containerStyle={{padding:20, overflow:'hidden', borderRadius:5, backgroundColor: '#FFC305', marginLeft:25, marginRight:25,}}
                    style={{fontSize: 15, color: 'black', fontWeight:'100', letterSpacing:3 }}>

                    SIGN UP
                </Button>


            </KeyboardAvoidingView>

        );

    }
}

const styles = StyleSheet.create({
    textInput:{
        marginTop: 7,
        height:30,
        fontSize: 18,
        textAlign: 'center',
        paddingBottom:5
    },
    textHead:{
        textAlign: 'center',
        marginTop: 35,
        color: 'black',
    },
    container:{
        flex:1,
    },
    hairline:{
        borderBottomColor: '#c1c1c1',
        borderBottomWidth: .5,
        marginLeft:30,
        marginRight:30,
        marginTop:8,
    },
    button:{

        backgroundColor:'#FFC305',
    },
    logo:{
        flex: .25,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    middle:{
        flex: .35,
        backgroundColor: 'white',

    }
});
