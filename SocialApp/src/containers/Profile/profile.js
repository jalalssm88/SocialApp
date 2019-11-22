import React, { Component } from 'react';
import { Spinner } from 'native-base';
import {View, Text, Image, AsyncStorage, FlatList, } from 'react-native';
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
        <View style={{width:'100%', paddingHorizontal:20, paddingTop:10}}>
          <View style={{width:'100%', height:250}}>
            <Image source={{uri:"https://www.gstatic.com/webp/gallery/1.jpg"}} style={{height:250, width:'100%', borderRadius:10}} />
          </View>
          <View style={{alignItems:'center', justifyContent:'center', marginTop:-100}}>
            <View style={{height:200, width:200, borderRadius:200,}}>
              <Image source={{uri:"https://www.gstatic.com/webp/gallery/4.jpg"}} style={{height:200, width:200,borderRadius:200}} />
            </View>
          </View>
          <View style={{width:"100%", height:70, alignItems:'center', justifyContent:'center',}}>
            <Text style={{fontSize:24, fontWeight:"bold"}}>{first_name} {last_name}</Text>
            <Text style={{fontSize:16, textAlign:'center'}}>Gym lover, cricket lover, developer, love to watch movies</Text>
          </View>
          <View style={{width:"100%", height:200,paddingTop:25}}>
            <View style={{flexDirection:'row', paddingBottom:10}}>
              <View style={{width:'10%'}}>
                <Feather name="archive" color="black" size={25} ></Feather>
              </View>
              <View style={{width:'90%'}}>
                <Text style={{fontSize:18}}>Front end Developer at <Text style={{fontWeight:'bold'}}>Bitswits</Text></Text>
              </View>
            </View>

            <View style={{flexDirection:'row', paddingBottom:10}}>
              <View style={{width:'10%'}}>
                <Feather name="archive" color="black" size={25} ></Feather>
              </View>
              <View style={{width:'90%'}}>
                <Text style={{fontSize:18}}>React Native Developer at <Text style={{fontWeight:'bold'}}>Code Avenue</Text></Text>
              </View>
            </View>

            <View style={{flexDirection:'row', paddingBottom:10}}>
              <View style={{width:'10%'}}>
                <Feather name="layers" color="black" size={25} ></Feather>
              </View>
              <View style={{width:'90%'}}>
                <Text style={{fontSize:18}}>Studied at <Text style={{fontWeight:'bold'}}>Preston University</Text></Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
}


export default ProfileScreen;