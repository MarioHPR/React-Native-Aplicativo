import React, { useCallback, useEffect, useState } from 'react';
import { View, Button, StyleSheet, ScrollView, ToastAndroid } from 'react-native';
import { useAuth } from '../../contexts/auth';
import { Appbar } from 'react-native-paper';
import { translate } from '../../locales';
import { buscarTodosTipoExames } from '../../controllers/tipoExameApi';
import { INITIAL_RESPONSE, TipoExameResponse } from '../../interfaces/TipoExame';
import RowTipoExame from '../../componentes/rowTipoExame/rowTipoExame';
import ModalTipoExame from '../../componentes/ModalTipoExame/modalTipoExame';

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

const TipoExame: React.FC = () => {

    const { signOut } = useAuth();
    const [ flgAdd, setFlgAdd ] = useState<boolean>(false);
    const [ idEdit, setIdEdit ] = useState<number>();
    const [ visible, setVisible ] = useState(false);
    const [ atualizar, setAtualizar ] = useState<boolean>(false);
    const [ listaTipoExames, setListaTipoExames ] = useState<TipoExameResponse[]>();
    const [ tipoExame, setTipoExame ] = useState<TipoExameResponse>(INITIAL_RESPONSE);

    const notify = useCallback((msg:string) => {
        ToastAndroid.show(msg,150);
    },[]);

    const showModal = (flgAdd:boolean) => {
        setFlgAdd(flgAdd);
        setVisible(true)
    };
    const hideModal = () => setVisible(false);

    const modal = (registro:TipoExameResponse) => {
        setTipoExame(registro);
        showModal(false);
    }

    function handleSignOut() {
        signOut();
    }

    const listarTipoExames = useCallback(async () => {
        try{
            const respo: TipoExameResponse[] = await buscarTodosTipoExames();
            setListaTipoExames(respo);
        } catch(error) {
            notify("Erro ao listar os tipo de exame cadastrado!");
        }
    }, [buscarTodosTipoExames, setListaTipoExames, notify]);
    
    useEffect(() => {
        listarTipoExames();
    }, [atualizar, tipoExame])

    return (
        <>
            <View style={styles.containerPai}>
                <Appbar.Header >
                    <Appbar.Content title="TipoExame" subtitle={" "} color='white' />
                </Appbar.Header>
                <Button title="Sign out" onPress={handleSignOut} />
                {/* <Button title={translate('btAdd')} onPress={() => showModal(true)} /> */}
                <ScrollView>
                {
                    listaTipoExames && listaTipoExames.map( item => ( <RowTipoExame modal={modal} key={item.id} tipoExame={item} atualizar={atualizar} setAtualizar={setAtualizar}/> ))
                }
                </ScrollView>
                <ModalTipoExame
                    idEdit={idEdit}
                    tipoExame={tipoExame}
                    flgAdd={flgAdd}
                    visible={visible} hideModal={hideModal}
                    atualizar={atualizar} setAtualizar={setAtualizar} />
            </View>
        </>
    )
};

export default TipoExame;