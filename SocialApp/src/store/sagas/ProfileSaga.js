import { ProfileActions } from "../actions/";
import HttpService from "../../common/agent";
import { put, call, select } from "redux-saga/effects";
import NavigationServices from "../../services/NavigationServices";
import { NavigationActions } from 'react-navigation'
import { AsyncStorage } from "react-native";

export const getUser = (state) => state.Auth.currentUser

// upload cover picture
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

// get cover picture
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

// upload profile picture
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

// get profile picture
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

//add work place
export function* addWorkPlace(action) {
    let user = yield select(getUser);
    let userId = user.userId;
    let token = user.token;
    let { payload } = action;
    console.log('payloaddd in saga', payload)
   
    const response = yield call(HttpService.postRequest, "work_place/add_work_place", { user_id: userId, access_token: token},{...payload} )
    console.log(response, "add work place")
    if(response && response.status == 200){
        yield put ({type :ProfileActions.GET_WORK_PLACE})
    }
}

// get work place
export function* getWorkPlace(action) {
    let user = yield select(getUser);
    let userId = user.userId;
    let token = user.token;
    const response = yield call(HttpService.getRequest, `work_place/get_work_place/${userId}`, { user_id: userId, access_token: token})
    console.log(response, "get work placee")
    if(response && response.status == 200){
        yield put({ type: ProfileActions.GET_WORK_PLACE_SUCCESS, payload:response.data})
    }
}

// add school
export function* addSchool(action){
    let user = yield select(getUser);
    let userId = user.userId;
    let token = user.token;
    let { payload } = action;
    console.log('payloaddd in saga', payload)
   
    const response = yield call(HttpService.postRequest, "school/add_school", { user_id: userId, access_token: token},{...payload} )
    console.log(response, "add school")
    if(response && response.status == 200){
        yield put ({type :ProfileActions.GET_SCHOOL})
    }
}

// get work place
export function* getSchool(action) {
    let user = yield select(getUser);
    let userId = user.userId;
    let token = user.token;
    const response = yield call(HttpService.getRequest, `school/get_school/${userId}`, { user_id: userId, access_token: token})
    console.log(response, "get school")
    if(response && response.status == 200){
        yield put({ type: ProfileActions.GET_SCHOOL_SUCCESS, payload:response.data})
    }
}

// add Univeristy
export function* addUniversity(action){
    let user = yield select(getUser);
    let userId = user.userId;
    let token = user.token;
    let { payload } = action;
    console.log('payloaddd in saga', payload)
   
    const response = yield call(HttpService.postRequest, "university/add_university", { user_id: userId, access_token: token},{...payload} )
    console.log(response, "add universty")
    if(response && response.status == 200){
        yield put ({type :ProfileActions.GET_UNIVERSITY})
    }
}

// get University
export function* getUniversity(action) {
    let user = yield select(getUser);
    let userId = user.userId;
    let token = user.token;
    const response = yield call(HttpService.getRequest, `university/get_university/${userId}`, { user_id: userId, access_token: token})
    console.log(response, "get universty")
    if(response && response.status == 200){
        yield put({ type: ProfileActions.GET_UNIVERSITY_SUCCESS, payload:response.data})
    }
}

// add current city
export function* addCurrentCity(action){
    let user = yield select(getUser);
    let userId = user.userId;
    let token = user.token;
    let { payload } = action;
    console.log('payloaddd in saga', payload)
   
    const response = yield call(HttpService.postRequest, "current_city/add_current_city", { user_id: userId, access_token: token},{...payload} )
    console.log(response, "add current city")
    if(response && response.status == 200){
        yield put ({type :ProfileActions.GET_CURRENT_CITY})
    }
}

// get get current city
export function* getCurrentCity(action) {
    let user = yield select(getUser);
    let userId = user.userId;
    let token = user.token;
    const response = yield call(HttpService.getRequest, `current_city/get_current_city/${userId}`, { user_id: userId, access_token: token})
    console.log(response, "get current city")
    if(response && response.status == 200){
        yield put({ type: ProfileActions.GET_CURRENT_CITY_SUCCESS, payload:response.data[0]})
    }
}

// add home town
export function* addHomeTown(action){
    let user = yield select(getUser);
    let userId = user.userId;
    let token = user.token;
    let { payload } = action;
    console.log('payloaddd in saga', payload)
   
    const response = yield call(HttpService.postRequest, "home_town/add_home_town", { user_id: userId, access_token: token},{...payload} )
    console.log(response, "add home town")
    if(response && response.status == 200){
        yield put ({type :ProfileActions.GET_HOME_TOWN})
    }
}

// get homw town
export function* getHomeTown(action) {
    let user = yield select(getUser);
    let userId = user.userId;
    let token = user.token;
    const response = yield call(HttpService.getRequest, `home_town/get_home_town/${userId}`, { user_id: userId, access_token: token})
    console.log(response, "get home town")
    if(response && response.status == 200){
        yield put({ type: ProfileActions.GET_HOME_TOWN_SUCCESS, payload:response.data[0]})
    }
}

//upload images
export function* uploadImages(action) {
    let user = yield select(getUser);
    let userId = user.userId;
    let token = user.token;
    let { payload } = action;
    let formData = new FormData();
    formData.append("fileData",payload)
    const response = yield call(HttpService.postRequest, "images/upload_images", { user_id: userId, access_token: token, "content-type": "multipart/form-data"},formData )
    console.log(response, "upload images")
    if(response && response.status == 200){
        yield put ({type :ProfileActions.GET_IMAGES})
        yield put ({type:ProfileActions.GET_ALL_IMAGES})
    }
}

// get imagess
export function* getImages(action) {
    let user = yield select(getUser);
    let userId = user.userId;
    let token = user.token;
    const response = yield call(HttpService.getRequest, `images/get_images/${userId}`, { user_id: userId, access_token: token, "content-type": "multipart/form-data"})
    console.log(response, "get images")
    if(response && response.status == 200){
        yield put({ type: ProfileActions.GET_IMAGES_SUCCESS, payload:response.data})
    }
}

// get all imagess
export function* getAllImages(action) {
    let {payload} = action
    let user = yield select(getUser);
    let userId = user.userId;
    let token = user.token;
    let new_user_id = ""
    if(payload == undefined){
        new_user_id = userId
    }else{
        new_user_id = payload
    }
    console.log('new idddddd', new_user_id)
    const response = yield call(HttpService.getRequest, `images/get_all_images/${new_user_id}`, { user_id: userId, access_token: token, "content-type": "multipart/form-data"})
    console.log(response, "get all images")
    if(response && response.status == 200){
        yield put({ type: ProfileActions.GET_ALL_IMAGES_SUCCESS, payload:response.data})
    }
}

// get users
export function* getUsers(action) {
    console.log('geting users in sagagagagaga')

    let {payload} = action
    let user = yield select(getUser);
    let userId = user.userId;
    let token = user.token;
    const response = yield call(HttpService.getRequest, `profile_pic/get_profile_picture`, { user_id: userId, access_token: token, "content-type": "multipart/form-data"})
    console.log(response, "get users")
    if(response && response.status == 200){
        yield put({ type: ProfileActions.GET_USERS_SUCCESS, payload:response.data})
    }
}


