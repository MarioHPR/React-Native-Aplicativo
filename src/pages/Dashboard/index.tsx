import React, { useCallback, useEffect, useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useAuth } from '../../contexts/auth';
import { Appbar } from 'react-native-paper';
import {AlergiaRestricao} from '../../models/AlergiaRestricao';
import alergiaRestricaoApi from '../../services/alergiaRestricaoApi';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const Dashboard: React.FC = () => {

    const [ listaInfos, setListaInfos ] = useState<AlergiaRestricao[]>([]);

    const { user, signOut } = useAuth();

    function handleSignOut() {
        signOut();
    }
    // const listagemAlergiasRestricoes = useCallback(() => {
    //     // alergiaRestricaoApi.get('api/restricoes/').then( resp => {
    //     //     if(resp.status === 200){
    //     //         console.log(resp)
    //     //     }
    //     // });
    // }, [alergiaRestricaoApi]);

    // useEffect(() => {
    //     listagemAlergiasRestricoes();
    // }, [])

    // const _handleMore = () => console.log('Shown more');
    return (
        <>
            <Appbar.Header >
                <Appbar.Content title="Alergias e restrições" color='white' />
            </Appbar.Header>
            <View style={styles.container}>
                <Text>{user}</Text>
                <Button title="Sign out" onPress={handleSignOut} />
            </View>
        </>
    )
};

export default Dashboard;