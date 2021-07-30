import React, { useCallback } from 'react';
import { StyleSheet, Text, ToastAndroid } from 'react-native';
import { Card, IconButton, Divider } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import {Menu, MenuTrigger, MenuOptions, MenuOption, MenuProvider} from 'react-native-popup-menu';
import { excluir } from '../../controllers/alergiaRestricaoApi';
import { translate } from '../../locales';

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
    id: number;
    tipo: string;
    descricao: string;
    atualizar: boolean;
    setAtualizar: Function;
    modal: (id:number, tipo:string, descricao:string)=>void;
}

const RowRestricao: React.FC<Props> = ({id, tipo, descricao, setAtualizar, atualizar, modal}) => {

    const notify = useCallback((msg:string) => {
        ToastAndroid.show(msg,150);
    },[])

    const editar = () => {
        modal(id, tipo, descricao);
    }

    const excluirRestricao = useCallback(async () => {
        let auxAtualizar = !atualizar;
        try{
            await excluir(id);
            notify("Exclusão realizada com sucesso!");
        }catch(error){
            notify("Erro ao tentar excluir anotação!");
        } finally{
            setAtualizar(auxAtualizar);
        }
    }, [id, atualizar, setAtualizar, notify, setAtualizar]);
    
    return (
        <Card>         
            <Card.Title
                style={styles.container}
                title={tipo}
                subtitle={descricao}
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

export default RowRestricao;