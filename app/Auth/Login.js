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
    AsyncStorage,

} from 'react-native';


export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            email: null,
            password: null,
            errors: '',
            showProgress: false,
        };
    }

    //Routing Functions

    componentWillReceiveProps() {

        console.log("param"+this.props.navigation);


    }
    navigateToRegister() {
        this.props.navigation.navigate("Register",{err:""});
    }

    //Login Functions

    storeToken(responseData) {
        AsyncStorage.setItem("token", responseData, (err) => {
            if (err) {
                console.log("an error");
                throw err;
            }
            console.log("success");
        })
            .then(this.props.navigation.navigate('TabView'))
            .catch((err) => {
                console.log("error is: " + err);
            });
    }

    async onLoginPressed() {
        this.setState({showProgress: true})
        try {
            let response = await fetch('http://54.162.160.91/api/auth/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                    email: this.state.email,
                    password: this.state.password,

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


    render() {

        console.log("param"+this.props.navigation);

        return (

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
                               onSubmitEditing={ () => this.password.focus() }
                               returnKeyType='next'/>
                    <Text>{this.state.email}</Text>
                    {/*if(params !=null){*/}
                    {/*<Text>{params.user}</Text>*/}
                {/*}*/}

                    <View style={styles.hairline}/>


                    <Text style={ styles.textHead }>Password</Text>
                    <TextInput style={ styles.textInput }
                               onChangeText={ (val) => this.setState({password: val}) }
                               value={ this.state.password }
                               secureTextEntry={ true }
                               autoCorrect={ false }
                               returnKeyType='next'
                    />
                    <View style={styles.hairline}/>
                    <Text>{this.state.error}</Text>

                </View>
                <Button
                    onPress={() => this.onLoginPressed()}
                    containerStyle={{
                        padding: 20,
                        overflow: 'hidden',
                        borderRadius: 5,
                        backgroundColor: '#FFC305',
                        marginLeft: 25,
                        marginRight: 25,
                    }}
                    style={{fontSize: 15, color: 'black', fontWeight: '100', letterSpacing: 3}}>
                    SIGN IN
                </Button>

                <Button
                    onPress={() => this.navigateToRegister()}
                    style={{fontSize: 10, color: 'black', padding: 20, letterSpacing: 3}}>
                    SIGN UP
                </Button>
                <Button

                    style={{fontSize: 10, color: 'black', padding: 20, letterSpacing: 3}}
                    styleDisabled={{color: 'red'}}>
                    FORGOT YOUR PASSWORD?
                </Button>

            </KeyboardAvoidingView>

        );

    }
}

const styles = StyleSheet.create({
    textInput: {
        marginTop: 7,
        height: 30,
        fontSize: 18,
        textAlign: 'center',
        paddingBottom: 5
    },
    textHead: {
        textAlign: 'center',
        marginTop: 35,
        color: 'black',
    },
    container: {
        flex: 1,
    },
    hairline: {
        borderBottomColor: '#c1c1c1',
        borderBottomWidth: .5,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 8,
    },
    button: {
        marginTop: 40,
        backgroundColor: '#FFC305',
    },
    logo: {
        flex: .25,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    middle: {
        flex: .35,
        backgroundColor: 'white',

    }
});





