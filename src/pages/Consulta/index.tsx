import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, ToastAndroid, ScrollView } from 'react-native';
import { useAuth } from '../../contexts/auth';
import { Appbar, Button } from 'react-native-paper';
import { ConsultaResponse, INITIAL_CONSULTA_RESPONSE } from '../../interfaces/Consulta';
import { buscarConsultas } from '../../controllers/consultaApi';
import RowConsulta from '../../componentes/rowConsulta/rowConsulta';
import { translate } from '../../locales';
import { INITIAL_INSTITUICAO_REQUEST, InstituicaoResponse } from '../../interfaces/Instituicao';
import { buscarInstituicoes } from '../../controllers/instituicaoApi';
import ModalInstituicao from '../../componentes/ModalInstituicao/modalInstituicao';
import ModalConsulta from '../../componentes/ModalConsulta/modalConsulta';

const styles = StyleSheet.create({
    containerPai: {
        flex: 3, backgroundColor: 'steelblue'
    },
    container: {
        flex: 1,
        
    },
    icon: {
        paddingRight: 10
    },
    buttonsInternosAddInstituicao: {
        flex: 0.5,
        borderWidth: 1,
        borderColor: 'black',
        margin:5,
        backgroundColor:'white'
    },
    buttonsInternosAddConsulta: {
        flex: 0.5,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 113, 1)',
        margin:5,
        backgroundColor: 'rgba(36, 178, 255, 1)'
    }
});

const Consulta: React.FC = () => {
    const { signOut, atualizarTelas } = useAuth();
    const [ flgAdd, setFlgAdd ] = useState<boolean>(false);
    const [ visible, setVisible ] = useState(false);
    const [ visibleInstituicao, setVisibleInstituicao ] = useState(false);
    const [ atualizar, setAtualizar ] = useState<boolean>(false);
    const [ listaConsultas, setListaConsultas ] = useState<ConsultaResponse[]>();
    const [ consulta, setConsulta ] = useState<ConsultaResponse>(INITIAL_CONSULTA_RESPONSE);
    const [ listaInstituicoes, setListaInstituicoes ] = useState<InstituicaoResponse[]>([]);
    const [ instituicao, setInstituicao ] = useState<InstituicaoResponse>(INITIAL_INSTITUICAO_REQUEST);

    const notify = useCallback((msg:string) => {
        ToastAndroid.show(msg,150);
    },[]);

    const showModalInstituicao = (flg:boolean) => {
        setFlgAdd(true);
        setInstituicao(INITIAL_INSTITUICAO_REQUEST);
        setVisibleInstituicao(flg)
    };

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

    const hideInstituicao = () => {
        setInstituicao(INITIAL_INSTITUICAO_REQUEST);
        setVisibleInstituicao(false);
    };

    const modal = (registro:ConsultaResponse) => {
        setConsulta(registro);
        setInstituicao(INITIAL_INSTITUICAO_REQUEST);
        showModal(false);
        showModalInstituicao(false);
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

    const listarInstituicoes = useCallback(async () => {
        try{
            const respo: InstituicaoResponse[] = await buscarInstituicoes();
            setListaInstituicoes(respo);
        } catch(error) {
            notify("Erro ao listar os tipo de exame cadastrado!");
        }
        
    }, [buscarInstituicoes, setListaInstituicoes, notify]);

    const habilitarAdd = useMemo(() => {
        return listaInstituicoes === [];
    }, [listaInstituicoes]);
    
    useEffect(() => {
        listarConsultas();
    }, [atualizar, consulta]);
    
    useEffect(() => {
        listarInstituicoes();
    }, [atualizar, instituicao, atualizarTelas]);

    return (
        <View style={styles.containerPai}>
            <Appbar.Header >
                {/* <Appbar.BackAction 
                    color='white'
                    onPress={handleSignOut} /> */}
                <Appbar.Content title="Consulta(s)" subtitle={" "} color='white' />
                <Appbar.Action icon="dots-vertical" onPress={()=>{}} />
            </Appbar.Header>
            <Button onPress={handleSignOut}>Sign out</Button>
 
            <View
                style={{
                    flexDirection: "row",
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: 10
                }}
                >
                <Button style={styles.buttonsInternosAddInstituicao} onPress={() => showModalInstituicao(true)}>{translate('consulta.btInstituicao')}</Button>
                <Button disabled={habilitarAdd} color='white' style={styles.buttonsInternosAddConsulta} onPress={() => showModal(true)}>{translate('consulta.btAddConsulta')}</Button>
            </View>

            <ScrollView>
            {
                listaConsultas && listaConsultas.map( item => ( <RowConsulta modal={modal} key={item.id} consulta={item} atualizar={atualizar} setAtualizar={setAtualizar}/> ))
            }
            </ScrollView>
            {listaInstituicoes && <ModalConsulta
                consulta={consulta}
                listaInstituicoes={listaInstituicoes}
                flgAdd={flgAdd}
                visible={visible} hideModal={hideModal}
                atualizar={atualizar} setAtualizar={setAtualizar} />}
            <ModalInstituicao
                instituicao={instituicao}
                flgAdd={flgAdd}
                visible={visibleInstituicao} hideModal={hideInstituicao}
                atualizar={atualizar} setAtualizar={setAtualizar} />
        </View>
    )
};

export default Consulta;