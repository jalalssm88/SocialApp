import React from "react";
import {View, Text} from 'react-native'
import { LoginScreen, SignupScreen} from "../containers/";
import Feather from 'react-native-vector-icons/Feather';

//Auth Stack
const AuthStack = {
    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },
    SignupScreen: {
        screen: SignupScreen,
        navigationOptions: ({ navigation }) => ({
            header: <View style={{ width:'100%', height:50, flexDirection:'row'}}>
                        <View style={{width:'30%', justifyContent:'center', paddingLeft:10}}>
                            <Feather onPress={() => navigation.goBack(null)} name="arrow-left" color="black" size={20}></Feather>
                        </View>
                        <View style={{width:'40%', alignItems:'center', justifyContent:'center'}}>
                            <Text style={{fontSize:18}}>Sign up</Text>
                        </View>
                        <View style={{width:'30%'}}></View>
                    </View>
        }),
    },
}

export default AuthStack