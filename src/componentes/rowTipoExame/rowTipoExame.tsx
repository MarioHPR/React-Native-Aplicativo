import React, { useCallback } from 'react';
import { StyleSheet, Text, ToastAndroid } from 'react-native';
import { Card, IconButton, Divider } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import {Menu, MenuTrigger, MenuOptions, MenuOption, MenuProvider} from 'react-native-popup-menu';
import { excluir } from '../../controllers/alergiaRestricaoApi';
import { translate } from '../../locales';
import { TipoExameResponse } from '../../interfaces/TipoExame';

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
    tipoExame:TipoExameResponse;
    atualizar: boolean;
    setAtualizar: Function;
    modal: (registro:TipoExameResponse)=>void;
}

const RowTipoExame: React.FC<Props> = ({tipoExame, setAtualizar, atualizar, modal}) => {

    const notify = useCallback((msg:string) => {
        ToastAndroid.show(msg,150);
    },[])

    const editar = () => {
        modal(tipoExame);
    }

    const excluirRestricao = useCallback(async () => {
        let auxAtualizar = !atualizar;
        try{
            await excluir(tipoExame.id);
            notify("Exclusão realizada com sucesso!");
        }catch(error){
            notify("Erro ao tentar excluir tipo de exame!");
        } finally{
            setAtualizar(auxAtualizar);
        }
    }, [tipoExame, atualizar, setAtualizar, notify, setAtualizar]);
    
    return (
        
        <Card>         
            <Card.Title
                style={styles.container}
                title={tipoExame.nomeExame}
                subtitle={`Quantidade de registro(s) ${tipoExame.quantidade}`}
                left={(props) => <Icon raised {...props} size={20} name='heartbeat' type='font-awesome' color='#f50'/>}
                right={(props) => 
                    <MenuProvider >
                        <Menu 
                        style={styles.icon}
                        onSelect={value => {
                            if(value === 0)
                                editar();
                            else if(value === 1)
                                excluirRestricao();
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

export default RowTipoExame;