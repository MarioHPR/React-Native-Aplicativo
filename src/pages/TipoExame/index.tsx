import React, { useCallback, useEffect, useState } from 'react';
import { View, Button, StyleSheet, ScrollView, ToastAndroid } from 'react-native';
import { useAuth } from '../../contexts/auth';
import { Appbar } from 'react-native-paper';
import ModalRestricao from '../../componentes/ModalAlergiaRestricao/modalAlergiaRestricao';
import { translate } from '../../locales';
import { buscarTodosTipoExames } from '../../controllers/tipoExameApi';
import { TipoExameResponse } from '../../interfaces/TipoExame';
import RowTipoExame from '../../componentes/rowTipoExame/rowTipoExame';

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
    const [ idEdit, setIdEdit ] = useState<string>();
    const [ visible, setVisible ] = useState(false);
    const [ atualizar, setAtualizar ] = useState<boolean>(false);
    const [ listaTipoExames, setListaTipoExames ] = useState<TipoExameResponse[]>();
    const [ tipoExame, setTipoExame ] = useState<TipoExameResponse>();

    const notify = useCallback((msg:string) => {
        ToastAndroid.show(msg,150);
    },[]);

    const showModal = (flgAdd:boolean) => {
        setFlgAdd(flgAdd);
        if(flgAdd === true){
            setIdEdit(null);
            // setTipo('');
            // setDescricao('');
        }
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
            console.log("enttrou aqui de boas ", respo)
            setListaTipoExames(respo);
        } catch(error) {
            notify("Erro ao listar os tipo de exame cadastrado!");
        }
    }, [buscarTodosTipoExames, setListaTipoExames, notify]);
    
    useEffect(() => {
        listarTipoExames();
    }, [atualizar])

    return (
        <>
            <View style={styles.containerPai}>
                <Appbar.Header >
                    <Appbar.Content title="TipoExame" subtitle={" "} color='white' />
                </Appbar.Header>
                <Button title="Sign out" onPress={handleSignOut} />
                <Button title={translate('btAdd')} onPress={() => showModal(true)} />
                <ScrollView>
                {
                    listaTipoExames && listaTipoExames.map( item => ( <RowTipoExame modal={modal} key={item.id} tipoExame={item} atualizar={atualizar} setAtualizar={setAtualizar}/> ))
                }
                </ScrollView>
                {/* <ModalRestricao
                    idEdit={idEdit}
                    flgAdd={flgAdd}
                    visible={visible} hideModal={hideModal}
                    tipo={tipo} setTipo={setTipo} 
                    descricao={descricao} setDescricao={setDescricao} 
                    atualizar={atualizar} setAtualizar={setAtualizar} /> */}
            </View>
        </>
    )
};

export default TipoExame;