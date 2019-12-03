import React, { Component } from 'react';
import { Spinner } from 'native-base';
import {View, Text, Image, AsyncStorage , FlatList, TouchableOpacity, TouchableWithoutFeedback, Modal, Dimensions, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
const { height, width } = Dimensions.get("window");
import { connect } from "react-redux";
import {ProfileActions} from '../../store/actions/'


class AddProfiles extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    render() {
        return(
            <View>
                <Text>add profile</Text>
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