import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    listBox: {        
        width: '95%',
        borderBottomWidth: .3,
        alignSelf:'center',
        paddingLeft:10
    },
    listText:{
        paddingVertical:10,
        fontSize:15,
    },
    modal : {
        width : '80%',
        height : 350,
        alignItems:'center',
        borderRadius:5
    },
    modalHeading : {
        fontSize : 20,
        fontWeight : 'bold',
        marginVertical : 10
    },
    noEmpView:{
        flex:1 , 
        justifyContent:'center',
        alignItems:'center'
    },
    noEmpText:{
        fontSize:15,
        textAlign:'center'
    },
    input:{
        fontSize: 15,
        paddingLeft : 20
    },
    noInternet:{
        color:'#fff',
        paddingVertical : 5,
        fontSize:15
    },
    noInternetView:{
        backgroundColor:'red',
        position: 'absolute',
        bottom:0,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
                                  
    },
    floatingButton:{
            backgroundColor: 'blue',
            width: 80,
            height: 80,
            borderRadius: 80 / 2,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            bottom: 50,
            right: 20,
            elevation : 3,
            shadowOffset:{width : 1 , height : 1},
            shadowColor:'#000',
            shadowOpacity:0.5,
            shadowRadius:3
    },
    closeModalBtn:{
        position: 'absolute',
        right: 10,
        top: 10
    },
    saveBtn:{
        width: '85%',
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        marginTop: 25
    }
})


export default styles;