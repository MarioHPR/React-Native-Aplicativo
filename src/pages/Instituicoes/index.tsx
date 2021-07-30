import React, { useCallback, useEffect, useState } from 'react';
import { View, Button, StyleSheet, Text, ToastAndroid, ScrollView } from 'react-native';
import { useAuth } from '../../contexts/auth';
import { Appbar } from 'react-native-paper';
import { INITIAL_INSTITUICAO_REQUEST, InstituicaoResponse } from '../../interfaces/Instituicao';
import { buscarInstituicoes } from '../../controllers/instituicaoApi';
import { translate } from '../../locales';
import RowInstituicoes from '../../componentes/rowInstituicoes/rowInstituicoes';

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

const Instituicoes: React.FC = () => {

    const { signOut } = useAuth();
    const [ flgAdd, setFlgAdd ] = useState<boolean>(false);
    const [ visible, setVisible ] = useState(false);
    const [ atualizar, setAtualizar ] = useState<boolean>(false);
    const [ listaInstituicoes, setListaInstituicoes ] = useState<InstituicaoResponse[]>();
    const [ instituicao, setInstituicao ] = useState<InstituicaoResponse>(INITIAL_INSTITUICAO_REQUEST);

    const notify = useCallback((msg:string) => {
        ToastAndroid.show(msg,150);
    },[]);

    const showModal = (flgAdd:boolean) => {
        setFlgAdd(flgAdd);
        if(flgAdd === true){
            setInstituicao(INITIAL_INSTITUICAO_REQUEST);
        }
        setVisible(true)
    };
    const hideModal = () => {
        setInstituicao(INITIAL_INSTITUICAO_REQUEST);
        setVisible(false);
    };

    const modal = (registro:InstituicaoResponse) => {
        setInstituicao(registro);
        showModal(false);
    }

    function handleSignOut() {
        signOut();
    }

    const listarInstituicoes = useCallback(async () => {
        try{
            const respo: InstituicaoResponse[] = await buscarInstituicoes();
            setListaInstituicoes(respo);
        } catch(error) {
            notify("Erro ao listar os tipo de exame cadastrado!");
        }
    }, [buscarInstituicoes, setListaInstituicoes, notify]);
    
    useEffect(() => {
        listarInstituicoes();
    }, [atualizar, instituicao])

    return (
        <>
            <View style={styles.containerPai}>
                <Appbar.Header >
                    <Appbar.Content title="Instituições" subtitle={" "} color='white' />
                </Appbar.Header>
                <Button title="Sign out" onPress={handleSignOut} />
                <Button title={translate('btAdd')} onPress={() => showModal(true)} />
                <ScrollView>
                {
                    listaInstituicoes && listaInstituicoes.map( item => ( <RowInstituicoes modal={modal} key={item.id} instituicao={item} atualizar={atualizar} setAtualizar={setAtualizar}/> ))
                }
                </ScrollView>
                {/* <ModalTipoExame
                    tipoExame={tipoExame}
                    flgAdd={flgAdd}
                    visible={visible} hideModal={hideModal}
                    atualizar={atualizar} setAtualizar={setAtualizar} /> */}
            </View>
        </>
    )
};

export default Instituicoes;