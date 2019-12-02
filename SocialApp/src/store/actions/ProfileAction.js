export default class Action {
    // cover picture constraints
    static UPLOAD_COVER_PICTURE = "UPLOAD_COVER_PICTURE"
    static UPLOAD_COVER_PICTURE_SUCCESS = "UPLOAD_COVER_PICTURE_SUCCESS";
    static GET_COVER_PICTURE = "GET_COVER_PICTURE"
    static GET_COVER_PICTURE_SUCCESS = "GET_COVER_PICTURE_SUCCESS";
 
    // profile picture constraints
     static UPLOAD_PROFILE_PICTURE = "UPLOAD_PROFILE_PICTURE"
     static UPLOAD_PROFILE_PICTURE_SUCCESS = "UPLOAD_PROFILE_PICTURE_SUCCESS";
     static GET_PROFILE_PICTURE = "GET_PROFILE_PICTURE"
     static GET_PROFILE_PICTURE_SUCCESS = "GET_PROFILE_PICTURE_SUCCESS";
    //Actions
    static uploadCoverPicture(payload) {
        return {
            type: Action.UPLOAD_COVER_PICTURE,
            payload
        };
    }
    static getCoverPicture(payload) {
        return {
            type: Action.GET_COVER_PICTURE,
            payload
        };
    }

    static uploadProfilePicture(payload) {
        return {
            type: Action.UPLOAD_PROFILE_PICTURE,
            payload
        };
    }
    static getProfilePicture(payload) {
        return {
            type: Action.GET_PROFILE_PICTURE,
            payload
        };
    }
}