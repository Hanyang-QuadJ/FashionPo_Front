import React, {Component} from 'react'



import {
    Text,
    View,
    StatusBar,
    StyleSheet,
    Navigator,
    Dimensions,
    findNodeHandle,
    TouchableHighlight,

    TouchableOpacity,
    AsyncStorage,
    Image,

} from 'react-native'
import Button from "react-native-button";
import Icon from 'react-native-vector-icons/Ionicons'
import BlurView from 'react-native-blur';






export default class index extends Component{
    constructor(props) {
        super(props);
        this.state = {
            randomPost:"",
            pressStatus: false,
            blur:null,

        };
    }

    makeBlur (blur) {
        if(blur === 0) this.setState({blur:100})
        else this.setState({blur:0})
    }

    makeNotBlur() {
        this.setState
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

        // let button = null;
        // if(this.state.fired === false){
        //     button = <Button
        //         onPress={() => this.pressFireButton(this.state.randomPost._id,this.state.randomPost.writtenBy)}
        //         style={{fontSize: 10, color: 'black', padding: 20, letterSpacing: 3}}>
        //         Fire!
        //     </Button>
        // }
        return(

            <View style={styles.container}>


                <View style={styles.navbar}>
                    <TouchableOpacity><Icon name="ios-camera" size={24} color="white"/></TouchableOpacity>
                    <Text style={styles.titleText}>Fashion Po</Text>
                    <TouchableOpacity><Icon name="md-arrow-round-forward" size={24} color="white"/></TouchableOpacity>
                </View>

                <View style={styles.pictureArea}>
                    <TouchableOpacity onPress={()=>this.makeBlur(this.state.blur)}>
                        <Image source={require('../../Img/vote.png')} style={styles.profileImage}  blurRadius={this.state.blur} />
                    </TouchableOpacity>


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


            </View>





        );
    }
}
const {width, height} = Dimensions.get('window');

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
    pictureArea:{
        flex:1,


    },
    profileImage:{

        width: width.width,
        height: 700,
        resizeMode:"cover",

    },
    innerFrame: {

        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor:"rgba(0,0,0,0.2)"

    },
    absolute: {
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0,
    },

    tags:{
        flex:1,
        flexDirection:'row',
        backgroundColor:'transparent',

    },
    padding:{
        padding:20,
        flex:1,
        flexDirection:"column",
    },
    userNameArea:{
        flex:0.5,
    },
    userName:{
        fontSize:17,
        color:"white",
        fontWeight:"500",
        paddingBottom:5,
    },
    tagsText:{
        fontSize:15,
        color:"white",
        marginRight:5,
    },
    tagsArea:{
        flex:1,
        flexDirection:"row",

    },




});