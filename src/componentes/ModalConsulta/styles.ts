import {  StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
        justifyContent: 'flex-start',
    },
    headerContainer: {
        height: 30,
        paddingBottom: 30,
        backgroundColor: '#999',
        color:'white',
        flex: 1,
        justifyContent: 'flex-start',
    },
    textoheader: {
        color:"white"
    }
    ,barraProgresso: {
        height: 10,
    },
    marginTop: {
        paddingTop: 80
    },
    h3: {
        textAlign: 'center',
        justifyContent: 'center'
    },
});

export default styles;