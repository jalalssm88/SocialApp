import React, { Component } from 'react';
import { Spinner } from 'native-base';
import {View, Text, Image, AsyncStorage, FlatList } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
// import jwt_decode from 'jwt-decode';

class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      current_user:[],
      lists:[
        {
          id:1,
          jobTitle:"Front end Developer",
          postedBy:"5 start designers",
          location:"karachi"
        },
        {
          id:2,
          jobTitle:"back end Developer",
          postedBy:"5 start designers",
          location:"karachi"
        },
        {
          id:3,
          jobTitle:"back end Developer",
          postedBy:"5 start designers",
          location:"karachi"
        },
      ]
    }
    this.getUser();
  }

  getUser = () => {
    AsyncStorage.getItem("user").then((user) => {
      console.log('usrrrrrrrrrrr', user)
        if (user) {
          console.log('i am in user activeeee')
            let parsedData = JSON.parse(user);
            console.log('parsed dataa', parsedData)
            this.setState({
              current_user:parsedData.user_name
            })
        }else{
          this.setState({
            loader:false
          })
        }
    })
}
    render() {
      return (
        <View style={{width:'100%', paddingHorizontal:20}}>
          <FlatList
            data={this.state.lists}
            renderItem={({ item }) => 
              <View style={{width:'100%', height:80, borderBottomWidth:1, borderBottomColor:'black', flexDirection:'row', paddingTop:5}}>
                <View style={{width:'20%', height:70}}><View style={{height:70, borderWidth:1, borderColor:'black',alignItems:'center', justifyContent:'center'}}>
                  <Feather name="grid" color="black" size={25}></Feather>  
                </View></View>
                <View style={{width:'80%', height:70, paddingLeft:20}}>
                  <Text>{item.jobTitle}</Text>
                  <Text>{item.postedBy}</Text>
                  <Text>{item.location}</Text>
                </View>
              </View>
            }
            keyExtractor={item => item.id}
          />
        </View>
      );
    }
}


export default HomeScreen;