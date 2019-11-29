import React, { Component } from 'react';
import { Spinner } from 'native-base';
import {View, Text, Image, AsyncStorage, FlatList } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
// import jwt_decode from 'jwt-decode';

class HomeScreen extends React.Component {
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
        if (user) {
            let parsedData = JSON.parse(user);
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
      const {first_name, last_name} = this.state
      return (
        <View style={{width:'100%', paddingHorizontal:20}}>
          <Text>Well come {first_name} {last_name} </Text>
        </View>
      );
    }
}


export default HomeScreen;