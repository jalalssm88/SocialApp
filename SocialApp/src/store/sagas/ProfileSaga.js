import { AuthActions } from "../actions/";
import HttpService from "../../common/agent";
import { put, call } from "redux-saga/effects";
import NavigationServices from "../../services/NavigationServices";
import { NavigationActions } from 'react-navigation'
import { AsyncStorage } from "react-native";

export function* uploadCoverPicture(action) {
    console.log('in profile saga', action)
    let { payload } = action;
  
    // let user = yield select(getUser);
    // let token = user.token;
    // let userId = user.userId;

    let formData = new FormData();
    formData.append("image[]",payload)
    // formData.append("current_time", moment().format("YYYY-MM-DD HH:MM:SS"))
    console.log('form data', formData)
    // const response = yield call(HttpService.postRequest, "users/profile-pic", { user_id: userId, access_token: token, "content-type": "application/json"},formData )
    // console.log("Add Profile Pic",response )
    // if(response && response.status == 200){
    //     yield put({ type: AuthActions.GET_IMAGE_SUCCESS, payload:{...payload,id:response.data.data.image_id}})
        
    // }
   
}