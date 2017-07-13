
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





export default class index extends Component{



    render(){


        return(
            <View style={styles.container}>
                <Text>Profile Page</Text>

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
