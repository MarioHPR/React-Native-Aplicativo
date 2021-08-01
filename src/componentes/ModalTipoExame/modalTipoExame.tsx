import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, ToastAndroid } from 'react-native';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';
import { translate } from '../../locales';
import InputTextPadrao from '../InputTextPadrao/InputTextPadrao';
import style from './styles';
import { editarTipoExame, gerarTipoExame } from '../../controllers/tipoExameApi';
import { TipoExameResponse } from '../../interfaces/TipoExame';
import { useAuth } from '../../contexts/auth';

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
  tipoExame:TipoExameResponse;
  atualizar: boolean;
  setAtualizar: Function;
  visible: boolean;
  hideModal(): void; 
}

const ModalTipoExame: React.FC<Props> = ({flgAdd, tipoExame, atualizar, setAtualizar, visible, hideModal}) => {
  
  const containerStyle = {backgroundColor: 'white', padding: 20};
  
  const { setAtualizarTelas } = useAuth();
  const [nomeExame, setNomeExame ] = useState<string>(tipoExame.nomeExame);

  const notify = useCallback((msg:string) => {
    ToastAndroid.show(msg,150);
  },[])

  const disable = useMemo(() => {
    return nomeExame === '';
  }, [nomeExame]);

  const handlerAdd = useCallback(async () => {
    let auxAtualizar = !atualizar;
    try{
      await gerarTipoExame(nomeExame);
      notify("Tipo exame cadastrado com sucesso!");
    } catch(error){
      notify("Erro ao tentar adicionar novo tipo de exame!");
    } finally{
      setAtualizar(auxAtualizar);
      setAtualizarTelas(auxAtualizar);
      hideModal();
    }
  }, [nomeExame, notify, atualizar, setAtualizar]);

  const handlerEditarTipoExame = useCallback(async () => {
    let auxAtualizar = !atualizar;
    try{
      await editarTipoExame(tipoExame.id, nomeExame);
      notify("Tipo exame editado com sucesso!");
    } catch(error){
      notify("Erro ao tentar editar tipo exame!");
    } finally{
      setAtualizar(auxAtualizar);
      setAtualizarTelas(auxAtualizar);
      hideModal();
    }
  }, [tipoExame, nomeExame, notify, atualizar, setAtualizar]);

  useEffect(() => {
    setNomeExame(tipoExame.nomeExame);
  }, [tipoExame]);
  
  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text> {flgAdd ? translate('tipoExame.titleAdd') : translate('tipoExame.titleEdit')} </Text>
          <InputTextPadrao 
                label={translate("tipoExame.campo")}
                valor={nomeExame}
                setValor={ setNomeExame }
                mensagemErro={""}
                style={style.marginTop}
                typeKeybord={'default'}
                quantidadeCaracteres={100}
            />
            <Button disabled={disable} onPress={() => flgAdd ? handlerAdd() : handlerEditarTipoExame()}>
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

export default ModalTipoExame;