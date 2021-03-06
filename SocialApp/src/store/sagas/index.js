// Imports: Dependencies
import { all, takeEvery } from 'redux-saga/effects';

// Imports: Redux Sagas
import { signupUser, loginUser } from "./AuthSaga";
import { uploadCoverPicture, getCoverPicture, uploadProfilePicture, getProfilePicture, addWorkPlace, getWorkPlace,
    addSchool, getSchool, addUniversity, getUniversity, addCurrentCity, getCurrentCity, addHomeTown, getHomeTown,
    uploadImages, getImages, getAllImages, getUsers
} from './ProfileSaga';
import { AuthActions, ProfileActions } from '../actions/';


// Redux Saga: Root Saga
export function* rootSaga() {
    yield all([
        //sagas will go here
        takeEvery(AuthActions.CREATE_USER_DATA, signupUser),
        takeEvery(AuthActions.LOGIN_USER_DATA, loginUser),

        takeEvery(ProfileActions.UPLOAD_COVER_PICTURE, uploadCoverPicture),
        takeEvery(ProfileActions.GET_COVER_PICTURE, getCoverPicture),

        takeEvery(ProfileActions.UPLOAD_PROFILE_PICTURE, uploadProfilePicture),
        takeEvery(ProfileActions.GET_PROFILE_PICTURE, getProfilePicture),

        takeEvery(ProfileActions.ADD_WORK_PLACE, addWorkPlace),
        takeEvery(ProfileActions.GET_WORK_PLACE, getWorkPlace),

        takeEvery(ProfileActions.ADD_SCHOOL, addSchool),
        takeEvery(ProfileActions.GET_SCHOOL, getSchool),

        takeEvery(ProfileActions.ADD_UNIVERSITY, addUniversity),
        takeEvery(ProfileActions.GET_UNIVERSITY, getUniversity),

        takeEvery(ProfileActions.ADD_CURRENT_CITY, addCurrentCity),
        takeEvery(ProfileActions.GET_CURRENT_CITY, getCurrentCity),

        takeEvery(ProfileActions.ADD_HOME_TOWN, addHomeTown),
        takeEvery(ProfileActions.GET_HOME_TOWN, getHomeTown),

        takeEvery(ProfileActions.ADD_IMAGES, uploadImages),
        takeEvery(ProfileActions.GET_IMAGES, getImages),

        takeEvery(ProfileActions.GET_ALL_IMAGES, getAllImages),
        takeEvery(ProfileActions.GET_USERS, getUsers),



    ]);
};