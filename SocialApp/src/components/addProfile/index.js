import React, { Component } from 'react';
import { Spinner } from 'native-base';
import {View, Text, TextInput, Image, AsyncStorage , FlatList, TouchableOpacity, TouchableWithoutFeedback, Modal, Dimensions, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
const { height, width } = Dimensions.get("window");
import { connect } from "react-redux";
import {ProfileActions} from '../../store/actions/';
import DatePicker from 'react-native-datepicker';
import moment from 'moment'
import SwitchToggle from 'react-native-switch-toggle';
import styles from './Style'





class AddProfiles extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text_title:'',
            job_title:'',
            start_date:'',
            end_date:'',
            class_year:'',
            is_working:true,
            is_graduated:false,
        }
    }
    toggleHandler = ()=> {
        this.setState({
            is_working:!this.state.is_working,
            is_graduated:!this.state.is_graduated
        })
    }

    add_profiles = (type)=> {
        console.log('type', type)
        const {text_title, start_date, end_date, is_working, is_graduated, job_title, class_year} = this.state
        if(type == "Add work place"){
           this.props.addWorkPlace({work_place:text_title, start_date:start_date, end_date:end_date, is_working:is_working, job_title:job_title})
        }else if(type == "Add High School"){
            this.props.addSchool({school:text_title, class_year:class_year})
        }else if(type == "Add University"){
            this.props.addUniversity({university:text_title, start_date:start_date, end_date:end_date, is_graduated:is_graduated})
        }else if(type == "Add Current City"){
            console.log('i am here')
            this.props.addCurrentCity({current_city:text_title})
        }else if(type == "Add Home Town"){
            this.props.addHomeTown({home_town:text_title})
        }
    }

    render() {
        const {title} = this.props.navigation.state.params
        console.log('title', title)
        return(
            <View >
                <View style={{height:height-100}}>
                    {
                        title == "Add work place"?
                        <View>
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
                                            onChangeText={(text_title) => this.setState({text_title})}
                                            value={this.state.text_title}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={{width:"100%", height:50, paddingTop:5, borderBottomWidth:1, borderColor:"#c7c5c1"}}>
                                <View style={{marginHorizontal:15, flexDirection:'row',}}>
                                    <View style={{width:"80%"}}>
                                        <TextInput
                                            style={{fontSize:18}}
                                            placeholder="Job Title"
                                            onChangeText={(job_title) => this.setState({job_title})}
                                            value={this.state.job_title}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                        :
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
                                        onChangeText={(text_title) => this.setState({text_title})}
                                        value={this.state.text_title}
                                    />
                                </View>
                            </View>
                        </View>
                    }
                    
                    {
                        title == "Add University" || title == "Add work place"?
                        <View style={{width:"100%", height:50, paddingTop:10, borderBottomWidth:1, borderColor:"#c7c5c1"}}>
                            {
                                title == "Add University"?
                                <View style={{paddingHorizontal:15, flexDirection:'row', justifyContent:'space-between'}}>
                                    <Text style={{fontSize:18}}>Graduated</Text>
                                    <View style={{ width: '15%', }}>
                                        <SwitchToggle
                                            containerStyle={styles.toggleButtonContainer}
                                            circleStyle={styles.toggleButtonCircle}
                                            switchOn={this.state.is_graduated}
                                            backgroundColorOn='#82a4fa'
                                            circleColorOn='#202ae6'
                                            backgroundColorOff='gray'
                                            circleColorOff='#d6d6d6'
                                            onPress={this.toggleHandler}
                                        />
                                    </View>
                                </View>
                                :
                                <View style={{paddingHorizontal:15, flexDirection:'row', justifyContent:'space-between'}}>
                                    <Text style={{fontSize:18}}>Currently work here</Text>
                                    <View style={{ width: '15%', }}>
                                        <SwitchToggle
                                            containerStyle={styles.toggleButtonContainer}
                                            circleStyle={styles.toggleButtonCircle}
                                            switchOn={this.state.is_working}
                                            backgroundColorOn='#82a4fa'
                                            circleColorOn='#202ae6'
                                            backgroundColorOff='gray'
                                            circleColorOff='#d6d6d6'
                                            onPress={this.toggleHandler}
                                        />
                                    </View>
                                </View>
                            }
                        </View>:<View></View>
                    }
                    {
                        title == "Add Current City" || title == "Add Home Town"?<View></View>:
                        <View>
                            <View style={{width:"100%", height:60, paddingTop:10, borderBottomWidth:1, borderColor:"#c7c5c1"}}>
                                <View style={{paddingHorizontal:15, flexDirection:'row', justifyContent:'space-between'}}>
                                   {
                                       title == "Add High School"?
                                       <View>
                                        <DatePicker
                                            date={this.state.class_year}
                                            mode="date"
                                            maxDate={moment().format('YYYY-MM-DD')}
                                            showIcon={true}
                                            value={this.state.class_year}
                                            placeholder="Class year"
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
                                            onDateChange={(class_year) => { this.setState({ class_year }) }}
                                        />
                                    </View>:
                                         <View>
                                         <DatePicker
                                             date={this.state.start_date}
                                             mode="date"
                                             maxDate={moment().format('YYYY-MM-DD')}
                                             showIcon={true}
                                             value={this.state.start_date}
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
                                             onDateChange={(start_date) => { this.setState({ start_date }) }}
                                         />
                                     </View>
                                    
                                   }
                                </View>
                            </View>
                            <View  style={{height:70}}>
                                {
                                    this.state.is_working?<View></View>:
                                    <View style={{width:"100%", height:60, paddingTop:10, borderBottomWidth:1, borderColor:"#c7c5c1"}}>
                                        <View style={{paddingHorizontal:15, flexDirection:'row', justifyContent:'space-between'}}>
                                            <View>
                                                <DatePicker
                                                    date={this.state.end_date}
                                                    mode="date"
                                                    maxDate={moment().format('YYYY-MM-DD')}
                                                    showIcon={true}
                                                    value={this.state.end_date}
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
                                                    onDateChange={(end_date) => { this.setState({ end_date }) }}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                }
                            </View>
                        </View>
                    }
                </View>
                <View style={{height:40, paddingHorizontal:20}}>
                    <TouchableOpacity onPress={()=>{
                        this.add_profiles(title),
                        this.props.navigation.goBack(null);
                    }} style={{height:40, width:"100%", backgroundColor:"blue", borderRadius:5, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{color:"white"}}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
  return {
   
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addWorkPlace: payload => dispatch(ProfileActions.addWorkPlace(payload)),
    addSchool:payload => dispatch(ProfileActions.addSchool(payload)),
    addUniversity:payload => dispatch(ProfileActions.addUniversity(payload)),
    addCurrentCity:payload => dispatch(ProfileActions.addCurrentCity(payload)),
    addHomeTown:payload => dispatch(ProfileActions.addHomeTown(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProfiles)