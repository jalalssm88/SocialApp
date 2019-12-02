import { Platform, ToastAndroid } from 'react-native'
import { Dimensions, StatusBar } from 'react-native';

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