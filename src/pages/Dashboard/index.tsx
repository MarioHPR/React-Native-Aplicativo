import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../../contexts/auth';
import { Appbar } from 'react-native-paper';
import {AlergiaRestricao} from '../../models/AlergiaRestricao';
import { Button } from 'react-native-elements';
import RowRestricao from '../../componentes/rowRestricao/rowRestricao';
import ModalRestricao from '../../componentes/ModalAlergiaRestricao/modalAlergiaRestricao';
import { translate } from '../../locales';
import { listar } from '../../controllers/alergiaRestricaoApi';

const styles = StyleSheet.create({
    containerPai: {
        flex: 3, backgroundColor: 'steelblue'
    },
    container: {
        flex: 1
    },
    icon: {
        paddingRight: 10
    }
});

const Dashboard: React.FC = () => {

    const [ listaInfos, setListaInfos ] = useState<AlergiaRestricao[]>();
    const [ atualizar, setAtualizar ] = useState<boolean>(false);
    const [visible, setVisible] = useState(false);
    const [ tipo, setTipo ] = useState<string>('');
    const [ descricao, setDescricao ] = useState<string>('');

    const { user, signOut } = useAuth();
    function handleSignOut() {
        signOut();
    }

    async function listarRestricoes() {
        const respo: AlergiaRestricao[] = await listar();
        setListaInfos(respo);
    }

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    useEffect(() => {
        listarRestricoes()
    }, [atualizar])
    
    return (
        <View style={styles.containerPai}>
            <Appbar.Header >
                <Appbar.Content title="Alergias e restrições" color='white' />
            </Appbar.Header>
            <Button title="Sign out" onPress={handleSignOut} />
            <Button title={translate('btAdd')} onPress={showModal} />
            <ScrollView>
            {
                listaInfos && listaInfos.map( item => ( <RowRestricao key={item.id} id={item.id} tipo={item.tipo} descricao={item.descricao} atualizar={atualizar} setAtualizar={setAtualizar}/> ))
            }
            </ScrollView>
            <ModalRestricao 
                showModal={showModal} visible={visible} setVisible={setVisible} hideModal={hideModal}
                tipoModal={true} tipo={tipo} setTipo={setTipo} 
                descricao={descricao} setDescricao={setDescricao} 
                atualizar={atualizar} setAtualizar={setAtualizar} />
        </View>
    )
};

export default Dashboard;