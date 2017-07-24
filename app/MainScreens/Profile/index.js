
import React, {Component} from 'react'

import {
    Text,
    View,
    StatusBar,
    StyleSheet,
    Navigator,
    Image,
    TouchableOpacity,


} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'





export default class index extends Component{



    render(){


        return(
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <View style={styles.items}>
                        <TouchableOpacity onPress={()=>this.navigateToVote()}><Icon name="ios-menu" size={24} color="#ff5733"/></TouchableOpacity>
                        <Text style={styles.titleText}>Closet</Text>
                        <TouchableOpacity><Icon name="ios-search" size={24} color="#ff5733"/></TouchableOpacity>
                    </View>
                    <View style={styles.profileImageArea}>
                        <Image source={require('../../Img/rank4.png')} style={styles.profileImage}/>
                    </View>
                    <View style={styles.profileName}>
                        <Text style={styles.profileNameText}>Kendall Jenner</Text>
                    </View>
                    <View style={styles.profileInfo}>
                        <View style={styles.profileInfoCount}>
                            <Text style={styles.count}>150</Text>
                            <Text style={styles.countText}>Views</Text>

                        </View>
                        <View style={styles.profileInfoCount}>
                            <Text style={styles.count}>225</Text>
                            <Text style={styles.countText}>Followings</Text>

                        </View>
                        <View style={styles.profileInfoCount}>
                            <Text style={styles.count}>73</Text>
                            <Text style={styles.countText}>Followers</Text>

                        </View>


                    </View>

                </View>
                <View style={styles.closet}>
                    <Image source={require('../../Img/grid.png')} style={styles.grid}/>


                </View>

            </View>




        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        flexDirection:'column',

    },

    navbar: {
        flex:1,
        backgroundColor: "#fffbf8",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#DDDDDD',


    },
    items:{
        paddingHorizontal: 12,
        flexDirection: 'row', // step 1
        justifyContent: 'space-between', // step 2
        paddingTop: 30,
    },
    leftText: {
        color: '#ff5733',
    },
    titleText: {
        fontWeight: '800',
        color: '#ff5733',
    },
    rightText: {
        color: '#ff5733',
    },
    profileImageArea:{
        justifyContent:'center',
        alignItems:'center',

    },
    profileImage:{
        marginTop:15,
        width:100,
        height:100,
        borderRadius:50,
    },
    profileNameText:{
        marginTop:15,
        fontSize:18,
        fontWeight:'300',

    },
    profileName:{
        justifyContent:'center',
        alignItems:'center',
    },
    profileInfo:{
        marginHorizontal:20,
        marginVertical:25,

        flexDirection:'row',
        borderRadius:5,

    },
    profileInfoCount:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        padding:20,

    },
    count:{
        fontSize:17,
        color:"#ff5733",
        fontWeight:"600",
    },
    countText:{
        color:"#7f7f7f",
        fontWeight:"300",

    },
    closet:{
        flex:1,
    },
    grid:{
        resizeMode:'contain',
        width:400,
        height:400,

    },






});
