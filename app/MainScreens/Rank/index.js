
import React, {Component} from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Icons from 'react-native-vector-icons/SimpleLineIcons'
import Hr from 'react-native-hr'


import {
    Text,
    View,
    StatusBar,
    StyleSheet,
    Navigator,
    Image,
    TouchableOpacity,
    AsyncStorage,
    ScrollView,



} from 'react-native'
import Button from 'react-native-button'
import SearchBar from 'react-native-searchbar'

const items = [
    1337,
    'janeway',
    {
        lots: 'of',
        different: {
            types: 0,
            data: false,
            that: {
                can: {
                    be: {
                        quite: {
                            complex: {
                                hidden: [ 'gold!' ],
                            },
                        },
                    },
                },
            },
        },
    },
    [ 4, 2, 'tree' ],
];





export default class index extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            swap: 1,
            items,
            results: [],


        };
        this._handleResults = this._handleResults.bind(this);
    }
    _handleResults(results) {
        this.setState({ results });
    }

    navigateToVote(){
        this.props.navigation.navigate('Vote')
    }

    forceUpdate() {

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

                })
                .catch(error => {
                    console.log(error);
                })
        })

    }




    componentDidMount() {

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
                    console.log("Data: " +responseData);

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
            <ScrollView style={styles.container}>
                <StatusBar barStyle="dark-content"/>
                <SearchBar
                    ref={(ref) => this.searchBar = ref}
                    data={items}
                    handleResults={this._handleResults}
                    showOnLoad={false}
                    // iOSPadding={true}
                    textColor="white"
                    heightAdjust={0}
                    backgroundColor="#ff5733"
                    hideBack={false}
                    fontSize={14}
                />
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={()=>this.navigateToVote()}><Icon name="ios-arrow-back" size={24} color="#ff5733"/></TouchableOpacity>
                    <Text style={styles.titleText}>FaPo</Text>
                    <TouchableOpacity onPress={()=>this.searchBar.show()}><Icon name="ios-search" size={24} color="#ff5733"/></TouchableOpacity>
                </View>
                {/*<View style={styles.week}>*/}
                    {/*<Text style={styles.weekText}>Queen Chart</Text>*/}
                {/*</View>*/}
                <View style={styles.firstRank}>
                    <Image source={require('../../Img/vote.png')} style={styles.firstRankImage}/>
                    <Icon name="md-trophy" size={30} style={styles.trophy}/>
                    <Text style={styles.firstPlaceName}>Kendall Jenner</Text>
                </View>
                <View style={styles.buttonArea}>
                    <View style={{flex:1,alignItems:'flex-end'}}>
                        <Button
                            containerStyle={{
                                paddingHorizontal:21,
                                paddingVertical:10,
                                shadowColor:"#cccccc", shadowRadius:3, shadowOpacity:90,
                                shadowOffset:{width:1, height:2},
                                borderWidth:StyleSheet.hairlineWidth,
                                borderColor:'#e8e8e8',
                                borderRadius: 5,
                                backgroundColor: '#ffffff',
                                marginRight:10,

                            }}
                            style={{fontSize: 12, color: '#ffc305', fontWeight: '900', }}>
                            Follow
                        </Button>
                    </View>
                    <View style={{flex:1, alignItems:'flex-start'}}>
                        <Button
                            containerStyle={{
                                paddingHorizontal:21,
                                paddingVertical:10,
                                shadowColor:"#cccccc", shadowRadius:3, shadowOpacity:90,
                                shadowOffset:{width:1, height:2},
                                borderWidth:StyleSheet.hairlineWidth,
                                borderColor:'#e8e8e8',
                                borderRadius: 5,
                                backgroundColor: '#ffffff',
                                marginLeft:10,

                            }}
                            style={{fontSize: 12, color: '#ffc305', fontWeight: '900', }}>
                            Closet
                        </Button>
                    </View>
                </View>
                <View style={styles.line}></View>

                <View style={styles.secondRank}>

                    <View style={styles.rankNumberArea}>

                        <Text style={styles.rankNumber}>
                            2
                        </Text>
                    </View>
                        <Image source={require('../../Img/rank2.png')} style={styles.rankImage}/>
                    <View style={styles.rankButtonArea}>
                        <Text style={styles.rankName}>Haily Baldwin</Text>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity><Icon name="md-person-add" size={22} style={styles.follow}/></TouchableOpacity>
                            <TouchableOpacity><Icons name="drawer" size={22} style={styles.follow}/></TouchableOpacity>
                        </View>
                        <TouchableOpacity><Icon name="md-trophy" size={22} style={styles.career}/></TouchableOpacity>
                    </View>
                </View>

                <View style={styles.line}></View>
                <View style={styles.secondRank}>
                    <View style={styles.rankNumberArea}>
                        <Text style={styles.rankNumber}>
                            3
                        </Text>
                    </View>
                    <Image source={require('../../Img/rank4.png')} style={styles.rankImage}/>
                    <View style={styles.rankButtonArea}>
                        <Text style={styles.rankName}>Ji Woo Yoon</Text>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity><Icon name="md-person-add" size={22} style={styles.follow}/></TouchableOpacity>
                            <TouchableOpacity><Icons name="drawer" size={22} style={styles.follow}/></TouchableOpacity>
                        </View>

                    </View>

                </View>
                <View style={styles.line}></View>
                <View style={styles.secondRank}>
                    <View style={styles.rankNumberArea}>
                        <Text style={styles.rankNumber}>
                            4
                        </Text>
                    </View>
                    <Image source={require('../../Img/rank3.png')} style={styles.rankImage}/>
                    <View style={styles.rankButtonArea}>
                        <Text style={styles.rankName}>Jung Hyun Lee</Text>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity><Icon name="md-person-add" size={22} style={styles.follow}/></TouchableOpacity>

                        </View>
                    </View>

                </View>

                    {/*{users}*/}

            </ScrollView>




        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        backgroundColor:"white"

    },
    navbar: {
        paddingTop: 20,

        height: 64,
        backgroundColor: "#fffbf8",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#DDDDDD',
        paddingHorizontal: 12,
        flexDirection: 'row', // step 1
        justifyContent: 'space-between', // step 2
        alignItems: 'center', // step 3
    },
    leftText: {
        color: '#ff5733',
    },
    trophy:{
        marginTop:7,
        color:"#ff5733"

    },
    titleText: {
        fontWeight: '800',
        color: '#ff5733',
    },
    rightText: {
        color: '#ff5733',
    },

    weekText:{
        fontWeight:'200',
        fontSize:18
    },
    firstRank:{
        flex:1.5,
        alignItems:'center',
        padding:4,


    },
    secondRank:{
        flex:0.5,
        flexDirection:'row',
    },

    firstRankImage:{
        
        width:315,
        height:315,
        resizeMode:'contain',
        borderRadius:10
    },
    firstPlaceName:{
        fontSize:18,
        fontWeight:'400',
        color:"#767676",
        paddingBottom:10,
    },
    buttonArea:{
        flex:0.3,
        flexDirection:"row",

        justifyContent:'center',
        alignItems:'center',
        paddingBottom:10,
    },
    rankNumberArea:{
        flex:1,
        padding:10,
        backgroundColor:"#fff0f0",
        marginTop:23,
        marginBottom:23,
        alignItems:'flex-end',
        justifyContent:'center',


    },
    rankNumber:{
        color:"#ff5733",
        fontWeight:'800',
        fontSize:20,

    },

    rankImage:{

        width:100,
        height:100,

    },
    rankButtonArea:{
       flex:4,
        paddingTop:5,
        flexDirection:'column',
        justifyContent:'center',

    },
    rankName:{
        fontSize:16,
        fontWeight:'400',
        color:"#767676",
        paddingLeft:10,
        paddingTop:5,

    },
    follow:{
        paddingLeft:10,
        paddingTop:3,
        color:"#ffc305"
    },
    career:{
        paddingLeft:10,
        paddingTop:3,
        color:"#cccccc"

    },
    line:{
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderColor:"#e1e1e1",
        marginTop:20,
        marginBottom:20,


    }





});
