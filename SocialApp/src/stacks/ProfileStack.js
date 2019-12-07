import React from "react";
import { Text, View } from 'react-native'
import {AddProfiles, ViewPhotos, AddFriends} from '../components/';
import { Icon } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';

//Profile Stack
const ProfileStack = {
    AddProfiles: {
        screen: AddProfiles,
        navigationOptions: ({ navigation }) => ({
            header:<View style={{width:"100%", height:40, borderBottomWidth:1, borderColor:"#c7c5c1", flexDirection:'row'}}>
                <View style={{width:'10%', justifyContent:'center', paddingLeft:10}}>
                    <Feather onPress={() => navigation.goBack(null)} name="x" color="black" size={25}></Feather>
                </View>
                <View style={{width:"90%", paddingTop:7 }}>
                    <Text style={{fontSize:18}}>{navigation.state.params.title}</Text>
                </View>
            </View>
        }),
    },
    ViewPhotos: {
        screen: ViewPhotos,
        navigationOptions: ({ navigation }) => ({
            header:<View style={{width:"100%", height:40, borderBottomWidth:1, borderColor:"#c7c5c1", flexDirection:'row'}}>
                <View style={{width:'10%', justifyContent:'center', paddingLeft:10}}>
                    <Feather onPress={() => navigation.goBack(null)} name="arrow-left" color="black" size={25}></Feather>
                </View>
                <View style={{width:"90%", paddingTop:7 }}>
                    {console.log('kdjfkfkdfj', navigation)}
                    <Text style={{fontSize:18}}>{navigation.state.params.full_nme}</Text>
                </View>
            </View>
        }),
    },
    AddFriends: {
        screen: AddFriends,
        navigationOptions: ({ navigation }) => ({
            header:<View style={{width:"100%", height:40, borderBottomWidth:1, borderColor:"#c7c5c1", flexDirection:'row'}}>
                <View style={{width:'10%', justifyContent:'center', paddingLeft:10}}>
                    <Feather onPress={() => navigation.goBack(null)} name="arrow-left" color="black" size={25}></Feather>
                </View>
                <View style={{width:"90%", paddingTop:7 }}>
                    {console.log('add friendsssssss', navigation)}
                    <Text style={{fontSize:18}}>Find friends</Text>
                </View>
            </View>
        }),
    },
}

export default ProfileStack
