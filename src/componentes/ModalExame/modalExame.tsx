import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Picker, ScrollView, StyleSheet, ToastAndroid, View } from 'react-native';
import { Modal, Portal, Text, Button, Provider, List } from 'react-native-paper';
import { translate } from '../../locales';
import InputTextPadrao from '../InputTextPadrao/InputTextPadrao';
import style from './styles';
import { InstituicaoResponse } from '../../interfaces/Instituicao';
import { useAuth } from '../../contexts/auth';
import { criarTipoExame } from '../../controllers/tipoExameApi';
import { editarExame } from '../../controllers/exameApi';
import InputTextMascaraData from '../InputTextPadrao/InputTextMascaraData';
import { dataValida, localeDateToISO } from '../../utils/Validador';

import RNPickerSelect from 'react-native-picker-select';
import { DadosExameEditRequest, DadosExameRequest, DadosExameResponse, INITIAL_EXAME_REQUEST } from '../../interfaces/Exame';
import { TipoExameResponse } from '../../interfaces/TipoExame';
import { ItemValorExameRequest } from '../../interfaces/ItemValorExame';

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
    borderWidth:1,
    borderRadius:4
  },
  selectLocalidade: {
    flex: 1,
    marginTop:20,
    paddingTop: 2,
    alignItems: "center",
    borderColor: 'black',
    borderWidth:1,
    borderRadius:4
  }
});

export interface Props {
  flgAdd: boolean;
  exame: DadosExameResponse;
  listaInstituicoes: InstituicaoResponse[],
  listaTipoExame: TipoExameResponse[],
  atualizar: boolean;
  setAtualizar: Function;
  visible: boolean;
  hideModal(): void; 
}

const ModalExame: React.FC<Props> = ({flgAdd, exame, listaTipoExame, listaInstituicoes, atualizar, setAtualizar, visible, hideModal}) => {
  const { setAtualizarTelas } = useAuth();
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const [dataExame, setDataExame ] = useState<string>(exame.dataExame);
  const [nomeExame, setNomeExame ] = useState<string>(exame.nomeExame);
  const [parametros, setParametros ] = useState<ItemValorExameRequest[]>(exame.parametros);
  const [dadosInstituicao, setDadosInstituicao ] = useState<InstituicaoResponse>(exame.dadosInstituicao);
  const [ mensagemDataConsulta, setMensagemDataConsulta ] = useState<string>("");

  const notify = useCallback((msg:string) => {
    ToastAndroid.show(msg,150);
  },[])

  const disable = useMemo(() => {
    return dataExame === '' || nomeExame === '' || dadosInstituicao === undefined;
  }, [dataExame, nomeExame, dadosInstituicao]);

  const editExame = useCallback(async () => {
    let auxAtualizar = !atualizar;
    let request: DadosExameEditRequest = INITIAL_EXAME_REQUEST;
    try{
      request.nomeInstituicao = dadosInstituicao.nome;
      request.bairro = dadosInstituicao.enderecoDTO.bairro;
      request.cidade = dadosInstituicao.enderecoDTO.cidade;
      request.cep = dadosInstituicao.enderecoDTO.cep;
      request.rua = dadosInstituicao.enderecoDTO.rua;
      request.numero = dadosInstituicao.enderecoDTO.numero;
      request.contatoUmInstituicao = dadosInstituicao.contatoDTO.contatoUm;
      request.contatoDoisInstituicao = dadosInstituicao.contatoDTO.contatoDois;
      request.idInstituicao = dadosInstituicao?.id;
      request.idArquivo = 0;
      request.parametros = parametros;
      request.nomeExame = nomeExame;
      request.dataExame = localeDateToISO(dataExame);
  

      await editarExame(exame.id, request);
      notify("Exame editado com sucesso!");
    } catch(error){
      notify("Erro ao tentar editar exame!");
    } finally{
      setAtualizar(auxAtualizar);
      setAtualizarTelas(auxAtualizar);
      hideModal();
    }
  }, [dadosInstituicao, notify, parametros, nomeExame, dataExame]);

  const addExame = useCallback(async () => {
    let auxAtualizar = !atualizar;
    try{
      let request: DadosExameRequest = INITIAL_EXAME_REQUEST;
      request.nomeInstituicao = dadosInstituicao.nome;
      request.bairro = dadosInstituicao.enderecoDTO.bairro;
      request.cidade = dadosInstituicao.enderecoDTO.cidade;
      request.cep = dadosInstituicao.enderecoDTO.cep;
      request.rua = dadosInstituicao.enderecoDTO.rua;
      request.numero = dadosInstituicao.enderecoDTO.numero;
      request.contatoUmInstituicao = dadosInstituicao.contatoDTO.contatoUm;
      request.contatoDoisInstituicao = dadosInstituicao.contatoDTO.contatoDois;
      request.idInstituicao = dadosInstituicao?.id;
      request.idArquivo = 0;
      request.parametros = parametros;
      request.nomeExame = nomeExame;
      request.dataExame = localeDateToISO(dataExame);

      await criarTipoExame(request);
      notify("Exame cadastrado com sucesso!");
    } catch(error){
      notify("Erro ao tentar adicionar novo exame!");
    } finally{
      setAtualizar(auxAtualizar);
      setAtualizarTelas(auxAtualizar);
      hideModal();
    }
  }, [dadosInstituicao, notify, parametros, nomeExame, dataExame]);

  const error = useMemo(() => {
    if(dataExame !== null)
      setMensagemDataConsulta(dataValida(dataExame));
    return mensagemDataConsulta !== "";
  },[mensagemDataConsulta, dataExame]);

  const [selectedValue, setSelectedValue] = useState<string>();
  const [selectedValueTipoExame, setSelectedValueTipoExame] = useState<string>();

  useEffect(() => {
    setDataExame(exame.dataExame !== "" ? new Date(exame.dataExame).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : "");
    setNomeExame(exame.nomeExame);
    setParametros(exame.parametros);
    setDadosInstituicao(exame.dadosInstituicao);
    setSelectedValue(exame.dadosInstituicao.id ? exame.dadosInstituicao.id.toString() : "");
    setSelectedValueTipoExame(exame.nomeExame ? exame.nomeExame : "");
  }, [exame]);

  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} >
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <Text style={style.marginTop}> {flgAdd ? translate('exame.titleAdd') : translate('exame.titleEdit')} </Text>

            <InputTextMascaraData
              label={translate('exame.labels.data')}
              valor={dataExame}
              setValor={setDataExame}
              mensagemErro={!!!error ? mensagemDataConsulta : ""}
              style={""}
            />

            <View style={styles.select}>
              <Picker
                selectedValue={selectedValueTipoExame}
                style={{ height: 50, width: '100%' }}
                onValueChange={(itemValue, itemIndex) => {
                  const aux:TipoExameResponse = listaTipoExame.find(item => item.nomeExame === itemValue );
                  setNomeExame(aux.nomeExame ? aux.nomeExame : "");
                  return setSelectedValueTipoExame(itemValue)
                }}
              >
                {
                 listaTipoExame && listaTipoExame.map( tipo => <Picker.Item key={tipo.id} label={tipo.nomeExame} value={tipo.nomeExame} />)
                }
              </Picker>
            </View>

            <View style={styles.selectLocalidade}>
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

            <Button disabled={disable} onPress={() => flgAdd ? addExame() : editExame()}>
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

export default ModalExame;