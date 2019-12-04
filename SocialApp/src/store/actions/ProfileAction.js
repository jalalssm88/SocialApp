export default class Action {
    // Add cover picture
    static UPLOAD_COVER_PICTURE = "UPLOAD_COVER_PICTURE"
    static UPLOAD_COVER_PICTURE_SUCCESS = "UPLOAD_COVER_PICTURE_SUCCESS";
    static GET_COVER_PICTURE = "GET_COVER_PICTURE"
    static GET_COVER_PICTURE_SUCCESS = "GET_COVER_PICTURE_SUCCESS";
 
    // Add profile picture
    static UPLOAD_PROFILE_PICTURE = "UPLOAD_PROFILE_PICTURE"
    static UPLOAD_PROFILE_PICTURE_SUCCESS = "UPLOAD_PROFILE_PICTURE_SUCCESS";
    static GET_PROFILE_PICTURE = "GET_PROFILE_PICTURE"
    static GET_PROFILE_PICTURE_SUCCESS = "GET_PROFILE_PICTURE_SUCCESS";

    // Add work place
    static ADD_WORK_PLACE = "ADD_WORK_PLACE"
    static ADD_WORK_PLACE_SUCCESS = "ADD_WORK_PLACE_SUCCESS"
    static GET_WORK_PLACE = "GET_WORK_PLACE"
    static GET_WORK_PLACE_SUCCESS = "GET_WORK_PLACE_SUCCESS"



    // upload cover picture
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

    // upload profile picture
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

    // add work place
    static addWorkPlace(payload) {
        return {
            type: Action.ADD_WORK_PLACE,
            payload
        };
    }
    static getWorkPlace(payload) {
        return {
            type: Action.GET_WORK_PLACE,
            payload
        };
    }

}