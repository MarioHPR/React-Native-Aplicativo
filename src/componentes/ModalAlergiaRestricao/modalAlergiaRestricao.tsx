import React, { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';
import { translate } from '../../locales';
import InputTextPadrao from '../../componentes/InputTextPadrao/InputTextPadrao';
import style from './styles';
import AlergiaRestricaoApi from '../../services/alergiaRestricaoApi';
import { AlergiaRestricaoRequest } from '../../models/AlergiaRestricao';
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
});

export interface Props {
  tipoModal: boolean;
  tipo: string;
  descricao: string;
  setTipo: Function;
  setDescricao: Function;
  atualizar: boolean;
  setAtualizar: Function;
}

const ModalRestricao: React.FC<Props> = ({tipoModal, tipo, setTipo, descricao, setDescricao, atualizar, setAtualizar}) => {
  const [visible, setVisible] = useState(false);
  const { user } = useAuth();
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const disable = useMemo(() => {
    return tipo === '' || descricao === '';
  }, [tipo, descricao]);

  async function adicionar() {
    const api = new AlergiaRestricaoApi();
    const request = {
      descricao: descricao,
      tipo: tipo
    } as AlergiaRestricaoRequest;

    console.log(request)

    await api.addNovo(request, user).then( resp => {
        if(resp.status === 200) {
          let auxAtualizar = !atualizar;
          if(resp.status === 200)
             setAtualizar(auxAtualizar)
          else
              setAtualizar(auxAtualizar)
          hideModal()
        }
    });
}
  
  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text> {tipoModal ? translate('alergiaRestricao.titleAdd') : translate('alergiaRestricao.titleEdit')} </Text>
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
            <Button disabled={disable} onPress={() => adicionar()}>
              {translate("botaoEnviar")}
            </Button>
        </Modal>
      </Portal>
      <Button style={{marginTop: 30}} onPress={showModal}>
          {translate('btAdd')}
      </Button>
    </Provider>
  )
};

export default ModalRestricao;