import React, { useCallback, useEffect, useState } from 'react';
import { View, Button, StyleSheet, ToastAndroid, ScrollView } from 'react-native';
import { useAuth } from '../../contexts/auth';
import { Appbar } from 'react-native-paper';
import { ConsultaResponse, INITIAL_CONSULTA_RESPONSE } from '../../interfaces/Consulta';
import { buscarConsultas } from '../../controllers/consultaApi';
import RowConsulta from '../../componentes/rowConsulta/rowConsulta';
import { translate } from '../../locales';

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

const Consulta: React.FC = () => {
    const { signOut } = useAuth();
    const [ flgAdd, setFlgAdd ] = useState<boolean>(false);
    const [ visible, setVisible ] = useState(false);
    const [ atualizar, setAtualizar ] = useState<boolean>(false);
    const [ listaConsultas, setListaConsultas ] = useState<ConsultaResponse[]>();
    const [ consulta, setConsulta ] = useState<ConsultaResponse>(INITIAL_CONSULTA_RESPONSE);

    const notify = useCallback((msg:string) => {
        ToastAndroid.show(msg,150);
    },[]);

    const showModal = (flgAdd:boolean) => {
        setFlgAdd(flgAdd);
        if(flgAdd === true){
            setConsulta(INITIAL_CONSULTA_RESPONSE);
        }
        setVisible(true)
    };
    const hideModal = () => {
        setConsulta(INITIAL_CONSULTA_RESPONSE);
        setVisible(false);
    };

    const modal = (registro:ConsultaResponse) => {
        setConsulta(registro);
        showModal(false);
    }

    function handleSignOut() {
        signOut();
    }

    const listarConsultas = useCallback(async () => {
        try{
            const respo: ConsultaResponse[] = await buscarConsultas();
            setListaConsultas(respo);
        } catch(error) {
            notify("Erro ao listar os tipo de exame cadastrado!");
        }
    }, [buscarConsultas, setListaConsultas, notify]);
    
    useEffect(() => {
        listarConsultas();
    }, [atualizar, consulta])
    return (
        <View style={styles.containerPai}>
            <Appbar.Header >
                {/* <Appbar.BackAction 
                    color='white'
                    onPress={handleSignOut} /> */}
                <Appbar.Content title="Consulta(s)" subtitle={" "} color='white' />
                <Appbar.Action icon="dots-vertical" onPress={()=>{}} />
            </Appbar.Header>
            <Button title="Sign out" onPress={handleSignOut} />
            <Button title={translate('btAdd')} onPress={() => showModal(true)} />
            <ScrollView>
            {
                listaConsultas && listaConsultas.map( item => ( <RowConsulta modal={modal} key={item.id} consulta={item} atualizar={atualizar} setAtualizar={setAtualizar}/> ))
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

export default Consulta;