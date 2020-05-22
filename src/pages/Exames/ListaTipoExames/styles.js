import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
        backgroundColor: '#fff'
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
        color: '#13131a',
        fontWeight:'bold'
    },

    tipoExamePropriedade: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingLeft: 30,
        borderRadius: 8,
        backgroundColor: '#95c1ee'
    },

    propriedade: {
        fontSize: 14,
        textAlign: 'center',
        color: '#41414d',
        fontWeight: 'bold'
    },

    tipoExame: {
        marginTop: 4,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 2,
        borderRadius: 8,
        backgroundColor: '#bcd4ed'
    },

    exameTipo: {
        marginLeft: -40,
        width: 100,
        marginTop: 10,
        textAlign: 'center',
        fontSize: 15,
        marginBottom: 10,
    },

    exameQuant: {
        marginLeft: -30,
        textAlign: 'center',
        fontSize: 15,
        color: '#737380',
    },

    detalhesBotao: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    detalhesBotaoText: {
        color: '#e02041',
        fontSize: 15,
        fontWeight:'bold'
    }
});