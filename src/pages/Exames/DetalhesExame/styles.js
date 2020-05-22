import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,

    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    tipoExame: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF'
    },
    propriedade: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold'
    },
    campoValor: {
        flex:1,
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },

    exameValor: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: '#737380'
    },

    contactBox: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16,
    },

    actions: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    action: {
        backgroundColor: '#e02041',
        borderRadius: 8,
        height: 50,
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    actionText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold'
    },
    exame: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF'
    },

    containerPropriedade: {
        paddingTop: 0,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    containerValor: {
        alignSelf: 'stretch',

        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'blue',
    },

    containert: {
        flex: 1,
        padding: 5,
        paddingTop: 3,
        backgroundColor: '#fff'
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 40,
        backgroundColor: '#f1f8ff'
    },
    text: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
        margin: 2,
        textAlign: 'center'
    },
    nome: {
        marginLeft: -40,
        fontWeight: 'bold',
        flexDirection: 'row',
        textAlign: 'center'
    },
    dataExame: {
        textAlign: 'center',
        marginLeft: -15,
    },
    detalhesBotao: {
        marginRight: -45,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    detalhesBotaoText: {
        color: '#e02041',
        fontSize: 15,
        fontWeight: 'bold'
    },
    
    parametros: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    boxUm:{
        flex: 1,
        width:150,
        marginBottom: 10,
    },
    boxDois: {
        flex: 1,
        width: 150,
        marginBottom: 10,
    },

    campoAtributo: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
        
    },

    containerTeste:{
        flexDirection: 'row', 
        
        alignItems: 'center',
    },
    containerT: {
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
    },
    label:{
        width: 70,
        color:'red'
    },

    dataWrapper: { marginTop: -1 },
});