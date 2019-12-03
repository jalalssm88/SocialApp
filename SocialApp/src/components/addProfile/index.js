import React, { Component } from 'react';
import { Spinner } from 'native-base';
import {View, Text, TextInput, Image, AsyncStorage , FlatList, TouchableOpacity, TouchableWithoutFeedback, Modal, Dimensions, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
const { height, width } = Dimensions.get("window");
import { connect } from "react-redux";
import {ProfileActions} from '../../store/actions/';
import DatePicker from 'react-native-datepicker';
import moment from 'moment'
import styles from '../../containers/Auth/Style'





class AddProfiles extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            toggle:true,
        }
    }
    toggleHandler = ()=>{
        this.setState({
            toggle:!this.state.toggle
        })
    }
    render() {
        const {title} = this.props.navigation.state.params
        console.log('title', title)
        return(
            <View style={{height:height}}>
                <View style={{width:"100%", height:65, paddingTop:5, borderBottomWidth:1, borderColor:"#c7c5c1"}}>
                    <View style={{marginHorizontal:15, flexDirection:'row',}}>
                        <View style={{width:"20%"}}>
                            <View style={{width:50, height:50, borderRadius:50, backgroundColor:"#d1d1d1", alignItems:'center', justifyContent:'center'}}>
                                <Feather name="home" size={20} color="gray" />
                            </View>
                        </View>
                        <View style={{width:"80%"}}>
                            <TextInput
                                style={{fontSize:18}}
                                placeholder={title}
                                onChangeText={(email) => this.setState({email})}
                                value={this.state.email}
                            />
                        </View>
                    </View>
                </View>
                <View style={{width:"100%", height:50, paddingTop:10, borderBottomWidth:1, borderColor:"#c7c5c1"}}>
                    <View style={{paddingHorizontal:15, flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontSize:18}}>Currently work here</Text>
                        <TouchableOpacity onPress={this.toggleHandler}>
                            {
                                this.state.toggle?
                                <Text>yes</Text>:
                                <Text>no</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{width:"100%", height:60, paddingTop:10, borderBottomWidth:1, borderColor:"#c7c5c1"}}>
                    <View style={{paddingHorizontal:15, flexDirection:'row', justifyContent:'space-between'}}>
                        <View>
                            <DatePicker
                                date={this.state.date_of_birth}
                                mode="date"
                                maxDate={moment().format('YYYY-MM-DD')}
                                showIcon={true}
                                value={this.state.date_of_birth}
                                placeholder="Start date"
                                format='YYYY-MM-DD'
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                allowFontScaling={false}
                                customStyles={
                                {
                                    dateInput: {
                                    borderWidth: 0,
                                    alignItems: "flex-start",
                                    paddingLeft: 5,
                                    width: "80%",
                                    },
                                    placeholderText: {
                                    fontSize: 14,
                                    color: "#3F3F41",
                                    fontFamily:'Montserrat-Regular',
                                    },
                                    dateText: {
                                    fontSize: 14,
                                    color: "#3F3F41",
                                    fontFamily:"Montserrat-Regular",

                                    },
                                    datePicker: {
                                    marginTop: 10,
                                    borderTopWidth: 0
                                    }
                                }
                                }
                                iconComponent={
                                <Feather name="calendar" size={25} style={[styles.imageIconStyle, {left:350, bottom:5}]}></Feather>
                                }
                                onDateChange={(date_of_birth) => { this.setState({ date_of_birth }) }}
                            />
                        </View>
                    </View>
                </View>
                <View  style={{height:70}}>
                {
                    this.state.toggle?<View></View>:
                    <View style={{width:"100%", height:60, paddingTop:10, borderBottomWidth:1, borderColor:"#c7c5c1"}}>
                        <View style={{paddingHorizontal:15, flexDirection:'row', justifyContent:'space-between'}}>
                            <View>
                                <DatePicker
                                    date={this.state.date_of_birth}
                                    mode="date"
                                    maxDate={moment().format('YYYY-MM-DD')}
                                    showIcon={true}
                                    value={this.state.date_of_birth}
                                    placeholder="End date"
                                    format='YYYY-MM-DD'
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    allowFontScaling={false}
                                    customStyles={
                                    {
                                        dateInput: {
                                        borderWidth: 0,
                                        alignItems: "flex-start",
                                        paddingLeft: 5,
                                        width: "80%",
                                        },
                                        placeholderText: {
                                        fontSize: 14,
                                        color: "#3F3F41",
                                        fontFamily:'Montserrat-Regular',
                                        },
                                        dateText: {
                                        fontSize: 14,
                                        color: "#3F3F41",
                                        fontFamily:"Montserrat-Regular",

                                        },
                                        datePicker: {
                                        marginTop: 10,
                                        borderTopWidth: 0
                                        }
                                    }
                                    }
                                    iconComponent={
                                    <Feather name="calendar" size={25} style={[styles.imageIconStyle, {left:350, bottom:5}]}></Feather>
                                    }
                                    onDateChange={(date_of_birth) => { this.setState({ date_of_birth }) }}
                                />
                            </View>
                        </View>
                    </View>
                }
                </View>
                <View style={{paddingHorizontal:20}}>
                    <TouchableOpacity style={{height:40, width:"100%", backgroundColor:"blue", borderRadius:5, alignItems:'center', justifyContent:'center',marginTop:height-350}}>
                        <Text style={{color:"white"}}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

// const mapStateToProps = (state) => {
//   return {
//     coverPicture:state.Profile.cover_picture_data,
//     coverLoading:state.Profile.coverPicLoading,
//     profilePicture:state.Profile.profile_picture_data,
//     profileLoading:state.Profile.profilePicLoading
//   }
// }
// const mapDispatchToProps = (dispatch) => {
//   return {
//     coverImage: payload => dispatch(ProfileActions.uploadCoverPicture(payload)),
//     getCover:payload => dispatch({type:ProfileActions.GET_COVER_PICTURE}),
//     profileImage:payload => dispatch(ProfileActions.uploadProfilePicture(payload)),
//     getProfile:payload => dispatch({type:ProfileActions.GET_PROFILE_PICTURE})
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(AddProfiles)

export default AddProfiles;