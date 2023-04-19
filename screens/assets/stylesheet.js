import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    box:{
        backgroundColor: '#ffffff',
        margin: 5,
        borderRadius: 10,
        borderWidth: 5,
        borderColor: '#000000',
    },
    title:{
        color: '#ffffff'
    },
    text:{
        color: '#000000',
        margin: 15,
        fontSize: 22,
    },
    textInput:{
        color: '#000000',
        margin: 15,
        fontSize: 22,
        placeholderTextColor: 'gray',
        borderRadius:10,
        borderColor: '#000000',
        borderWidth:2,
        paddingLeft:10,
    },
    view:{
        marginTop: 45,
        padding: 5, 
        flex: 1, 
        justifyContent: 'flex-start'
    },
    viewHome:{
        padding: 5, 
        flex: 1, 
        justifyContent: 'flex-start',
    },
    optionsPanelContacts: {
        position: 'absolute',
        backgroundColor: '#e7e8e9',
        height: 120,
        width: 200,
        right: 0, //-210,
        top: 140,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
    },
    cartBtn:{ 
        borderRadius: 5,
        backgroundColor:'#f4717f',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 5,
        marginHorizontal:5,
        marginBottom:10,
        position: 'absolute',
        width:81,
        height:50,
        activecity: 0.5,
        borderWidth:1,
        borderColor:'#000000',

    },
    cartBtnText:{ 
        color: '#000000',
        margin: 10,
        fontSize: 20,
    },
    menuDisp:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        
    },
    menuText:{
        color: '#000000',
        margin: 10,
        fontSize: 20,
        flex:8,
    },
    cartAddBtn:{
        //backgroundColor: '#f4717f',
        margin: 5,
        borderRadius: 5,
        borderWidth:1,
        borderColor:'#000000',
        alignItems: 'center',
        flex:1,

    },
    cartAddBtnText:{
        color: '#000000',
        marginHorizontal:10,
        marginBottom: 5,
        fontSize: 20,
    },
    cartLogo:{
        marginHorizontal:5,
        marginTop:5,
        height: '80%',
        width: undefined,
        aspectRatio: 1,
    },
    menuTextDesc:{
        color: '#544e50',
        fontSize: 10,
        marginTop: -5,
        marginHorizontal: 11,
    },
    
})

export default styles;