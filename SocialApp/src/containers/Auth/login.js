import React, { Component } from 'react';
import { Spinner } from 'native-base';
import {View, Text, Image, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';
import styles from './Style'
import { connect } from "react-redux";
import { AuthActions } from '../../store/actions/';
import { showToast } from '../../config/utils'
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
        AsyncStorage.getItem("user").then((user) => {
            if (user) {
              let parsedData = JSON.parse(user);
              this.props.logins(parsedData)
              NavigationServices.reset("TabStack")
            }else{
                this.setState({
                    loader:false
                })
            }
        })
    }

    login = () => {
      let {email, password} = this.state
      if (email && password) {
        let reg = /^\w+([\.-]?\w+)*@{1}\w+([\.-]?\w+)*(\.[a-zA-Z]{2,3})+$/;
        if (reg.test(email)) {
          this.props.loginUserData({email:email, password:password})
        }else {
          showToast("Email is invalid")
        }
      }else {
        showToast("All fields are required")
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
      const {isLoading} = this.props
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
              {
                isLoading?<Spinner color="white" />:
                <Text style={{color:"white"}}>Login</Text>
              }
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
  return {
    isLoading:state.Auth.loginLoading,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loginUserData: payload => dispatch(AuthActions.loginUserData(payload)),
    logins:payload => dispatch( {type: AuthActions.VERIFY_CODE_SUCCESS, payload})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);