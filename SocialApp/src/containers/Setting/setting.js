import React, { Component } from 'react';
import { Spinner } from 'native-base';
import {View, Text, Image, AsyncStorage, FlatList, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import NavigationServices from '../../services/NavigationServices';
// import jwt_decode from 'jwt-decode';

class SettingScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      first_name:'',
      last_name:''
    }
  }

  logOut = () => {
    AsyncStorage.removeItem("user")
    NavigationServices.navigate('LoginScreen');
}
    render() {
      return (
        <View style={{width:'100%', paddingHorizontal:20, paddingTop:10}}>
            <TouchableOpacity onPress={this.logOut} style={{height:50, width:"100%", elevation:2, backgroundColor:"#FFFFFF", alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:20}}>Log out</Text>
            </TouchableOpacity>
        </View>
      );
    }
}


export default SettingScreen;