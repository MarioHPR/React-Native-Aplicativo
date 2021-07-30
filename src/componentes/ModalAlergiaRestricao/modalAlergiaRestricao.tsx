import React, { useCallback, useMemo } from 'react';
import { StyleSheet, ToastAndroid } from 'react-native';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';
import { translate } from '../../locales';
import InputTextPadrao from '../../componentes/InputTextPadrao/InputTextPadrao';
import style from './styles';
import { AlergiaRestricaoRequest } from '../../models/AlergiaRestricao';
import { addNovo, editar } from '../../controllers/alergiaRestricaoApi';

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
  , btCancelar: {
    paddingBottom: 60
  }
});

export interface Props {
  flgAdd:boolean;
  idEdit?:number;
  tipo: string;
  descricao: string;
  setTipo: Function;
  setDescricao: Function;
  atualizar: boolean;
  setAtualizar: Function;
  visible: boolean;
  hideModal(): void; 
}

const ModalRestricao: React.FC<Props> = ({flgAdd, idEdit, visible, hideModal, tipo, setTipo, descricao, setDescricao, atualizar, setAtualizar}) => {
  
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const notify = useCallback((msg:string) => {
    ToastAndroid.show(msg,150);
  },[])

  const disable = useMemo(() => {
    return tipo === '' || descricao === '';
  }, [tipo, descricao]);

  const editarAnotacao = useCallback(async () => {
    let auxAtualizar = !atualizar;
    try{
      const request = {
        descricao: descricao,
        tipo: tipo
      } as AlergiaRestricaoRequest;
      await editar(idEdit, request);
      notify("Registro editado com sucesso!");
    } catch(error){
      notify("Erro ao tentar editar anotação!");
    } finally{
      setAtualizar(auxAtualizar);
      hideModal();
    }
  }, [idEdit, descricao, tipo, addNovo, notify, atualizar, setAtualizar]);

  const adicionarRestricao = useCallback(async () => {
    let auxAtualizar = !atualizar;
    try{
      const request = {
        descricao: descricao,
        tipo: tipo
      } as AlergiaRestricaoRequest;
      await addNovo(request);
      notify("Registro cadastrado com sucesso!");
    } catch(error){
      notify("Erro ao tentar adicionar nova anotação!");
    } finally{
      setAtualizar(auxAtualizar);
      hideModal();
    }
  }, [descricao, tipo, addNovo, notify, atualizar, setAtualizar]);
  
  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text> {flgAdd ? translate('alergiaRestricao.titleAdd') : translate('alergiaRestricao.titleEdit')} </Text>
          <InputTextPadrao 
                label={translate("alergiaRestricao.tipo")}
                valor={tipo}
                setValor={ setTipo }
                mensagemErro={""}
                style={style.marginTop}
                typeKeybord={'default'}
                quantidadeCaracteres={100}
            />
            <InputTextPadrao 
                label={translate("alergiaRestricao.descricao")}
                valor={descricao}
                setValor={ setDescricao }
                mensagemErro={""}
                style={style.marginTop}
                typeKeybord={'default'}
                quantidadeCaracteres={100}
            />
            <Button disabled={disable} onPress={() => flgAdd ? adicionarRestricao() : editarAnotacao()}>
              { flgAdd ? translate("botaoEnviar") : translate("botaoEditar")}
            </Button>
            <Button style={styles.btCancelar} onPress={hideModal}>
              { translate("btCancelar") }
            </Button>
        </Modal>
      </Portal>
      
    </Provider>
  )
};

export default ModalRestricao;