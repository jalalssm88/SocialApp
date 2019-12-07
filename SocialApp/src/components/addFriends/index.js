import React, { Component } from 'react';
import { Spinner } from 'native-base';
import {View, Text, TextInput, Image, AsyncStorage , FlatList, TouchableOpacity, TouchableWithoutFeedback, Modal, Dimensions, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
const { height, width } = Dimensions.get("window");
import { connect } from "react-redux";
import {ProfileActions} from '../../store/actions/';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-datepicker';
import moment from 'moment'
import SwitchToggle from 'react-native-switch-toggle';
// import styles from './Style'

class AddFriends extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            friends:[
                {
                  id:1,
                  name:"umar",
                  color:"red",
                  image:"https://www.gstatic.com/webp/gallery3/1.png"
                },
                {
                  id:2,
                  name:"jalal ",
                  color:"blue",
                  image:"https://www.gstatic.com/webp/gallery3/2_webp_ll.png"
                },
                {
                  id:3,
                  name:"fahad",
                  color:"green",
                  image:"https://www.gstatic.com/webp/gallery3/3_webp_ll.png"
                },
                {
                  id:4,
                  name:"musbah",
                  image:"https://www.gstatic.com/webp/gallery3/1.png"
                },
                {
                  id:5,
                  name:"jalal uddin",
                  image:"https://www.gstatic.com/webp/gallery3/2_webp_ll.png"
                },
                {
                  id:6,
                  name:"rafay",
                  image:"https://www.gstatic.com/webp/gallery3/3_webp_ll.png"
                },
              ]
        }
        this.getUsers()
    }

    getUsers = () => {
        console.log('geting users')
        this.props.getUsers()
    }

    render() {
        console.log('i am in add friends page')
        return(
            <View style={{marginHorizontal:10}}>
                <View style={{height:50, width:"100%"}}>
                    <Text style={{fontSize:22, fontWeight:"bold"}}>People You May Know</Text>
                </View>
                <View>
                <FlatList
                    data={this.state.friends}
                    renderItem={({ item }) => 
                        <View style={{width:"100%", flexDirection:'row',marginBottom:10, height:70}}>
                            <View style={{width:"25%",paddingTop:10}}>
                                <Image source={require('../../images/images22.jpg')} style={{height:70, width:70, borderRadius:100}}  />
                            </View>
                            <View style={{width:"80%",justifyContent:'space-between'}}>
                                <Text style={{fontSize:18, marginLeft:6}}>{item.name}</Text>
                                <TouchableOpacity style={{height:30, width:100, alignItems:'center', borderRadius:5, justifyContent:'center', backgroundColor:'blue'}}>
                                    <Text style={{color:"white"}}>Add Friend</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    keyExtractor={item => item.id}
                    numColumns={3}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('map stat in friendssssss', state)
  return {

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getUsers:payload => dispatch(ProfileActions.getUsers()),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFriends)