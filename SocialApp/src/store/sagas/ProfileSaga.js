import { ProfileActions } from "../actions/";
import HttpService from "../../common/agent";
import { put, call, select } from "redux-saga/effects";
import NavigationServices from "../../services/NavigationServices";
import { NavigationActions } from 'react-navigation'
import { AsyncStorage } from "react-native";

export const getUser = (state) => state.Auth.currentUser

export function* uploadCoverPicture(action) {
    let user = yield select(getUser);
    let userId = user.userId;
    let token = user.token;
    let { payload } = action;
    let formData = new FormData();
    formData.append("fileData",payload)
    const response = yield call(HttpService.postRequest, "cover_pic/upload_cover_picture", { user_id: userId, access_token: token, "content-type": "multipart/form-data"},formData )
    console.log(response, "upload cover picture")
    if(response && response.status == 200){
        yield put ({type :ProfileActions.GET_COVER_PICTURE})
    }
}

export function* getCoverPicture(action) {
    let user = yield select(getUser);
    let userId = user.userId;
    let token = user.token;
    const response = yield call(HttpService.getRequest, `cover_pic/get_cover_picture/${userId}`, { user_id: userId, access_token: token, "content-type": "multipart/form-data"})
    console.log(response, "get cover picture")
    if(response && response.status == 200){
        yield put({ type: ProfileActions.GET_COVER_PICTURE_SUCCESS, payload:response.data})
    }
}

export function* uploadProfilePicture(action) {
    let user = yield select(getUser);
    let userId = user.userId;
    let token = user.token;
    let { payload } = action;
    let formData = new FormData();
    formData.append("fileData",payload)
    const response = yield call(HttpService.postRequest, "profile_pic/upload_profile_picture", { user_id: userId, access_token: token, "content-type": "multipart/form-data"},formData )
    console.log(response, "upload profile picture")
    if(response && response.status == 200){
        yield put ({type :ProfileActions.GET_PROFILE_PICTURE})
    }
}

export function* getProfilePicture(action) {
    let user = yield select(getUser);
    let userId = user.userId;
    let token = user.token;
    const response = yield call(HttpService.getRequest, `profile_pic/get_profile_picture/${userId}`, { user_id: userId, access_token: token, "content-type": "multipart/form-data"})
    console.log(response, "get profile picture")
    if(response && response.status == 200){
        yield put({ type: ProfileActions.GET_PROFILE_PICTURE_SUCCESS, payload:response.data})
    }
}

