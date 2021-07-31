import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Picker, ScrollView, StyleSheet, ToastAndroid, View } from 'react-native';
import { Modal, Portal, Text, Button, Provider, List } from 'react-native-paper';
import { translate } from '../../locales';
import InputTextPadrao from '../InputTextPadrao/InputTextPadrao';
import style from './styles';
import { InstituicaoResponse } from '../../interfaces/Instituicao';
import { useAuth } from '../../contexts/auth';
import { ConsultaRequest, ConsultaResponse, INITIAL_CONSULTA_REQUEST } from '../../interfaces/Consulta';
import { editarConsulta, criarConsulta } from '../../controllers/consultaApi';
import InputTextMascaraData from '../InputTextPadrao/InputTextMascaraData';
import { dataValida, localeDateToISO } from '../../utils/Validador';

import RNPickerSelect from 'react-native-picker-select';

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
  },
  btCancelar: {
    paddingBottom: 60
  },
  black: {
    color:'black'
  },
  select: {
    flex: 1,
    paddingTop: 2,
    alignItems: "center",
    borderColor: 'black',
    borderWidth:1
  }
});

export interface Props {
  flgAdd:boolean;
  consulta:ConsultaResponse;
  listaInstituicoes: InstituicaoResponse[],
  atualizar: boolean;
  setAtualizar: Function;
  visible: boolean;
  hideModal(): void; 
}

