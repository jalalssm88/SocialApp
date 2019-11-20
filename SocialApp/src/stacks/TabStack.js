import React from "react";
import { Image, } from 'react-native';
import {HomeScreen} from '../containers/'
import Feather from 'react-native-vector-icons/Feather';
import { createBottomTabNavigator } from 'react-navigation-tabs';

const TabsStack = createBottomTabNavigator({
  HomeScreen: { screen: HomeScreen,
    navigationOptions : {
      tabBarLabel: 'Home',
      labeled: true,
      tabBarIcon: ({ tintColor }) => (
        <Feather style={{marginTop:8}} name='home' size={16} color={tintColor}></Feather>
      )
    }
  },
},
  {
    // initialRouteName: 'HomeScreen',
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor:'#000',
      labelStyle: {
        fontSize: 12,
        marginBottom:5
      },
      style: {
        backgroundColor: 'blue',
        borderTopRightRadius:1,
        borderTopLeftRadius:1
      },
      labelStyle:{
        fontSize:12
      }
    }
  }
)
export default TabsStack