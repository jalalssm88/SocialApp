// Imports: Dependencies
import { all, takeEvery } from 'redux-saga/effects';

// Imports: Redux Sagas
import { signupUser, loginUser } from "./AuthSaga";
import { uploadCoverPicture, getCoverPicture} from './ProfileSaga';
import { AuthActions, ProfileActions } from '../actions/';


// Redux Saga: Root Saga
export function* rootSaga() {
    yield all([
        //sagas will go here
        takeEvery(AuthActions.CREATE_USER_DATA, signupUser),
        takeEvery(AuthActions.LOGIN_USER_DATA, loginUser),
        takeEvery(ProfileActions.UPLOAD_COVER_PICTURE, uploadCoverPicture),
        takeEvery(ProfileActions.GET_COVER_PICTURE, getCoverPicture)

    ]);
};