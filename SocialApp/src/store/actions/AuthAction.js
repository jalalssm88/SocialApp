export default class Action {

    //Constants
    static CREATE_USER_DATA = "CREATE_USER_DATA"
    static CREATE_USER_DATA_SUCESS = "CREATE_USER_DATA_SUCESS";
    static CREATE_USER_DATA_FAIL = "CREATE_USER_DATA_FAIL";
    static VERIFY_CODE_SUCCESS = "VERIFY_CODE_SUCCESS";
 
    static LOGIN_USER_DATA = "LOGIN_USER_DATA"
    static LOGIN_USER_DATA_SUCESS = "LOGIN_USER_DATA_SUCESS";
    static LOGIN_USER_DATA_FAIL = "LOGIN_USER_DATA_FAIL";

    //Actions
    static createUserData(payload) {
        return {
            type: Action.CREATE_USER_DATA,
            payload
        };
    }

    static loginUserData(payload) {
        return {
            type: Action.LOGIN_USER_DATA,
            payload
        };
    }
}