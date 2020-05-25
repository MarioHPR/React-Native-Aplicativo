import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Row } from 'react-native-table-component';

export default StyleSheet.create({
    tarja: {
        paddingTop: Constants.statusBarHeight,
    },
    container: {
        flex: 1,
        borderWidth:1,
        borderColor: 'black'
    },

    conteinerSecundario: {
        flex: 1,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#010418'
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    headerText: {
        fontSize: 15,
        color: '#737380'
    },

    headerTextBold: {
        fontWeight: 'bold'
    },

    title: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 16,
        marginTop: 48,
        color: '#B5C7F8',
        fontWeight:'bold'
    },

    tipoExamePropriedade: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingLeft: 30,
        borderRadius: 8,
        backgroundColor: '#2A2F58'
    },

    propriedade: {
        fontSize: 14,
        textAlign: 'center',
        color: '#F0F1F6',
        fontWeight: 'bold'
    },

    tipoExame: {
        marginTop: 4,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 2,
        borderRadius: 8,
        backgroundColor: '#151C2E'
    },

    exameTipo: {
        marginLeft: -15,
        width: 100,
        marginTop: 10,
        textAlign: 'center',
        fontSize: 15,
        marginBottom: 10,
        color: 'white'
    },

    exameQuant: {
        textAlign: 'center',
        fontSize: 15,
        color: 'white',
        marginLeft: 10,
    },

    detalhesBotao: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
        padding:5,
        marginLeft:6
    },

    detalhesBotaoText: {
        color: '#e02041',
        fontSize: 15,
        fontWeight:'bold'
    },
    containerBotoes: {
        flexDirection: 'row',
        marginRight: -20 
    }
});