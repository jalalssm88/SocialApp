import { AuthActions } from "../actions/";

const INITIAL_STATE = {
    isLoading:false,
    user:[],
    currentUser:{}
};

function Reducer(state = INITIAL_STATE, action) {
    console.log('main action', action)
    switch (action.type) {
        case AuthActions.CREATE_USER_DATA:
            return{
                ...state, isLoading:true
            }
        case AuthActions.CREATE_USER_DATA_SUCESS:
            console.log('in reduxer', action)
            return { 
                ...state, user:action.payload, isLoading:false 
            }

        case AuthActions.LOGIN_USER_DATA:
            return{
                ...state,
            }
        case AuthActions.LOGIN_USER_DATA_SUCESS:
            return { 
                ...state, currentUser: action.payload,
            };
        default:
            return state;
    }
}

export default Reducer;