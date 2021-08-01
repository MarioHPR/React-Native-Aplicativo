import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, ToastAndroid, ScrollView } from 'react-native';
import { useAuth } from '../../contexts/auth';
import { Appbar, Button } from 'react-native-paper';
import { buscarTodosExames } from '../../controllers/exameApi';
import { buscarInstituicoes } from '../../controllers/instituicaoApi';
import { translate } from '../../locales';
import { DadosExameResponse, INITIAL_EXAME_RESPONSE } from '../../interfaces/Exame';
import RowExame from '../../componentes/rowExame/rowExame';
import { INITIAL_INSTITUICAO_REQUEST, InstituicaoResponse } from '../../interfaces/Instituicao';
import ModalInstituicao from '../../componentes/ModalInstituicao/modalInstituicao';
import ModalTipoExame from '../../componentes/ModalTipoExame/modalTipoExame';
import { INITIAL_RESPONSE, TipoExameResponse } from '../../interfaces/TipoExame';
import { buscarTodosTipoExames } from '../../controllers/tipoExameApi';

const styles = StyleSheet.create({
    containerPai: {
        flex: 3, backgroundColor: 'steelblue'
    },
    container: {
        flex: 1
    },
    icon: {
        paddingRight: 10
    },
    buttonsInternosAddInstituicao: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
        margin:5,
        backgroundColor:'white',
        fontSize:2
    },
    buttonsInternosAddConsulta: {
        flex: 0.5,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 113, 1)',
        margin:5,
        backgroundColor: 'rgba(36, 178, 255, 1)'
    }
});
const Exame: React.FC = () => {

    const { signOut, atualizarTelas } = useAuth();
    const [ flgAdd, setFlgAdd ] = useState<boolean>(false);
    const [ visible, setVisible ] = useState(false);
    const [ atualizar, setAtualizar ] = useState<boolean>(false);
    const [ listaExames, setListaExames ] = useState<DadosExameResponse[]>();
    const [ exame, setExame ] = useState<DadosExameResponse>(INITIAL_EXAME_RESPONSE);
    const [ visibleInstituicao, setVisibleInstituicao ] = useState(false);
    const [ visibleTipoExame, setVisibleTipoExame ] = useState(false);
    const [ listaInstituicoes, setListaInstituicoes ] = useState<InstituicaoResponse[]>([]);
    const [ instituicao, setInstituicao ] = useState<InstituicaoResponse>(INITIAL_INSTITUICAO_REQUEST);
    const [ tipoExame, setTipoExame ] = useState<TipoExameResponse>(INITIAL_RESPONSE);
    const [ listaTipoExames, setListaTipoExames ] = useState<TipoExameResponse[]>();

    const notify = useCallback((msg:string) => {
        ToastAndroid.show(msg,150);
    },[]);

    const showModalInstituicao = (flg:boolean) => {
        setInstituicao(INITIAL_INSTITUICAO_REQUEST);
        setVisibleInstituicao(flg)
    };

    const showModalTipoExame = (flg:boolean) => {
        setTipoExame(INITIAL_RESPONSE);
        setVisibleTipoExame(flg)
    };

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

    const hideInstituicao = () => {
        setInstituicao(INITIAL_INSTITUICAO_REQUEST);
        setVisibleInstituicao(false);
    };

    const hideTipoExame = () => {
        setTipoExame(INITIAL_RESPONSE);
        setVisibleTipoExame(false);
    };

    const modal = (registro:DadosExameResponse) => {
        setExame(registro);
        showModal(false);
    }

    function handleSignOut() {
        signOut();
    }

    const habilitarAdd = useMemo(() => {
        return listaInstituicoes === [] || listaTipoExames === [];
    }, [listaInstituicoes]);

    const listarExamesUsuario = useCallback(async () => {
        try{
            const respo: DadosExameResponse[] = await buscarTodosExames();
            setListaExames(respo);
        } catch(error) {
            notify("Erro ao listar os tipo de exame cadastrado!");
        }
    }, [buscarTodosExames, setListaExames, notify]);

    const listarInstituicoes = useCallback(async () => {
        try{
            const respo: InstituicaoResponse[] = await buscarInstituicoes();
            setListaInstituicoes(respo);
        } catch(error) {
            notify("Erro ao listar os tipo de exame cadastrado!");
        }
        
    }, [buscarInstituicoes, setListaInstituicoes, notify]);

    const listarTipoExames = useCallback(async () => {
        try{
            const respo: TipoExameResponse[] = await buscarTodosTipoExames();
            setListaTipoExames(respo);
        } catch(error) {
            notify("Erro ao listar os tipo de exame cadastrado!");
        }
    }, [buscarTodosTipoExames, setListaTipoExames, notify]);
    
    useEffect(() => {
        listarExamesUsuario();
    }, [atualizar, exame, atualizarTelas]);

    useEffect(() => {
        listarInstituicoes();
    }, [atualizar, instituicao, atualizarTelas]);

    useEffect(() => {
        listarTipoExames();
    }, [atualizar, tipoExame, atualizarTelas]);

    return (
        <View style={styles.containerPai}>
            <Appbar.Header >
                {/* <Appbar.BackAction 
                    color='white'
                    onPress={handleSignOut} /> */}
                <Appbar.Content title="Exame" subtitle={" "} color='white' />
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
                <Button style={styles.buttonsInternosAddInstituicao} onPress={() => showModalInstituicao(true)}>{translate('exame.btInstituicao')}</Button>
                <Button style={styles.buttonsInternosAddInstituicao} onPress={() => showModalTipoExame(true)}>{translate('exame.btTipo')}</Button>
                <Button disabled={habilitarAdd} color='white' style={styles.buttonsInternosAddConsulta} onPress={() => showModal(true)}>{translate('exame.btAddExame')}</Button>
            </View>
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
            <ModalInstituicao
                instituicao={instituicao}
                flgAdd={flgAdd}
                visible={visibleInstituicao} hideModal={hideInstituicao}
                atualizar={atualizar} setAtualizar={setAtualizar} />
            <ModalTipoExame
                tipoExame={tipoExame}
                flgAdd={flgAdd}
                visible={visibleTipoExame} hideModal={hideTipoExame}
                atualizar={atualizar} setAtualizar={setAtualizar} />
        </View>
    )
};

export default Exame;