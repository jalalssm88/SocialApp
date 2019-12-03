import React from "react";
import { Text, View } from 'react-native'
import {AddProfiles} from '../components/';
import { Icon } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';

//Profile Stack
const ProfileStack = {
    AddProfiles: {
        screen: AddProfiles,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },
}

export default ProfileStack
