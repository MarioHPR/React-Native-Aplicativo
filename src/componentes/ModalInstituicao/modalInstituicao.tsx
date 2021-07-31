import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, ToastAndroid } from 'react-native';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';
import { translate } from '../../locales';
import InputTextPadrao from '../InputTextPadrao/InputTextPadrao';
import style from './styles';
import { criarInstituicao, editarInstituicao } from '../../controllers/instituicaoApi';
import { InstituicaoRequest, InstituicaoResponse, RequestInstituicao } from '../../interfaces/Instituicao';
import InputTextMascaraCep from '../InputTextPadrao/InputTextMascaraCep';
import InputTextMascaraTelefone from '../InputTextPadrao/InputTextMascaraTelefone';

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
  instituicao:InstituicaoResponse;
  atualizar: boolean;
  setAtualizar: Function;
  visible: boolean;
  hideModal(): void; 
}

const ModalInstituicao: React.FC<Props> = ({flgAdd, instituicao, atualizar, setAtualizar, visible, hideModal}) => {
  
  const containerStyle = {backgroundColor: 'white', padding: 20};
  const [bairro, setBairro ] = useState<string>(instituicao.enderecoDTO.bairro);
  const [cep, setCep ] = useState<string>(instituicao.enderecoDTO.cep);
  const [cidade, setCidade ] = useState<string>(instituicao.enderecoDTO.cidade);
  const [contatoDois, setContatoDois ] = useState<string>(instituicao.contatoDTO.contatoDois);
  const [contatoUm, setContatoUm ] = useState<string>(instituicao.contatoDTO.contatoUm);
  const [nome, setNome ] = useState<string>(instituicao.nome);
  const [numero, setNumero ] = useState<number | string>(instituicao.enderecoDTO.numero);
  const [rua, setRua ] = useState<string>(instituicao.enderecoDTO.rua);

  const notify = useCallback((msg:string) => {
    ToastAndroid.show(msg,150);
  },[])

  const disable = useMemo(() => {
    return bairro === '' || cep === '' || cidade === '' || contatoDois === '' || contatoUm === '' || nome === '' || numero === 0 || rua === '';
  }, [bairro, cep, cidade, contatoDois, contatoUm, nome, numero, rua]);

  const editInstituicao = useCallback(async () => {
    let auxAtualizar = !atualizar;
    try{
      instituicao.nome = nome;
      instituicao.enderecoDTO.bairro=bairro;
      instituicao.enderecoDTO.cidade=cidade;
      instituicao.enderecoDTO.cep=cep;
      instituicao.enderecoDTO.rua=rua;
      instituicao.enderecoDTO.numero=numero;
      instituicao.contatoDTO.contatoUm=contatoUm;
      instituicao.contatoDTO.contatoDois=contatoDois;
      
      await editarInstituicao(instituicao.id, instituicao);
      notify("Instituição editado com sucesso!");
    } catch(error){
      notify("Erro ao tentar editar instituição!");
    } finally{
      setAtualizar(auxAtualizar);
      hideModal();
    }
  }, [instituicao, bairro, cep, cidade, notify, contatoDois, contatoUm, nome, numero, rua]);

  const addInstituicao = useCallback(async () => {
    let auxAtualizar = !atualizar;
    try{
      await criarInstituicao({bairro, cep, cidade, contatoDois, contatoUm, nome, numero, rua} as RequestInstituicao);
      notify("Registro cadastrado com sucesso!");
    } catch(error){
      notify("Erro ao tentar adicionar nova anotação!");
    } finally{
      setAtualizar(auxAtualizar);
      hideModal();
    }
  }, [instituicao, bairro, cep, cidade, notify, contatoDois, contatoUm, nome, numero, rua]);

  useEffect(() => {
    setNome(instituicao.nome);
    setCidade(instituicao.enderecoDTO.cidade);
    setBairro(instituicao.enderecoDTO.bairro);
    setRua(instituicao.enderecoDTO.rua);
    setNumero(instituicao.enderecoDTO.numero);
    setCep(instituicao.enderecoDTO.cep);
    setContatoUm(instituicao.contatoDTO.contatoUm);
    setContatoDois(instituicao.contatoDTO.contatoDois);
  }, [instituicao]);
  
  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} >
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <Text style={style.marginTop}> {flgAdd ? translate('instituicao.titleAdd') : translate('instituicao.titleEdit')} </Text>
            <InputTextPadrao 
              label={translate('instituicao.labels.nome')}
              valor={nome}
              setValor={ setNome }
              mensagemErro={""}
              style={""}
              typeKeybord={'default'}
              quantidadeCaracteres={100}
            />
            <InputTextPadrao 
              label={translate('instituicao.labels.cidade')}
              valor={cidade}
              setValor={ setCidade }
              mensagemErro={""}
              style={""}
              typeKeybord={'default'}
              quantidadeCaracteres={100}
            />

            <InputTextPadrao 
              label={translate('instituicao.labels.bairro')}
              valor={bairro}
              setValor={ setBairro }
              mensagemErro={""}
              style={""}
              typeKeybord={'default'}
              quantidadeCaracteres={100}
            />

            <InputTextPadrao 
              label={translate('instituicao.labels.rua')}
              valor={rua}
              setValor={ setRua }
              mensagemErro={""}
              style={""}
              typeKeybord={'default'}
              quantidadeCaracteres={100}
            />

            <InputTextPadrao 
              label={translate('instituicao.labels.numero')}
              valor={numero.toString()}
              setValor={ setNumero }
              mensagemErro={""}
              style={""}
              typeKeybord={'numeric'}
              quantidadeCaracteres={100}
            />

            <InputTextMascaraCep
              label={translate("instituicao.labels.cep")}
              valor={cep}
              setValor={setCep}
              mensagemErro={""}
              style={""}
            />

            <InputTextMascaraTelefone
              label={translate("instituicao.labels.contato1")}
              valor={contatoUm}
              setValor={setContatoUm}
              mensagemErro={("")}
              style={""}
              typeKeybord={'default'}
              quantidadeCaracteres={100}
            />

            <InputTextMascaraTelefone
              label={translate("instituicao.labels.contato2")}
              valor={contatoDois}
              setValor={setContatoDois}
              mensagemErro={("")}
              style={""}
            />

            <Button disabled={disable} onPress={() => flgAdd ? addInstituicao() : editInstituicao()}>
              { flgAdd ? translate("botaoEnviar") : translate("botaoEditar")}
            </Button>
            <Button style={styles.btCancelar} onPress={hideModal}>
              { translate("btCancelar") }
            </Button>
          </ScrollView>
        </Modal>
      </Portal>
      
    </Provider>
  )
};

export default ModalInstituicao;