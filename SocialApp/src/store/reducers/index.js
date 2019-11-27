import { combineReducers } from 'redux';

// imports: Reducers
import AuthReducer from "./AuthReducer";
import ProfileReducer from './ProfileReducer'

// Redux: Root Reducer
const rootReducer = combineReducers({
    //reducers will go here
    Auth: AuthReducer,
    Profile: ProfileReducer
});

// exports
export default rootReducer;