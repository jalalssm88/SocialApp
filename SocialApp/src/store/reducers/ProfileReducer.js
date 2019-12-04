import { AuthActions, ProfileActions } from "../actions/";

const INITIAL_STATE = {
    coverPicLoading:false,
    cover_picture_data:{},

    profilePicLoading:false,
    profile_picture_data:{},

    work_place_data:[],
    school_data:[],
    university_data:[],

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

        // work place cases
        case ProfileActions.GET_WORK_PLACE_SUCCESS:
            return{
                ...state, work_place_data:action.payload,
            }

        // uschool cases
        case ProfileActions.GET_SCHOOL_SUCCESS:
            return{
                ...state, school_data:action.payload
            }
        
        // university cases
        case ProfileActions.GET_UNIVERSITY_SUCCESS:
            return{
                ...state, university_data:action.payload
            }

        default:
            return state;
    }
}

export default Reducer;