const ModalConsulta: React.FC<Props> = ({flgAdd, consulta, listaInstituicoes, atualizar, setAtualizar, visible, hideModal}) => {
  const { setAtualizarTelas } = useAuth();
  const containerStyle = {backgroundColor: 'white', padding: 20};
  const [dataConsulta, setDataConsulta ] = useState<string>(consulta.dataConsulta);
  const [nomeMedico, setNomeMedico ] = useState<string>(consulta.nomeMedico);
  const [diagnostico, setDiagnostico ] = useState<string>(consulta.diagnostico);
  const [prescricao, setPrescricao ] = useState<string>(consulta.prescricao);
  const [dadosInstituicao, setDadosInstituicao ] = useState<InstituicaoResponse>(consulta.dadosInstituicao);
  const [ mensagemDataConsulta, setMensagemDataConsulta ] = useState<string>("");

  const notify = useCallback((msg:string) => {
    ToastAndroid.show(msg,150);
  },[])

  const disable = useMemo(() => {
    return dataConsulta === '' || nomeMedico === '' || diagnostico === '' || prescricao === '' || dadosInstituicao === undefined;
  }, [dataConsulta, nomeMedico, diagnostico, prescricao, dadosInstituicao]);

  const editConsulta = useCallback(async () => {
    let auxAtualizar = !atualizar;
    let request: ConsultaRequest = INITIAL_CONSULTA_REQUEST;
    try{
      request.nomeMedico = nomeMedico;
      request.dataConsulta = localeDateToISO(dataConsulta);
      request.diagnostico = diagnostico;
      request.prescricao = prescricao;
      request.idArquivo = 0;
      request.idInstituicao = dadosInstituicao.id;
      request.nomeInstituicao = dadosInstituicao.nome;
      request.idContatoInstituicao = dadosInstituicao.contatoDTO.id;
      request.contatoUmInstituicao = dadosInstituicao.contatoDTO.contatoUm;
      request.contatoDoisInstituicao = dadosInstituicao.contatoDTO.contatoDois;
      request.idEnderecoInstituicao = dadosInstituicao.enderecoDTO.id;
      request.bairro = dadosInstituicao.enderecoDTO.bairro;
      request.cidade = dadosInstituicao.enderecoDTO.cidade;
      request.cep = dadosInstituicao.enderecoDTO.cep;
      request.rua = dadosInstituicao.enderecoDTO.rua;
      request.numero = dadosInstituicao.enderecoDTO.numero;
      request.rua = dadosInstituicao.enderecoDTO.rua;

      await editarConsulta(consulta.id, request);
      notify("Consulta editada com sucesso!");
    } catch(error){
      notify("Erro ao tentar editar consulta!");
    } finally{
      setAtualizar(auxAtualizar);
      setAtualizarTelas(auxAtualizar);
      hideModal();
    }
  }, [dataConsulta, nomeMedico, diagnostico, notify, prescricao, dadosInstituicao, consulta]);

  const addConsulta = useCallback(async () => {
    let auxAtualizar = !atualizar;
    try{
      let request: ConsultaRequest = INITIAL_CONSULTA_REQUEST;
      request.nomeMedico = nomeMedico;
      request.dataConsulta = localeDateToISO(dataConsulta);
      request.diagnostico = diagnostico;
      request.prescricao = prescricao;
      request.idArquivo = 0;
      request.idInstituicao = dadosInstituicao.id;
      request.nomeInstituicao = dadosInstituicao.nome;
      request.idContatoInstituicao = dadosInstituicao.contatoDTO.id;
      request.contatoUmInstituicao = dadosInstituicao.contatoDTO.contatoUm;
      request.contatoDoisInstituicao = dadosInstituicao.contatoDTO.contatoDois;
      request.idEnderecoInstituicao = dadosInstituicao.enderecoDTO.id;
      request.bairro = dadosInstituicao.enderecoDTO.bairro;
      request.cidade = dadosInstituicao.enderecoDTO.cidade;
      request.cep = dadosInstituicao.enderecoDTO.cep;
      request.rua = dadosInstituicao.enderecoDTO.rua;
      request.numero = dadosInstituicao.enderecoDTO.numero;
      request.rua = dadosInstituicao.enderecoDTO.rua;

      await criarConsulta(request);
      notify("Consulta cadastrado com sucesso!");
    } catch(error){
      notify("Erro ao tentar adicionar nova consulta!");
    } finally{
      setAtualizar(auxAtualizar);
      setAtualizarTelas(auxAtualizar);
      hideModal();
    }
  }, [consulta, notify, dataConsulta, nomeMedico, diagnostico, prescricao, dadosInstituicao]);

  const error = useMemo(() => {
    if(dataConsulta !== null)
      setMensagemDataConsulta(dataValida(consulta.dataConsulta));
    return mensagemDataConsulta !== "";
  },[mensagemDataConsulta, dataConsulta]);

  useEffect(() => {
    setDataConsulta(consulta.dataConsulta !== "" ? new Date(consulta.dataConsulta).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : "");
    setNomeMedico(consulta.nomeMedico);
    setPrescricao(consulta.prescricao);
    setDiagnostico(consulta.diagnostico);
  }, [consulta]);

  const [selectedValue, setSelectedValue] = useState("");
  
  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} >
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <Text style={style.marginTop}> {flgAdd ? translate('instituicao.titleAdd') : translate('instituicao.titleEdit')} </Text>

            <InputTextMascaraData
              label={translate('consulta.labels.data')}
              valor={dataConsulta}
              setValor={setDataConsulta}
              mensagemErro={!!!error ? mensagemDataConsulta : ""}
              style={""}
            />

            <InputTextPadrao 
              label={translate('consulta.labels.nome')}
              valor={nomeMedico}
              setValor={ setNomeMedico }
              mensagemErro={""}
              style={""}
              typeKeybord={'default'}
              quantidadeCaracteres={100}
            />

            <InputTextPadrao 
              label={translate('consulta.labels.diagnostico')}
              valor={diagnostico}
              setValor={ setDiagnostico }
              mensagemErro={""}
              style={""}
              typeKeybord={'default'}
              quantidadeCaracteres={100}
            />

            <InputTextPadrao 
              label={translate('consulta.labels.prescricao')}
              valor={prescricao}
              setValor={ setPrescricao }
              mensagemErro={""}
              style={""}
              typeKeybord={'default'}
              quantidadeCaracteres={100}
            />

            <View style={styles.select}>
              <Picker
                selectedValue={selectedValue}
                style={{ height: 50, width: '100%' }}
                onValueChange={(itemValue, itemIndex) => {
                  const aux = listaInstituicoes.find(item => item.id.toString() === itemValue );
                  setDadosInstituicao(aux);
                  return setSelectedValue(itemValue)
                }}
              >
                {
                 listaInstituicoes && listaInstituicoes.map( inst => <Picker.Item key={inst.id} label={inst.nome} value={inst.id.toString()} />)
                }
              </Picker>
            </View>

            <Button disabled={disable} onPress={() => flgAdd ? addConsulta() : editConsulta()}>
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

export default ModalConsulta;