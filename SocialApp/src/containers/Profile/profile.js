import React, { Component } from 'react';
import { Spinner } from 'native-base';
import {View, Text, Image, AsyncStorage, FlatList, TouchableOpacity, TouchableWithoutFeedback, Modal, Dimensions } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
const { height, width } = Dimensions.get("window");
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from "react-redux";
import {ProfileActions} from '../../store/actions/'


class ProfileScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      first_name:'',
      last_name:'',
      showModal:false,
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

  openGallery = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 430,
      cropping: true,
      multiple: false,
      avoidEmptySpaceAroundImage: true
    }).then(this.updateImage);
  }

  updateImage = (response) => {
    if (response.didCancel) {
    } else if (response.error) {
    } else {
      const images = { image_url: response.path, uri: response.path, name: response.path.split("/")[response.path.split("/").length - 1], type: response.mime }
      this.setState({
        showModal: false
      })
      this.props.userImage(images)
    }
  }

    toggleModal = ()=> {
      this.setState({
        showModal:!this.state.showModal
      })
    }
    render() {
      console.log('current user', this.state.current_user)
      const {first_name, last_name} = this.state
      return (
        <View style={{width:'100%', paddingHorizontal:20, paddingTop:10}}>
          <View style={{width:'100%', height:250}}>
            <TouchableWithoutFeedback onPress={this.toggleModal}>
              <Image source={{uri:"https://www.gstatic.com/webp/gallery/1.jpg"}} style={{height:250, width:'100%', borderRadius:10}} />
            </TouchableWithoutFeedback>
            <View style={{height:30, width:40, backgroundColor:'#e1e1d0', borderRadius:5, position:'absolute', right:5, bottom:5, alignItems:'center', justifyContent:'center'}}>
              <Image source={require('../../images/Camera.png')} style={{height:25, width:25}} />
            </View>
          </View>
          <View  style={{alignItems:'center', justifyContent:'center', marginTop:-100}}>
            <TouchableOpacity onPress={this.toggleModal}>
            <View  style={{height:200, width:200, borderRadius:200,}}>
              <Image source={{uri:"https://www.gstatic.com/webp/gallery/4.jpg"}} style={{height:200, width:200,borderRadius:200}} />
            </View>
            </TouchableOpacity>
            <View  style={{height:40, width:40, borderRadius:50, position:'absolute', right:90, bottom:20,backgroundColor:'#e1e1d0', alignItems:'center', justifyContent:'center',elevation:2}}>
              <Image source={require('../../images/Camera.png')} style={{height:20, width:20}} />
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
          <Modal
            visible={this.state.showModal}
            onRequestClose={this.toggleModal}
            transparent>
            <View style={{ height, width }} >
              <TouchableOpacity activeOpacity={1} onPress={this.toggleModal} style={{ height: "50%", backgroundColor: "rgba(255,255,255,0.9)", width: "100%" }} >
              </TouchableOpacity>
              <View style={{ height: "50%", backgroundColor: "#8721FD", width: "100%", borderTopRightRadius: 20, borderTopLeftRadius: 20, justifyContent: "space-evenly", alignItems: "center", paddingHorizontal: 10 }} >
                <View style={{ height: 8, width: 45, backgroundColor: "white", borderRadius: 8 }}></View>
                <Text style={{ fontSize:18,fontFamily:'Montserrat-Regular',textAlign:"center",color:"#FFFFFF"}}>Choose From</Text>
                <TouchableOpacity onPress={this.openGallery} style={{width:"70%", height:50, backgroundColor: "white", color: "#8721FD", fontSize: 17, borderRadius:10, alignItems:'center', justifyContent:'center', flexDirection:'row'}}><Image style={{height:20, width:20}} source={require("../../images/Gallery.png")} /><Text style={{fontSize:16, marginLeft:10}}>Gallery</Text></TouchableOpacity>
                <Text style={{ fontSize:16,fontFamily:'Montserrat-Regular',textAlign:"center",color:"#FFFFFF"}}>OR</Text>
                <TouchableOpacity style={{width:"70%", height:45, borderWidth:2, borderColor:'white', fontSize: 17, borderRadius:10, alignItems:'center', justifyContent:'center', flexDirection:'row'}}><Image  style={{height:20, width:20}} source={require("../../images/Camera_white.png")} /><Text style={{fontSize:16, marginLeft:10, color:"white"}}>Camera</Text></TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      );
    }
}

const mapStateToProps = (state) => {
  return {
   
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    userImage: payload => dispatch(ProfileActions.uploadCoverPicture(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)