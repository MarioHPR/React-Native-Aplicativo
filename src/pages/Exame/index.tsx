import React, { useCallback, useEffect, useState } from 'react';
import { View, Button, StyleSheet, ToastAndroid, ScrollView } from 'react-native';
import { useAuth } from '../../contexts/auth';
import { Appbar } from 'react-native-paper';
import { buscarTodosExames } from '../../controllers/exameApi';
import RowConsulta from '../../componentes/rowConsulta/rowConsulta';
import { translate } from '../../locales';
import { DadosExameResponse, INITIAL_EXAME_RESPONSE } from '../../interfaces/Exame';
import RowExame from '../../componentes/rowExame/rowExame';

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
const Exame: React.FC = () => {

    const { signOut, atualizarTelas } = useAuth();
    const [ flgAdd, setFlgAdd ] = useState<boolean>(false);
    const [ visible, setVisible ] = useState(false);
    const [ atualizar, setAtualizar ] = useState<boolean>(false);
    const [ listaExames, setListaExames ] = useState<DadosExameResponse[]>();
    const [ exame, setExame ] = useState<DadosExameResponse>(INITIAL_EXAME_RESPONSE);

    const notify = useCallback((msg:string) => {
        ToastAndroid.show(msg,150);
    },[]);

    const showModal = (flgAdd:boolean) => {
        setFlgAdd(flgAdd);
        if(flgAdd === true){
            setExame(INITIAL_EXAME_RESPONSE);
        }
        setVisible(true)
    };
    const hideModal = () => {
        setExame(INITIAL_EXAME_RESPONSE);
        setVisible(false);
    };

    const modal = (registro:DadosExameResponse) => {
        setExame(registro);
        showModal(false);
    }

    function handleSignOut() {
        signOut();
    }

    const listarExamesUsuario = useCallback(async () => {
        try{
            const respo: DadosExameResponse[] = await buscarTodosExames();
            setListaExames(respo);
        } catch(error) {
            notify("Erro ao listar os tipo de exame cadastrado!");
        }
    }, [buscarTodosExames, setListaExames, notify]);
    
    useEffect(() => {
        listarExamesUsuario();
    }, [atualizar, exame, atualizarTelas])
    return (
        <View style={styles.containerPai}>
            <Appbar.Header >
                {/* <Appbar.BackAction 
                    color='white'
                    onPress={handleSignOut} /> */}
                <Appbar.Content title="Exame" subtitle={" "} color='white' />
                <Appbar.Action icon="dots-vertical" onPress={()=>{}} />
            </Appbar.Header>
            <Button title="Sign out" onPress={handleSignOut} />
            <Button title={translate('btAdd')} onPress={() => showModal(true)} />
            <ScrollView>
            {
                listaExames && listaExames.map( item => ( <RowExame modal={modal} key={item.id} exame={item} atualizar={atualizar} setAtualizar={setAtualizar}/> ))
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
    )
};

export default Exame;