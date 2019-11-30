import { Platform, ToastAndroid } from 'react-native'
import { Dimensions, StatusBar } from 'react-native';
import firebase from 'react-native-firebase';
const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
.setDescription('My apps test channel');

// Create the channel
firebase.notifications().android.createChannel(channel);
let toastRef = null;
export function getRef(ref) {
    toastRef = ref;
}

export function showToast(message) {
    if (!message)
        return
    if (Platform.OS == 'ios') {
        setTimeout(() => {
            toastRef.show(message);
        }, 100)
    }
    else {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }
}

export function createImageUrl(url) {
    let newUrl = url.replace("http", "https").split("\\")
    newUrl[1] = "//";
    newUrl = newUrl.join("")
    // newUrl = newUrl.replace(/ /g, '%');
    // console.log(encodeURI( newUrl))
    return newUrl;
}


const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const { height: W_HEIGHT, width: W_WIDTH } = Dimensions.get('window');

let isIPhoneX = false;

if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
    isIPhoneX = W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT || W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT;
}

export function getStatusBarHeight(skipAndroid) {
    return Platform.select({
        ios: isIPhoneX ? 44 : 20,
        android: skipAndroid ? 0 : StatusBar.currentHeight,
        default: 0
    })
}

export function isIphoneX() {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
    );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
    if (isIphoneX()) {
        return iphoneXStyle;
    }
    return regularStyle;
}
export function getBottomSpace() {
    return isIphoneX() ? 34 : 0;
}

export function getNotificationPermission() {
    return new Promise((res, rej) => {
        firebase.messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    // user has permissions
                    firebase.messaging().requestPermission()
                        .then(() => {
                            // User has authorised  
                            firebase.messaging().getToken()
                                .then(fcmToken => {
                                    if (fcmToken) {
                                        // user has a device token
                                        res(fcmToken)
                                    } else {
                                        res("")

                                        // user doesn't have a device token yet
                                    }
                                });
                        })
                        .catch(error => {
                            res("")
                            // User has rejected permissions  
                        });
                } else {
                    res("")
                    // user doesn't have permission
                }
            });
    })
}
export function notificationListener() {
    firebase.notifications().onNotification((notification) => {
        console.log(notification)
        notification.android.setChannelId("test-channel")
        notification.android.setSmallIcon('ic_launcher');
        notification.android.setLargeIcon("ic_launcher")
        firebase.notifications().displayNotification(notification)
        // Process your notification as required
    });
}
export function notificationOpenedListener() {
    irebase.notifications().getInitialNotification()
        .then((notificationOpen) => {
            if (notificationOpen) {
                // App was opened by a notification
                // Get the action triggered by the notification being opened
                // const action = notificationOpen.action;
                // // Get information about the notification that was opened
                // const notification: Notification = notificationOpen.notification;  
            }
        });
}
export function notificationTapped() {
    firebase.notifications().onNotificationOpened((notificationOpen) => {

    });
}


// navigate = () => {
//     let { full_name, email, gender, interests } = this.props.user_info;
//     if (full_name && email && gender && interests) {
//       let fullNameReg = /^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/;
//       let reg = /^\w+([\.-]?\w+)*@{1}\w+([\.-]?\w+)*(\.[a-zA-Z]{2,3})+$/;
//       if (fullNameReg.test(full_name)) {
//         if (reg.test(email)) {
//           let dataToSend = { ...this.props.user_info, fromUpdateProfile: true }
//           if (this.state.previousEmail == email) {
//             this.props.updateProfile(dataToSend)

//           }
//           else {

//             this.props.verifyEmail(dataToSend)
//           }
//         }
//         else {
//           showToast("Email is invalid")
//         }
//       }
//       else {
//         showToast("Full Name is invalid")
//       }
//     }
//     else {
//       showToast("All fields are required")
//     }

//   }