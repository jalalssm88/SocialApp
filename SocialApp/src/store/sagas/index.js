// Imports: Dependencies
import { all, takeEvery } from 'redux-saga/effects';

// Imports: Redux Sagas
import { signupUser, loginUser } from "./AuthSaga";
import { AuthActions } from '../actions/';


// Redux Saga: Root Saga
export function* rootSaga() {
    yield all([
        //sagas will go here
        takeEvery(AuthActions.CREATE_USER_DATA, signupUser),
        takeEvery(AuthActions.LOGIN_USER_DATA, loginUser),

    ]);
};