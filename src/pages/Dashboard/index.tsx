import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, ToastAndroid } from 'react-native';
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
    const [ flgAdd, setFlgAdd ] = useState<boolean>(false);
    const [visible, setVisible] = useState(false);
    const [ tipo, setTipo ] = useState<string>('');
    const [ descricao, setDescricao ] = useState<string>('');
    const [ idEdit, setIdEdit ] = useState<string>();

    const { signOut } = useAuth();
    function handleSignOut() {
        signOut();
    }

    const notify = useCallback((msg:string) => {
        ToastAndroid.show(msg,150);
    },[]);

    const listarRestricoes = useCallback(async () => {
        try{
            const respo: AlergiaRestricao[] = await listar();
            setListaInfos(respo);
        } catch(error){
            notify("Erro ao listar suas restrições!");
        }
    }, [listar, setListaInfos, notify]);

    const showModal = (flgAdd:boolean) => {
        setFlgAdd(flgAdd);
        if(flgAdd === true){
            setIdEdit(null);
            setTipo('');
            setDescricao('');
        }
        setVisible(true)
    };
    const hideModal = () => setVisible(false);

    useEffect(() => {
        listarRestricoes()
    }, [atualizar])

    const modal = (idRegistro:string, tipoRegistro:string, descricaoRegistro:string) => {
        setIdEdit(idRegistro);
        setTipo(tipoRegistro);
        setDescricao(descricaoRegistro);
        showModal(false);
    }
    
    return (
        <View style={styles.containerPai}>
            <Appbar.Header >
                <Appbar.Content title="Alergias e restrições" color='white' />
            </Appbar.Header>
            <Button title="Sign out" onPress={handleSignOut} />
            <Button title={translate('btAdd')} onPress={() => showModal(true)} />
            <ScrollView>
            {
                listaInfos && listaInfos.map( item => ( <RowRestricao modal={modal} key={item.id} id={item.id} tipo={item.tipo} descricao={item.descricao} atualizar={atualizar} setAtualizar={setAtualizar}/> ))
            }
            </ScrollView>
            <ModalRestricao
                idEdit={idEdit}
                flgAdd={flgAdd}
                visible={visible} hideModal={hideModal}
                tipo={tipo} setTipo={setTipo} 
                descricao={descricao} setDescricao={setDescricao} 
                atualizar={atualizar} setAtualizar={setAtualizar} />
        </View>
    )
};

export default Dashboard;