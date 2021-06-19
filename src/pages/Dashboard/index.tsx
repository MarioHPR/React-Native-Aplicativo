import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useAuth } from '../../contexts/auth';
import { Appbar } from 'react-native-paper';
import {AlergiaRestricao} from '../../models/AlergiaRestricao';
import AlergiaRestricaoApi from '../../services/alergiaRestricaoApi';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const Dashboard: React.FC = () => {

    const [ listaInfos, setListaInfos ] = useState<AlergiaRestricao[]>();

    const { user, signOut } = useAuth();
    function handleSignOut() {
        signOut();
    }

    async function listarRestricoes() {
        const api = new AlergiaRestricaoApi();
        await api.listar(user).then( resp => {
            if(resp.status === 200) {
                console.log(resp.data)
                setListaInfos(resp.data);
            }
        });
    }

    useEffect(() => {
        listarRestricoes()
    }, [])

    return (
        <>
            <Appbar.Header >
                <Appbar.Content title="Alergias e restrições" color='white' />
            </Appbar.Header>
            <View style={styles.container}>
                <Text>{user}</Text>
                <Button title="Sign out" onPress={handleSignOut} />
                {
                    listaInfos && listaInfos.map( item => (<Text key={item.id}>{item.descricao}</Text>))
                }
            </View>
        </>
    )
};

export default Dashboard;