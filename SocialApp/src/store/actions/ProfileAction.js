export default class Action {
    //Constants
    static UPLOAD_COVER_PICTURE = "UPLOAD_COVER_PICTURE"
    static UPLOAD_COVER_PICTURE_SUCCESS = "UPLOAD_COVER_PICTURE_SUCCESS";

    static GET_COVER_PICTURE = "GET_COVER_PICTURE"
    static GET_COVER_PICTURE_SUCCESS = "GET_COVER_PICTURE_SUCCESS";
 
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
}