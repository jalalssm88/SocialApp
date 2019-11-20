import React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer} from "react-navigation";
import TabStack from './TabStack';
import AuthStack from './AuthStack';
import {View, Text} from 'react-native'

const MainStack = createStackNavigator({
    ...AuthStack,
    TabStack:{screen:TabStack,navigationOptions:{
        header:<View style={{width:'100%', height:50, backgroundColor:'blue', alignItems:'center', justifyContent:'center'}}>
            <Text style={{color:'white'}}>Header</Text>
        </View>
    }}
},{
    // headerMode: "none",
    // initialRouteName: "TabStack"
})

export default createAppContainer(MainStack)