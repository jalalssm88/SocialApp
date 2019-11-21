import React, { Component } from 'react';
import { Spinner } from 'native-base';
import {View, Text, Image, TextInput, TouchableOpacity,Picker, StyleSheet} from 'react-native';
import styles from './Style'
import { connect } from "react-redux";
import { AuthActions } from '../../store/actions/';
import DatePicker from 'react-native-datepicker'
import moment from 'moment'
import RNPickerSelect from 'react-native-picker-select';


class SignupScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      first_name:'',
      last_name:'',
      email:'',
      password:'',
      gender:'',
      date_of_birth:''
    }
  }
  createUser = ()=>{
    this.props.createUserData(this.state)
  }

  render() {
    const {isLoading} = this.props
    console.log('isloading', isLoading)
    return (
      <View style={styles.formContainer}>
        <View style={{height:50}}></View>
        <TextInput
          style={styles.textInput}
          placeholder="First Name"
          onChangeText={(first_name) => this.setState({first_name})}
          value={this.state.first_name}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Last Name"
          onChangeText={(last_name) => this.setState({last_name})}
          value={this.state.last_name}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />
        <View style={styles.textInput}>
          <Picker style={styles.pickerStyle} selectedValue={this.state.gender} onValueChange={(gender) =>  this.setState({gender})} >  
              <Picker.Item label="Gender" value={null} />  
              <Picker.Item label="male" value="male" />  
              <Picker.Item label="female" value="female" />  
          </Picker>  
        </View>
        <View style={[styles.textInput, ]}>
              <DatePicker
                style={styles.inputStyle}
                date={this.state.date_of_birth}
                mode="date"
                maxDate={moment().format('YYYY-MM-DD')}
                showIcon={true}
                value={this.state.date_of_birth}
                placeholder="Date of Birth"
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
                      marginTop: 20,
                      borderTopWidth: 0
                    }
                  }
                }
                iconComponent={
                  <Image style={styles.imageIconStyle} source={require('../../images/Calendar.png')}></Image>
                }
                onDateChange={(date_of_birth) => { this.setState({ date_of_birth }) }}
              />
            </View>
        <TouchableOpacity onPress={this.createUser} style={styles.buttons}>
          <Text style={{color:"white"}}>Create</Text>
        </TouchableOpacity>
        <View>
          {
          
            isLoading?<Spinner color="red" />:<Text></Text>
          }
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('mapstattoprops in signup component', state)
  return {
    user:state.Auth.user,
    isLoading:state.Auth.isLoading
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createUserData: payload => dispatch(AuthActions.createUserData(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);