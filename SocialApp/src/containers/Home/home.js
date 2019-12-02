import React, { Component } from 'react';
import { Spinner } from 'native-base';
import {View, Text, Image, AsyncStorage, FlatList, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { connect } from "react-redux";
import {ProfileActions} from '../../store/actions/'


// import jwt_decode from 'jwt-decode';

class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      first_name:'',
      last_name:'',
      leave_status:'',
      data:[
        {
          id:1,
          name:"Jalal Uddin",
          time:"20 min",
          title:"",
          image:"https://www.gstatic.com/webp/gallery3/1.png"
        },
        {
          id:2,
          name:"Umar Hashmi",
          time:"2 hr",
          title:"Sleepy Pingoin",
          image:"https://www.gstatic.com/webp/gallery3/2_webp_ll.png"
        },
        {
          id:3,
          name:"Fahad Jawaid",
          time:"yesterday at 10 pm",
          title:"Three dyes", 
          image:"https://www.gstatic.com/webp/gallery3/3_webp_ll.png"
        },
        {
          id:4,
          name:"Jasim",
          time:"three days ago"
        }
      ]
    }
    this.getUser();
    this.getProfilePicture()
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
  getProfilePicture =()=> {
    this.props.getProfile()
  }
    render() {
      const {first_name, last_name} = this.state
      const{profilePicture, profileLoading} = this.props;
      console.log('profile', profilePicture)
      return (
        <View style={{width:'100%',}}>
          <ScrollView style={{ backgroundColor:"gray"}}>
            <View style={{backgroundColor:"white"}}>
              <View style={{flexDirection:'row', width:"100%", height:60, alignItems:'center', paddingHorizontal:15}}>
                <View style={{width:"10%", height:50, width:50, borderRadius:50}}>
                  {
                    profilePicture == ""?<Image source={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/1024px-Placeholder_no_text.svg.png"}} style={{height:50, width:50, borderRadius:50}} />:
                    <Image source={{uri:profilePicture.profile_picture}} style={{height:50, width:50, borderRadius:50}} />
                  }
                </View>
                <View style={{width:'85%', height:50, alignItems:'center', justifyContent:'center', paddingLeft:10}}>
                  <TouchableOpacity style={{width:"100%", height:40, borderColor:"gray", borderRadius:20, borderWidth:1, justifyContent:'center'}}>
                    <Text style={{paddingLeft:10}}>What's on your mind</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{borderBottomWidth:1, borderColor:"gray", width:"100%" }}></View>
              <View style={{width:"100%", height:35, flexDirection:'row', marginTop:10,marginBottom:10}}>
                <View style={{width:"50%", flexDirection:"row", alignItems:'center', justifyContent:"center", borderRightWidth:1, borderColor:"gray"}}>
                  <Feather name="image" size={25} color="green" />
                  <Text>Photos</Text>
                </View>
                <View style={{width:"50%", flexDirection:"row", alignItems:'center', justifyContent:"center"}}>
                  <Feather name="map-pin" size={25} color="red" />
                  <Text>Check In</Text>
                </View>
              </View>
            </View>

            <FlatList
              data={this.state.data}
              renderItem={({ item }) => 
                <View style={{height:500, width:"100%", backgroundColor:"white", marginTop:15,  paddingHorizontal:15}}>
                  <View style={{flexDirection:"row"}}>
                    <View style={{width:"10%", height:50, width:50, borderRadius:50,marginTop:10, backgroundColor:'green'}}>
                      <Image source={{uri:"https://www.gstatic.com/webp/gallery/4.jpg"}} style={{height:50, width:50, borderRadius:50}} />
                    </View>
                    <View style={{flexDirection:"column"}}>
                      <Text style={{fontSize:17, fontWeight:"bold", marginLeft:10, marginTop:12}}>{item.name}</Text>
                      <Text style={{fontSize:13, marginLeft:10}}>{item.time}</Text>
                    </View>
                  </View>
                  <View style={{marginTop:10, height:380}}>
                    <Text>{item.title}</Text>
                    <Image source={{uri:item.image}} style={{width:"100%", height:350, resizeMode:"contain"}}/>
                  </View>
                  <View style={{height:45, width:"100%",flexDirection:'row'}}>
                    <View style={{width:"33%", flexDirection:"row", alignItems:'center', justifyContent:"center"}}>
                      <Feather name="thumbs-up" size={25} color="gray" />
                      <Text style={{marginLeft:5, color:"gray"}}>Like</Text>
                    </View>
                    <View style={{width:"33%", flexDirection:"row", alignItems:'center', justifyContent:"center"}}>
                      <Feather name="message-circle" size={25} color="gray" />
                      <Text style={{marginLeft:5, color:"gray"}}>Comment</Text>
                    </View>
                    <View style={{width:"33%", flexDirection:"row", alignItems:'center', justifyContent:"center"}}>
                      <Feather name="corner-up-right" size={25} color="gray" />
                      <Text style={{marginLeft:5, color:"gray"}}>Share</Text>
                    </View>
                  </View>
                </View>
             }
              keyExtractor={item => item.id}
            />
            {/* <View style={{width:"100%", height:400, backgroundColor:"white", marginTop:15}}>
              <Text>heloo some stuffs</Text>
            </View> */}
          </ScrollView>
        </View>
      );
    }
}

const mapStateToProps = (state) => {
  return {
    profilePicture:state.Profile.profile_picture_data,
    profileLoading:state.Profile.profilePicLoading
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getProfile:payload => dispatch({type:ProfileActions.GET_PROFILE_PICTURE})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
