import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../../contexts/auth';
import { Appbar } from 'react-native-paper';
import {AlergiaRestricao} from '../../models/AlergiaRestricao';
import AlergiaRestricaoApi from '../../services/alergiaRestricaoApi';
import { Button } from 'react-native-elements';
import RowRestricao from '../../componentes/rowRestricao/rowRestricao';
import ModalRestricao from '../../componentes/ModalAlergiaRestricao/modalAlergiaRestricao';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon: {
        paddingRight: 10
    }
});

const Dashboard: React.FC = () => {

    const [ listaInfos, setListaInfos ] = useState<AlergiaRestricao[]>();
    const [ atualizar, setAtualizar ] = useState<boolean>(false);

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
        console.log("Entorue aquo ", atualizar)
        listarRestricoes()
    }, [atualizar])
    
    return (
        <>
            <Appbar.Header >
                <Appbar.Content title="Alergias e restrições" color='white' />
            </Appbar.Header>
            <View style={styles.container}>
                <Button title="Sign out" onPress={handleSignOut} />
                <ScrollView>
                {
                    listaInfos && listaInfos.map( item => ( <RowRestricao key={item.id} id={item.id} tipo={item.tipo} descricao={item.descricao} atualizar={atualizar} setAtualizar={setAtualizar}/> ))
                }
                </ScrollView>
                <ModalRestricao />
            </View>
        </>
    )
};

export default Dashboard;