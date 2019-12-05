import React, { Component } from 'react';
import { Spinner } from 'native-base';
import {View, Text, Image, AsyncStorage , FlatList, TouchableOpacity, TouchableWithoutFeedback, Modal, Dimensions, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
const { height, width } = Dimensions.get("window");
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from "react-redux";
import {ProfileActions} from '../../store/actions/'
// import AddProfiles from '../../components/addProfile'


class ProfileScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      first_name:'',
      last_name:'',
      showModal:false,
      showModal2:false,
      showModal3:false,
      summary:"dskdfj sdlfjskdlfj lksdfjsdlk sldkfjdslkfj sdlkfjds flkdsf dslkfjdsl k",
      work_place:[
        // {
        //   id:1,
        //   title:"React native developer",
        //   company:"5StarDesigners",
        //   job_status:true
        // },
        // {
        //   id:1,
        //   title:"Front end developer",
        //   company:"BitsWits",
        //   job_status:false
        // },
        // {
        //   id:1,
        //   title:"Call center agent",
        //   company:"E-Data solution",
        //   job_status:false
        // }
      ],
      school:[
        // {
        //   id:2,
        //   institude:"St.Patrick College, Karachi",
        // },
        // {
        //   id:3,
        //   institude:"Al Karim public school chitral",
        //   school_status:false,
        // }
      ],
      university:[
        // {
        //   id:2,
        //   institude:"Preston University",
        //   school_status:true,
        // },
        // {
        //   id:3,
        //   institude:"Al Karim public school chitral",
        //   school_status:false,
        // }
      ],
      current_city:"",
      home_town:"",
      relationship_status:"",
      photos:[
        {
          id:1,
          image:"https://www.gstatic.com/webp/gallery3/1.png"
        },
        {
          id:2,
          image:"https://www.gstatic.com/webp/gallery3/2_webp_ll.png"
        },
        {
          id:3,
          image:"https://www.gstatic.com/webp/gallery3/3_webp_ll.png"
        },
        {
          id:4,
          image:"https://www.gstatic.com/webp/gallery3/1.png"
        },
        {
          id:5,
          image:"https://www.gstatic.com/webp/gallery3/2_webp_ll.png"
        },
        {
          id:6,
          image:"https://www.gstatic.com/webp/gallery3/3_webp_ll.png"
        },
      ],
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
    this.getUser();
    this.getCoverPicture()
    this.getProfilePicture()
    this.getWorkPlace()
    this.getSchool()
    this.getUniversity()
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

  // upload cover picture
  uploadCover = () => {ImagePicker.openPicker({
      width: 400,
      height: 430,
      cropping: true,
      multiple: false,
      avoidEmptySpaceAroundImage: true
    }).then(this.updateCoverImage);
  }
  updateCoverImage = (response) => {
    if (response.didCancel) {
    } else if (response.error) {
    } else {
      const images = { image_url: response.path, uri: response.path, name: response.path.split("/")[response.path.split("/").length - 1], type: response.mime }
      this.setState({
        showModal: false
      })
      this.props.coverImage(images)
    }
  }
  getCoverPicture =()=> {
    this.props.getCover()
  }

  // upload profile picture
  uploadProfile = () => {ImagePicker.openPicker({
    width: 400,
    height: 430,
    cropping: true,
    multiple: false,
    avoidEmptySpaceAroundImage: true
  }).then(this.updateProfileImage);
  }

  updateProfileImage = (response) => {
    if (response.didCancel) {
    } else if (response.error) {
    } else {
      const images = { image_url: response.path, uri: response.path, name: response.path.split("/")[response.path.split("/").length - 1], type: response.mime }
      this.setState({
        showModal2: false
      })
      this.props.profileImage(images)
    }
  }
  getProfilePicture =()=> {
    this.props.getProfile()
  }

  getWorkPlace = ()=> {
    this.props.getWorkPlace()
  }
  getSchool = ()=> {
    this.props.getSchool()
  }
  getUniversity = ()=> {
    this.props.getUniversity()
  }

  toggleModal = ()=> {
    this.setState({
      showModal:!this.state.showModal,
    })
  }
  toggleModal2 = ()=> {
    this.setState({
      showModal2:!this.state.showModal2,
    })
  }
  toggleModal3 = ()=> {
    this.setState({
      showModal3:!this.state.showModal3,
    })
  }
  render() {
    const {first_name, last_name} = this.state
    const{coverPicture, coverLoading, profilePicture, profileLoading, workPlace, schoolData,
    universityData, currentCity, homeTown} = this.props;
    console.log('=============universityData', universityData)
    return (
      <ScrollView>
        {
          coverLoading && profileLoading? <View style={{width:width, height:height, backgroundColor:"rgba(0, 0, 0, 0.2);"}}><Spinner style={{marginTop:300}} color="red" /></View>:
          <View style={{width:'100%', paddingHorizontal:20, paddingTop:10}}>
            
              <View style={{width:'100%', height:250, backgroundColor:"#dcdede"}}>
                <TouchableWithoutFeedback onPress={this.toggleModal}>
                  {
                    coverPicture == ""?<View style={{width:'100%', height:250, alignItems:'center', justifyContent:"center"}}>
                      <TouchableOpacity style={{backgroundColor:"gray", width:"50%", height:30, borderRadius:5, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{fontSize:18, fontWeight:"bold", color:"white"}}>Add Cover</Text>
                      </TouchableOpacity>
                    </View>:
                    <Image source={{uri:`${coverPicture.cover_picture}`}} style={{height:250, width:'100%', borderRadius:10}} />
                  }
                </TouchableWithoutFeedback>
                <View style={{height:30, width:40, backgroundColor:'#dcdede', borderRadius:5, position:'absolute', right:5, bottom:5, alignItems:'center', justifyContent:'center'}}>
                  <Image source={require('../../images/Camera.png')} style={{height:25, width:25, resizeMode:'contain'}} />
                </View>
              </View>
              <View  style={{alignItems:'center', justifyContent:'center', marginTop:-100}}>
                <TouchableOpacity onPress={this.toggleModal2}>
                <View  style={{height:200, width:200, borderRadius:200, backgroundColor:'#d6d6d6'}}>
                  {
                    profilePicture == ""?<Image source={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/1024px-Placeholder_no_text.svg.png"}} style={{height:200, width:200,borderRadius:200}} />:
                    <Image source={{uri:`${profilePicture.profile_picture}`}} style={{height:200, width:200,borderRadius:200}} />
                  }
                </View>
                </TouchableOpacity>
                <View  style={{height:40, width:40, borderRadius:50, position:'absolute', right:90, bottom:20,backgroundColor:'#e1e1d0', alignItems:'center', justifyContent:'center',elevation:2}}>
                  <Image source={require('../../images/Camera.png')} style={{height:20, width:20}} />
                </View>
              </View>
              <View style={{width:"100%", height:70, alignItems:'center', justifyContent:'center',}}>
                <Text style={{fontSize:24, fontWeight:"bold"}}>{first_name} {last_name}</Text>
                {
                  this.state.summary? <TouchableOpacity style={{height:30, marginTop:10, width:"100%", alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                      <Text  style={{fontSize:16, textAlign:'center'}}>{this.state.summary}</Text>
                  </TouchableOpacity>:<View></View>
                }
              </View>
              
              <View style={{width:"100%",paddingTop:20}}>
                {/* work place */}
                <View >
                  {
                    workPlace.length?
                    <View>
                      <FlatList
                        data={workPlace}
                        renderItem={({ item }) => 
                          <View style={{flexDirection:'row',height:45,}}>
                            <View style={{width:'10%',justifyContent:'center'}}>
                              <Feather name="archive" color="black" size={25} ></Feather>
                            </View>
                            <View style={{width:'90%', justifyContent:'center' }}>
                              {
                                item.is_working?
                                <TouchableOpacity onPress={()=>{this.props.navigation.navigate("AddProfiles", {title:"Add work place"})}}>
                                  <Text style={{fontSize:18}}>Working at <Text style={{fontWeight:'bold'}}>{item.work_place}</Text></Text>
                                </TouchableOpacity>:
                                <TouchableOpacity onPress={()=>{this.props.navigation.navigate("AddProfiles", {title:"Add work place"})}}>
                                  <Text style={{fontSize:18}}>Former {item.job_title} <Text style={{fontWeight:'bold'}}>{item.work_place}</Text></Text>
                                </TouchableOpacity>
                              }
                            </View>
                          </View>
                        }
                        keyExtractor={item => item._id}
                      />
                    </View>:
                    <View>
                      <View style={{flexDirection:'row', marginBottom:10, height:45}}>
                          <View style={{width:'10%'}}>
                            <Feather name="archive" color="black" size={25} ></Feather>
                          </View>
                          <View style={{width:'90%'}}>
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("AddProfiles", {title:"Add work place"})}}>
                              <Text style={{fontSize:18}}>Add Work place</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                    </View>
                  }
                </View>
                
                {/* university */}
                <View >
                  {
                    universityData.length || schoolData.length?
                    <View>
                      <FlatList
                        data={universityData}
                        renderItem={({ item }) => 
                          <View style={{flexDirection:'row',height:45}}>
                            <View style={{width:'10%',justifyContent:'center'}}>
                              <Feather name="layers" color="black" size={25} ></Feather>
                            </View>
                            <View style={{width:'90%', justifyContent:'center'}}>
                              {
                                item.is_graduated?
                                <TouchableOpacity onPress={this.toggleModal3}>
                                  <Text style={{fontSize:18}}>Studied at <Text style={{fontWeight:'bold'}}>{item.university}</Text></Text>
                                </TouchableOpacity>:
                                <TouchableOpacity onPress={this.toggleModal3}>
                                  <Text style={{fontSize:18}}>Studies at <Text style={{fontWeight:'bold'}}>{item.university}</Text></Text>
                                </TouchableOpacity>
                              }
                            </View>
                          </View>
                        }
                        keyExtractor={item => item._id}
                      />
                    </View>:
                    <View>
                      <View style={{flexDirection:'row',}}>
                          <View style={{width:'10%'}}>
                            <Feather name="layers" color="black" size={25} ></Feather>
                          </View>
                          <View style={{width:'90%'}}>
                            <TouchableOpacity onPress={this.toggleModal3}>
                              <Text style={{fontSize:18}}>Add Education</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                    </View>
                  }
                </View>

                {/* school */}
                <View >
                  {
                    schoolData.length?
                    <View>
                      <FlatList
                        data={schoolData}
                        renderItem={({ item }) => 
                          <View style={{flexDirection:'row',height:45,}}>
                            <View style={{width:'10%',justifyContent:'center'}}>
                              <Feather name="layers" color="black" size={25} ></Feather>
                            </View>
                            <View style={{width:'90%', justifyContent:'center'}}>
                              <TouchableOpacity onPress={this.toggleModal3}>
                                <Text style={{fontSize:18}}>Went to <Text style={{fontWeight:'bold'}}>{item.school}</Text></Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        }
                        keyExtractor={item => item._id}
                      />
                    </View>:
                    <View>
                     
                    </View>
                  }
                </View>

                {/* current city */}
                <View style={{paddingBottom:10,}}>
                  {
                    currentCity.length?
                      <View style={{flexDirection:'row',}}>
                        <View style={{width:'10%'}}>
                          <Feather name="map-pin" color="black" size={25} ></Feather>
                        </View>
                        <View style={{width:'90%'}}>
                          {
                            <Text style={{fontSize:18}}>Lives in <Text style={{fontWeight:'bold'}}>{currentCity.current_city}</Text></Text>
                          }
                        </View>
                    </View>:
                    <View>
                      <View style={{flexDirection:'row',}}>
                          <View style={{width:'10%'}}>
                            <Feather name="map-pin" color="black" size={25} ></Feather>
                          </View>
                          <View style={{width:'90%'}}>
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("AddProfiles", {title:"Add Current City"})}}>
                              <Text style={{fontSize:18}}>Add current city</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                    </View>
                  }
                </View>

                {/* Home town*/}
                <View style={{paddingBottom:10}}>
                  {
                    homeTown.length?
                      <View style={{flexDirection:'row',}}>
                        <View style={{width:'10%'}}>
                          <Feather name="map-pin" color="black" size={25} ></Feather>
                        </View>
                        <View style={{width:'90%'}}>
                          {
                            <Text style={{fontSize:18}}>From <Text style={{fontWeight:'bold'}}>{homeTown.home_town}</Text></Text>
                          }
                        </View>
                    </View>:
                    <View>
                      <View style={{flexDirection:'row',}}>
                          <View style={{width:'10%'}}>
                            <Feather name="map-pin" color="black" size={25} ></Feather>
                          </View>
                          <View style={{width:'90%'}}>
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("AddProfiles", {title:"Add Home Town"})}}>
                              <Text style={{fontSize:18}}>Add home town</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                    </View>
                  }
                </View>

                 {/* relationship status*/}
                 <View style={{paddingBottom:10}}>
                  {
                    this.state.home_town?
                      <View style={{flexDirection:'row',}}>
                        <View style={{width:'10%'}}>
                          <Feather name="heart" color="black" size={25} ></Feather>
                        </View>
                        <View style={{width:'90%'}}>
                          {
                            <Text style={{fontSize:18}}>Relationship Status <Text style={{fontWeight:'bold'}}>{this.state.relationship_status}</Text></Text>
                          }
                        </View>
                    </View>:
                    <View>
                      <View style={{flexDirection:'row',}}>
                          <View style={{width:'10%'}}>
                            <Feather name="heart" color="black" size={25} ></Feather>
                          </View>
                          <View style={{width:'90%'}}>
                              <Text style={{fontSize:18}}>Add Relationship Status</Text>
                          </View>
                        </View>
                    </View>
                  }
                </View>
                <TouchableOpacity style={{width:"100%", height:30, borderRadius:5, backgroundColor:"rgba(0,0,0, 0.1)", flexDirection:"row", alignItems:'center', justifyContent:'center'}}>
                  <Feather name="edit-3" size={20} color="blue" />
                  <Text style={{color:"blue", marginLeft:10}}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
              

              {/* photos container */}
              <View style={{width:"100%", marginTop:20, paddingTop:10, borderTopWidth:1,borderBottomWidth:1,borderColor:"gray"}}>
                {
                  this.state.photos.length?
                  <View >
                    <FlatList
                        data={this.state.photos}
                        renderItem={({ item }) => 
                        <View style={{width:"33.3%"}}>
                          <View style={{width:"90%",}}>
                            <Image source={require('../../images/images22.jpg')} style={{height:100, width:"100%",marginTop:10, borderRadius:10, marginLeft:3 }}  />
                          </View>
                          <View style={{width:"100%"}}>
                            <Text style={{fontSize:18, marginLeft:6}}>{item.name}</Text>
                          </View>
                      </View>
                        }
                        keyExtractor={item => item.id}
                        numColumns={3}
                      />
                  </View>:
                  <View style={{borderTopWidth:1,borderBottomWidth:1, alignItems:'center', borderColor:"gray", width:"100%", justifyContent:"space-between", marginBottom:20, flexDirection:"row", height:80,}}>
                    <Text style={{fontSize:18, fontWeight:"bold"}}>Photos</Text>
                    <TouchableOpacity>
                      <Text style={{fontSize:18, fontWeight:"bold", color:"blue"}}>Add Photos</Text>
                    </TouchableOpacity>
                  </View>
                }
                {
                  this.state.photos.length?
                  <TouchableOpacity style={{width:"100%", marginBottom:20, height:30, backgroundColor:"rgba(0,0,0, 0.2)", alignItems:"center", justifyContent:"center", borderRadius:5,}}>
                    <Text>see all photos</Text>
                  </TouchableOpacity>:
                  <View></View>
                }
              </View>

              {/* friends container */}
              <View style={{width:"100%", paddingTop:10, borderBottomWidth:1,borderColor:"gray"}}>
                {
                  this.state.friends.length?
                  <View>
                    <FlatList
                        data={this.state.friends}
                        renderItem={({ item }) => 
                          <View style={{width:"33.3%"}}>
                              <View style={{width:"90%",}}>
                                <Image source={require('../../images/images22.jpg')} style={{height:100, width:"100%",marginTop:10, borderRadius:10, marginLeft:3 }}  />
                              </View>
                              <View style={{width:"100%"}}>
                                <Text style={{fontSize:18, marginLeft:6}}>{item.name}</Text>
                              </View>
                          </View>
                        }
                        keyExtractor={item => item.id}
                        numColumns={3}
                      />
                  </View>:
                  <View style={{ alignItems:'center',  width:"100%", justifyContent:"space-between", marginBottom:20, flexDirection:"row",}}>
                    <Text style={{fontSize:18, fontWeight:"bold"}}>Friends</Text>
                    <TouchableOpacity>
                      <Text style={{fontSize:18, fontWeight:"bold", color:"blue"}}>Find Friends</Text>
                    </TouchableOpacity>
                  </View>
                }
                {
                  this.state.friends.length?
                  <TouchableOpacity style={{width:"100%",marginBottom:20, marginTop:10, height:30, backgroundColor:"rgba(0,0,0, 0.2)", alignItems:"center", justifyContent:"center", borderRadius:5,}}>
                    <Text>see all friends</Text>
                  </TouchableOpacity>:
                  <View></View>
                }
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
                    <TouchableOpacity onPress={this.uploadCover} style={{width:"70%", height:50, backgroundColor: "white", color: "#8721FD", fontSize: 17, borderRadius:10, alignItems:'center', justifyContent:'center', flexDirection:'row'}}><Image style={{height:20, width:20}} source={require("../../images/Gallery.png")} /><Text style={{fontSize:16, marginLeft:10}}>Gallery</Text></TouchableOpacity>
                    <Text style={{ fontSize:16,fontFamily:'Montserrat-Regular',textAlign:"center",color:"#FFFFFF"}}>OR</Text>
                    <TouchableOpacity style={{width:"70%", height:45, borderWidth:2, borderColor:'white', fontSize: 17, borderRadius:10, alignItems:'center', justifyContent:'center', flexDirection:'row'}}><Image  style={{height:20, width:20}} source={require("../../images/Camera_white.png")} /><Text style={{fontSize:16, marginLeft:10, color:"white"}}>Camera</Text></TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <Modal
                visible={this.state.showModal2}
                onRequestClose={this.toggleModal2}
                transparent>
                <View style={{ height, width }} >
                  <TouchableOpacity activeOpacity={1} onPress={this.toggleModal2} style={{ height: "50%", backgroundColor: "rgba(255,255,255,0.9)", width: "100%" }} >
                  </TouchableOpacity>
                  <View style={{ height: "50%", backgroundColor: "#8721FD", width: "100%", borderTopRightRadius: 20, borderTopLeftRadius: 20, justifyContent: "space-evenly", alignItems: "center", paddingHorizontal: 10 }} >
                    <View style={{ height: 8, width: 45, backgroundColor: "white", borderRadius: 8 }}></View>
                    <Text style={{ fontSize:18,fontFamily:'Montserrat-Regular',textAlign:"center",color:"#FFFFFF"}}>Choose From</Text>
                    <TouchableOpacity onPress={this.uploadProfile} style={{width:"70%", height:50, backgroundColor: "white", color: "#8721FD", fontSize: 17, borderRadius:10, alignItems:'center', justifyContent:'center', flexDirection:'row'}}><Image style={{height:20, width:20}} source={require("../../images/Gallery.png")} /><Text style={{fontSize:16, marginLeft:10}}>Gallery</Text></TouchableOpacity>
                    <Text style={{ fontSize:16,fontFamily:'Montserrat-Regular',textAlign:"center",color:"#FFFFFF"}}>ORs</Text>
                    <TouchableOpacity style={{width:"70%", height:45, borderWidth:2, borderColor:'white', fontSize: 17, borderRadius:10, alignItems:'center', justifyContent:'center', flexDirection:'row'}}><Image  style={{height:20, width:20}} source={require("../../images/Camera_white.png")} /><Text style={{fontSize:16, marginLeft:10, color:"white"}}>Camera</Text></TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <Modal
                visible={this.state.showModal3}
                onRequestClose={this.toggleModal3}
                transparent>
                <View style={{ height, width }} >
                  <TouchableOpacity activeOpacity={1} onPress={this.toggleModal3} style={{ height: "80%", width: "100%" }} >
                  </TouchableOpacity>
                  <View style={{ height: "20%", backgroundColor: "#f5f5f5", width: "100%", borderTopRightRadius: 20, borderTopLeftRadius: 20, justifyContent: "space-evenly", alignItems: "center", paddingHorizontal: 10, elevation:1 }} >
                    <View style={{height:30, width:"100%", flexDirection:'row',}}>
                      <Feather name="sidebar" size={25} color="gray" />
                      <TouchableOpacity onPress={()=>{
                          this.props.navigation.navigate("AddProfiles", {title:"Add High School"}),
                          this.setState({
                            showModal3:false
                          })
                        }} style={{ marginLeft:15, justifyContent:'center', width:'100%', height:30}}>
                        <Text style={{fontSize:16}}>Add high School</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{height:30, width:"100%", flexDirection:'row',}}>
                      <Feather name="layers" size={25} color="gray" />
                      <TouchableOpacity onPress={()=>{
                          this.props.navigation.navigate("AddProfiles", {title:"Add University"}),
                          this.setState({
                            showModal3:false
                          })
                        }} style={{ marginLeft:15, justifyContent:'center', width:'100%', height:30}}>
                        <Text style={{fontSize:16}}>Add University</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
          </View>
        }
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('map state', state)
  return {
    coverPicture:state.Profile.cover_picture_data,
    coverLoading:state.Profile.coverPicLoading,
    profilePicture:state.Profile.profile_picture_data,
    profileLoading:state.Profile.profilePicLoading,

    workPlace:state.Profile.work_place_data,
    schoolData:state.Profile.school_data,
    universityData:state.Profile.university_data,
    currentCity:state.Profile.current_city_data,
    homeTown:state.Profile.home_town_data

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    coverImage: payload => dispatch(ProfileActions.uploadCoverPicture(payload)),
    getCover:payload => dispatch({type:ProfileActions.GET_COVER_PICTURE}),
    profileImage:payload => dispatch(ProfileActions.uploadProfilePicture(payload)),
    getProfile:payload => dispatch({type:ProfileActions.GET_PROFILE_PICTURE}),

    getWorkPlace:payload => dispatch({type:ProfileActions.GET_WORK_PLACE}),
    getSchool:payload => dispatch({type:ProfileActions.GET_SCHOOL}),
    getUniversity:payload => dispatch({type:ProfileActions.GET_UNIVERSITY}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)