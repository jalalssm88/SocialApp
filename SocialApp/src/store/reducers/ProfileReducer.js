import { AuthActions, ProfileActions } from "../actions/";

const INITIAL_STATE = {
    coverPicLoading:false,
    cover_picture_data:{},

    profilePicLoading:false,
    profile_picture_data:{},

    work_place_data:[],
    school_data:[],
    university_data:[],
    home_town_data:{},
    current_city_data:{},

    upload_images_data:{},
    uploadImageLoading:false


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

         // current city cases
         case ProfileActions.GET_CURRENT_CITY_SUCCESS:
            return{
                ...state, current_city_data:action.payload
            }
         // home town cases
         case ProfileActions.GET_HOME_TOWN_SUCCESS:
            return{
                ...state, home_town_data:action.payload
            }
        case ProfileActions.GET_IMAGES:
            return{
                ...state, uploadImageLoading:true
            }

        case ProfileActions.GET_IMAGES_SUCCESS:
            return{
                ...state, upload_images_data:action.payload, uploadImageLoading:false
            }

        default:
            return state;
    }
}

export default Reducer;