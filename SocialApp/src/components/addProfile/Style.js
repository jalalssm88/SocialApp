import { StyleSheet, Dimensions } from 'react-native'
const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    inputViewIcon: {
        flexDirection: 'row',
        height: 50,
        width: '100%',
        borderRadius: 5,
        backgroundColor: '#F3F3F3',
        borderWidth: 1,
        borderColor: '#8721FD66', paddingHorizontal: 10,
        marginBottom: 8
    },
    imageIconStyle: {
        marginTop:10,
        height: 30,
        width: 30,
        // top: 5,
        position:"absolute",
        left:320,
        top:0
    },
    toggleButtonContainer:{
        width: 50,
        height: 22,
        borderRadius: 25,
        backgroundColor: '#ccc',
        padding: 5,
        // borderColor:'blue',
        // borderWidth:1,
    
    },
    toggleButtonCircle:{
        width: 15,
        height: 15,
        borderRadius: 19,
        backgroundColor: 'white', // rgb(102,134,205)
    },
})