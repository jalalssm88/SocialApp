import { AuthActions } from "../actions/";

const INITIAL_STATE = {
    signupLoading:false,
    loginLoading:false,
    currentUser:{}
};

function Reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case AuthActions.CREATE_USER_DATA:
            return{
                ...state, signupLoading:true
            }
        case AuthActions.CREATE_USER_DATA_SUCESS:
            return{ 
                ...state, signupLoading:false 
            }
        case AuthActions.CREATE_USER_DATA_FAIL:
            return{
                ...state, signupLoading:false
            }

        case AuthActions.LOGIN_USER_DATA:
            return{
                ...state, loginLoading:true
            }
        case AuthActions.LOGIN_USER_DATA_SUCESS:
            return { 
                ...state, loginLoading:false
            };
        case AuthActions.LOGIN_USER_DATA_FAIL:
            return{
                ...state, loginLoading:false
            }
        case AuthActions.VERIFY_CODE_SUCCESS:
            return { ...state, currentUser:action.payload }
        default:
            return state;
    }
}

export default Reducer;