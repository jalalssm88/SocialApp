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

class ViewPhotos extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showModal4:false,
        }
        this.getAllImages()
    }

    uploadImages = () => {ImagePicker.openPicker({
        width: 400,
        height: 430,
        cropping: true,
        multiple: false,
        avoidEmptySpaceAroundImage: true
      }).then(this.updateImages);
      }
    
      updateImages =(response) => {
        console.log('heyyyyy image', response)
        if (response.didCancel) {
        } else if (response.error) {
        } else {
          const images = { image_url: response.path, uri: response.path, name: response.path.split("/")[response.path.split("/").length - 1], type: response.mime }
          this.setState({
            showModal4: false
          })
          this.props.uploadImage(images)
        }
      }
    
    getAllImages =()=>{

        let {user_id, from_add_photos} = this.props.navigation.state.params
        console.log('from_add_photos', from_add_photos)
        if(from_add_photos){
            this.props.getAllImages(user_id)
        }else{
            this.props.getAllImages(user_id)
        }
    }
    toggleModal4 = ()=> {
        this.setState({
          showModal4:!this.state.showModal4
        })
    }

    render() {
        const {allImages} = this.props
        console.log('state', this.state)
        return(
            <View style={{marginHorizontal:10}}>
                <View style={{borderTopWidth:1,borderBottomWidth:1, alignItems:'center', borderColor:"gray", width:"100%", justifyContent:"space-between", marginBottom:20, flexDirection:"row", height:80,}}>
                    <Text style={{fontSize:18, fontWeight:"bold"}}>Photos</Text>
                    <TouchableOpacity onPress={()=>{
                        this.toggleModal4()
                    }}>
                      <Text style={{fontSize:18, fontWeight:"bold", color:"blue"}}>Add Photos</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width:"100%", marginTop:20, paddingTop:10,}}>
                    {
                        allImages.length?
                        <View>
                            <FlatList
                                data={allImages}
                                renderItem={({ item }) => 
                                <View style={{width:"50%"}}>
                                <View style={{width:"95%",}}>
                                    <Image source={{uri:item.upload_image}} style={{height:200, width:"100%",marginTop:10, borderRadius:10, marginLeft:5 }}  />
                                </View>
                                </View>
                                }
                                keyExtractor={item => item.id}
                                numColumns={2}
                            />
                        </View>:
                        <View></View>
                    }
                </View>

                <Modal
                    visible={this.state.showModal4}
                    onRequestClose={this.toggleModal4}
                    transparent>
                    <View style={{ height, width }} >
                    <TouchableOpacity activeOpacity={1} onPress={this.toggleModal4} style={{ height: "50%", backgroundColor: "rgba(255,255,255,0.9)", width: "100%" }} >
                    </TouchableOpacity>
                    <View style={{ height: "50%", backgroundColor: "#8721FD", width: "100%", borderTopRightRadius: 20, borderTopLeftRadius: 20, justifyContent: "space-evenly", alignItems: "center", paddingHorizontal: 10 }} >
                        <View style={{ height: 8, width: 45, backgroundColor: "white", borderRadius: 8 }}></View>
                        <Text style={{ fontSize:18,fontFamily:'Montserrat-Regular',textAlign:"center",color:"#FFFFFF"}}>Choose From</Text>
                        <TouchableOpacity onPress={this.uploadImages} style={{width:"70%", height:50, backgroundColor: "white", color: "#8721FD", fontSize: 17, borderRadius:10, alignItems:'center', justifyContent:'center', flexDirection:'row'}}><Image style={{height:20, width:20}} source={require("../../images/Gallery.png")} /><Text style={{fontSize:16, marginLeft:10}}>Gallery</Text></TouchableOpacity>
                        <Text style={{ fontSize:16,fontFamily:'Montserrat-Regular',textAlign:"center",color:"#FFFFFF"}}>OR</Text>
                        <TouchableOpacity style={{width:"70%", height:45, borderWidth:2, borderColor:'white', fontSize: 17, borderRadius:10, alignItems:'center', justifyContent:'center', flexDirection:'row'}}><Image  style={{height:20, width:20}} source={require("../../images/Camera_white.png")} /><Text style={{fontSize:16, marginLeft:10, color:"white"}}>Camera</Text></TouchableOpacity>
                    </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('map state to props in photo viewer????????', state )
  return {
        allImages:state.Profile.all_images_data
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    uploadImage:payload => dispatch(ProfileActions.uploadImages(payload)),
    getAllImages: payload => dispatch(ProfileActions.getAllImages(payload)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPhotos)