import { AuthActions } from "../actions/";
import HttpService from "../../common/agent";
import { put, call } from "redux-saga/effects";
import NavigationServices from "../../services/NavigationServices";
import { NavigationActions } from 'react-navigation'

import { AsyncStorage } from "react-native";
export function* signupUser(action) {
    let { payload } = action;
    console.log('payload in auth saga', payload)
    const response = yield call(HttpService.postRequest, "user/signup", {
        Accept: "application/json",
        'Content-Type': 'application/json'
    }, payload)
    console.log('response in auth saga', response)
 
    if (response) {
        yield put({ type: AuthActions.CREATE_USER_DATA_SUCESS, payload:response.data })
        NavigationServices.navigate("LoginScreen")

        // NavigationServices.reset("LoginScreen")
        // // this.props.navigation.navigate('LoginScreen')
        // dispatch(NavigationActions.navigate({ routeName: 'LoginScreen' }));
        // console.log('===============', dispatch(NavigationActions.navigate))
    }
   
}

export function* loginUser(action) {
    let { payload } = action;
    console.log('payload in auth saga', payload)
    const response = yield call(HttpService.postRequest, "user/login", {
        Accept: "application/json",
        'Content-Type': 'application/json'
    }, payload)
    console.log('response in auth saga aginst login', response)
 
    if (response.status == 200) {
        try{
            AsyncStorage.setItem("user", JSON.stringify(response.data))
        }catch{

        }
        yield put({ type: AuthActions.LOGIN_USER_DATA_SUCESS, payload:response.data})
        yield put({ type: AuthActions.VERIFY_CODE_SUCCESS, payload: response.data })
        NavigationServices.reset("TabStack")
    }
   
}