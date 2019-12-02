import { AuthActions } from "../actions/";
import HttpService from "../../common/agent";
import { put, call } from "redux-saga/effects";
import NavigationServices from "../../services/NavigationServices";
import { showToast } from '../../config/utils'
import { NavigationActions } from 'react-navigation'

import { AsyncStorage } from "react-native";
export function* signupUser(action) {
    let { payload } = action;
    const response = yield call(HttpService.postRequest, "user/signup", {
        Accept: "application/json",
        'Content-Type': 'application/json'
    }, payload)
    console.log(response, "signup")
    if (response) {
        yield put({ type: AuthActions.CREATE_USER_DATA_SUCESS, payload:response.data })
        NavigationServices.navigate("LoginScreen")
    }else if(response == undefined){
        showToast("Somthing went wrong")
        yield put({ type: AuthActions.CREATE_USER_DATA_FAIL})

    }
   
}

export function* loginUser(action) {
    let { payload } = action;
    const response = yield call(HttpService.postRequest, "user/login", {
        Accept: "application/json",
        'Content-Type': 'application/json'
    }, payload)
    console.log(response, 'login')
    if (response && response.status == 200) {
        try{
            AsyncStorage.setItem("user", JSON.stringify(response.data))
        }catch{
        }
        yield put({ type: AuthActions.LOGIN_USER_DATA_SUCESS, payload:response.data})
        yield put({ type: AuthActions.VERIFY_CODE_SUCCESS, payload: response.data })
        NavigationServices.reset("TabStack")
    }else if(response == undefined){
        showToast("Something went Wrong")
        yield put({ type: AuthActions.LOGIN_USER_DATA_FAIL})
    }else if(response && response.status == 401){
        yield put({ type: AuthActions.LOGIN_USER_DATA_FAIL})
        showToast(response.data.message)
    }
   
}