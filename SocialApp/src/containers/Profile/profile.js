import React, { Component } from 'react';
import { Spinner } from 'native-base';
import {View, Text, Image, AsyncStorage, FlatList } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
// import jwt_decode from 'jwt-decode';

class ProfileScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      first_name:'',
      last_name:''
    }
    this.getUser();
  }

  getUser = () => {
    AsyncStorage.getItem("user").then((user) => {
      console.log('usrrrrrrrrrrr', user)
        if (user) {
          console.log('i am in user activeeee')
            let parsedData = JSON.parse(user);
            console.log('parsed dataa', parsedData.firstName)
            this.setState({
              first_name:parsedData.firstName,
              last_name:parsedData.lastName
            })
        }else{
          this.setState({
            loader:false
          })
        }
    })
}
    render() {
      console.log('current user', this.state.current_user)
      const {first_name, last_name} = this.state
      return (
        <View style={{width:'100%', paddingHorizontal:20}}>
          <Text>Well come {first_name} {last_name} to your profile</Text>
        </View>
      );
    }
}


export default ProfileScreen;