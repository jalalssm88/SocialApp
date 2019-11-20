import { combineReducers } from 'redux';

// imports: Reducers
import AuthReducer from "./AuthReducer";

// Redux: Root Reducer
const rootReducer = combineReducers({
    //reducers will go here
    Auth: AuthReducer,
});

// exports
export default rootReducer;