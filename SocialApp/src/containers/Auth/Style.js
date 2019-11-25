import { StyleSheet, Dimensions } from 'react-native'
const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    landingContainer: {
        height:800, 
        width:'100%', 
        backgroundColor:'rgba(0,0,0,0.7)', 
        paddingHorizontal:20,
    },
    logoContainer:{
        width:'100%', 
        height:180, 
        alignItems:"center", 
        justifyContent:'center',
    },
    buttonsContainer:{
        width:'100%',
        height:300,
        justifyContent:'center',
        alignItems:'center',
    },
    buttons:{
        height:50,
        width:'100%',
        borderWidth:1,
        borderColor:'#FFFFFF',
        borderRadius:8,
        backgroundColor:'#2fc2ba',
        alignItems:'center',
        justifyContent:'center',
    },
   
    formContainer: {
        height:800, 
        width:'100%', 
        paddingHorizontal:20,
        paddingTop:15,
        borderRadius:10,
    },
    textInput:{
        height:50,
        borderWidth:1,
        borderColor:'#2fc2ba',
        borderRadius:8,
        paddingLeft:8,
        fontSize:18,
        marginBottom:30
    },
    android: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'blue',
    },
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
 
})