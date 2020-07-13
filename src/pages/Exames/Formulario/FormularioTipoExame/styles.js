import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';

export default StyleSheet.create({
    tarja: {
        paddingTop: Constants.statusBarHeight,
    },

    container: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#010418'
    },

    conteinerSecundario: {
        flex: 1,
        paddingHorizontal: 24,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#010418'
        /*'#010418'*/
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#010418',
        paddingTop: 5
    },

    regForm: {
        alignSelf: 'stretch',
    },

    titulo: {
        fontSize: 24,
        color: '#fff',
        paddingBottom: 10,
        textAlign: 'center'
    },

    textInput: {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 30,
        color: '#fff',
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 1,
    },
    conteinerBt: {
        textAlign: 'center'
    },

    label: {
        color: '#81F7F3',
        fontSize: 20,
        textAlign: 'center',

        paddingTop: 10,
        paddingBottom: 5,

        borderTopWidth: 1,
        borderColor: 'white',
    },

    btData:{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
    },

    data: {
        width: 120,
        textAlign: 'center',
        padding: 2,
        fontSize: 22,
        color: 'white',

        marginLeft: 107,
        marginBottom: 1,

        borderColor: 'white',
        borderWidth: 2,

        borderTopLeftRadius: 5,
        borderBottomLeftRadius:5
    },

    calendario:{
        textAlign: 'center',
        width: 30,

        borderColor: 'white',
        borderRightWidth: 2,
        borderTopWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,

        fontSize: 28,
        marginBottom: 1,
        paddingTop: 2,
        color: "white"
    },
    conteinerInstituicao:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    btInstituicao:{
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        height: 40,
        width: 295
    },

    btAdd: {
        marginTop: 8,
        borderWidth:1,
        borderColor: "#2EFE64",
        borderRadius:10,
        padding: 4,
        paddingLeft: 8,
        color:"#2EFE64",
    },

    inputIOS: {
        fontSize: 18,
        textAlign: 'center',
        paddingVertical: 10,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        color: 'white',
        //paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        top: -7,
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: 'white',
        paddingRight: 30, // to ensure the text is never behind the icon
    }
});