import { AuthActions, ProfileActions } from "../actions/";

const INITIAL_STATE = {
    coverPicLoading:false,
    cover_picture_data:{},

    profilePicLoading:false,
    profile_picture_data:{}

};

function Reducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        // cover picture cases
        case ProfileActions.UPLOAD_COVER_PICTURE:
            return{
                ...state, coverPicLoading:true,
            }
        case ProfileActions.UPLOAD_COVER_PICTURE_SUCCESS:
            return{
                ...state, coverPicLoading:false
            }
        case ProfileActions.GET_COVER_PICTURE:
            return{
                ...state, coverPicLoading:true
            }
        case ProfileActions.GET_COVER_PICTURE_SUCCESS:
            return { 
                ...state, cover_picture_data:action.payload, coverPicLoading:false 
            }

        // profile picture cases
        case ProfileActions.UPLOAD_PROFILE_PICTURE:
            return{
                ...state, profilePicLoading:true,
            }
        case ProfileActions.UPLOAD_PROFILE_PICTURE_SUCCESS:
            return{
                ...state, profilePicLoading:false
            }
        case ProfileActions.GET_PROFILE_PICTURE:
            return{
                ...state, profilePicLoading:true
            }
        case ProfileActions.GET_PROFILE_PICTURE_SUCCESS:
            return { 
                ...state, profile_picture_data:action.payload, profilePicLoading:false 
            }

        default:
            return state;
    }
}

export default Reducer;