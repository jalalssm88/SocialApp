import React, { Component } from 'react';
import { Spinner } from 'native-base';
import {View, Text, Image, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';
import styles from './Style'
import { connect } from "react-redux";
import { AuthActions } from '../../store/actions/';
import NavigationServices from "../../services/NavigationServices";


class LoginScreen extends React.Component {
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            loader:true
        }
        this.getUser();
    }

    getUser = () => {
      console.log('async storage', AsyncStorage.getItem('user'))
        AsyncStorage.getItem("user").then((user) => {
            if (user) {
              let parsedData = JSON.parse(user);
              console.log('parsed datatatatatatatatt', parsedData)
              this.props.logins(parsedData)
              NavigationServices.reset("TabStack")
            }else{
                this.setState({
                    loader:false
                })
            }
        })
    }

    login =()=>{
      if(this.state.email !=="" && this.state.password !==""){
        this.props.loginUserData({email:this.state.email, password:this.state.password})
      }
    }

    gotoSignup = () =>{
        this.props.navigation.navigate('SignupScreen')
        this.setState({
          email:'',
          password:'',
        })
    }

    render() {
      return (
        <React.Fragment>
          {
            this.state.loader?<View><Spinner color="red"/></View>:
          <View style={styles.formContainer}>
            <View style={[styles.logoContainer, {marginBottom:20, marginTop:10}]}>
              <Image resizeMode="center" source={(require('../../images/logo.png'))} style={{width:150, height:80}}/>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            />
          <TextInput
              style={styles.textInput}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
            />
            <TouchableOpacity onPress={this.login} style={styles.buttons}>
              <Text style={{color:"white"}}>Login</Text>
            </TouchableOpacity>
            <Text style={{marginTop:50, marginBottom:10}}>Dont have account? </Text>
            <TouchableOpacity onPress={this.gotoSignup} style={styles.buttons}>
              <Text style={{color:"white"}}>Create new</Text>
            </TouchableOpacity>
        </View>
          }
        </React.Fragment>
        
      );
    }
}

const mapStateToProps = (state) => {
  console.log('mapstattoprops in signup component', state)
  return {
    user:state.Auth.user,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loginUserData: payload => dispatch(AuthActions.loginUserData(payload)),
    logins:payload => dispatch( {type: AuthActions.VERIFY_CODE_SUCCESS, payload})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);