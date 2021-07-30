import React, { useCallback } from 'react';
import { StyleSheet, Text, ToastAndroid } from 'react-native';
import { Card, IconButton, Divider } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import {Menu, MenuTrigger, MenuOptions, MenuOption, MenuProvider} from 'react-native-popup-menu';
import { deletarInstituicao } from '../../controllers/instituicaoApi';
import { translate } from '../../locales';
import { InstituicaoResponse } from '../../interfaces/Instituicao';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 100
    },
    icon: {
        paddingTop:20,
        paddingLeft: 80
    },
    menuProvider: {
        flexDirection: "column-reverse",
        paddingRight: 60
    }
});

export interface Props {
    instituicao:InstituicaoResponse;
    atualizar: boolean;
    setAtualizar: Function;
    modal: (registro:InstituicaoResponse)=>void;
}

const RowInstituicoes: React.FC<Props> = ({instituicao, setAtualizar, atualizar, modal}) => {

    const notify = useCallback((msg:string) => {
        ToastAndroid.show(msg,150);
    },[])

    const editar = () => {
        modal(instituicao);
    }

    const excluirInstituicao = useCallback(async () => {
        let auxAtualizar = !atualizar;
        try{
            await deletarInstituicao(instituicao.id);
            notify("Exclusão realizada com sucesso!");
        }catch(error){
            notify("Erro ao tentar excluir instituição!");
        } finally{
            setAtualizar(auxAtualizar);
        }
    }, [instituicao, atualizar, setAtualizar, notify, setAtualizar]);
    
    return (
        
        <Card>         
            <Card.Title
                style={styles.container}
                title={instituicao.nome}
                // subtitle={`Quantidade de registro(s) ${instituicao.quantidade}`}
                left={(props) => <Icon raised {...props} size={20} name='heartbeat' type='font-awesome' color='#f50'/>}
                right={(props) => 
                    <MenuProvider >
                        <Menu 
                        style={styles.icon}
                        onSelect={value => {
                            if(value === 0)
                                editar();
                            else if(value === 1)
                                excluirInstituicao();
                        }}>
                            <MenuTrigger  >
                                <IconButton icon="dots-vertical" />
                            </MenuTrigger>
                            <MenuOptions>
                                <MenuOption value={0} >
                                    <Text><Icon name='pencil' size={15} type='font-awesome' /> {translate('btEditar')}</Text>
                                </MenuOption>
                                <MenuOption value={1}>
                                    <Text><Icon name='trash' size={15} type='font-awesome' /> {translate('btExcluir')}</Text>
                                </MenuOption>
                                <MenuOption value={2}>
                                    <Text><Icon name='close' size={15} type='font-awesome' /> {translate('btcancelar')}</Text>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                    </MenuProvider>
                }
            />
            <Divider />                 
        </Card>   
    )
};

export default RowInstituicoes;