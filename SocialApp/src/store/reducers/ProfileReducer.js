import { AuthActions, ProfileActions } from "../actions/";

const INITIAL_STATE = {
    isLoading:false,
    cover_picture_data:{}

};

function Reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
       
        case ProfileActions.GET_COVER_PICTURE:
            return{
                ...state, isLoading:true
            }
        case ProfileActions.GET_COVER_PICTURE_SUCCESS:
            return { 
                ...state, cover_picture_data:action.payload, isLoading:false 
            }
    
        default:
            return state;
    }
}

export default Reducer;