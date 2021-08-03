import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Picker, ScrollView, StyleSheet, ToastAndroid, View } from 'react-native';
import { Modal, Portal, Text, Button, Provider, Dialog } from 'react-native-paper';
import { translate } from '../../locales';
import style from './styles';
import { InstituicaoResponse } from '../../interfaces/Instituicao';
import { useAuth } from '../../contexts/auth';
import { criarTipoExame } from '../../controllers/tipoExameApi';
import { editarExame } from '../../controllers/exameApi';
import InputTextMascaraData from '../InputTextPadrao/InputTextMascaraData';
import { dataValida, localeDateToISO } from '../../utils/Validador';
import { DadosExameEditRequest, DadosExameRequest, DadosExameResponse, INITIAL_EXAME_REQUEST } from '../../interfaces/Exame';
import { DadosTipoExameResponse, ItemCampoExame } from '../../interfaces/TipoExame';
import { INITIAL_PARAMETROS_REQUEST, ItemValorExameRequest } from '../../interfaces/ItemValorExame';;
import InputsParametros from '../InputTextPadrao/InputsParametros';

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
  }, title: {
    flex: 1,
    textAlign: 'center'
  }, celula: {
    width: 150
  }
});

export interface Props {
  flgAdd: boolean;
  exame: DadosExameResponse;
  listaInstituicoes: InstituicaoResponse[],
  listaTipoExame: DadosTipoExameResponse[],
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
  const [ parametroTipoExame, setParametrosTipoExame ] = useState<ItemCampoExame[]>();
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

  const atualizarParametros = (idDoCampo: number, campoNovo:string, tipoCampo:boolean) => {
    exame.parametros.forEach( item => {
      if(item.idItemCampoExame === idDoCampo && item.campo !== campoNovo && tipoCampo){
        item.campo = campoNovo;
      } 
      else if(item.idItemValorExame === idDoCampo && item.valor !== campoNovo && !tipoCampo){
        item.valor = campoNovo;
      }
    });
    setParametros(exame.parametros);
  }

  const [auxParametros, setAuxParametros] = useState<ItemValorExameRequest[]>();

  const addParametros = () => {
    let aux:ItemValorExameRequest[] = parametros;
    aux.push(INITIAL_PARAMETROS_REQUEST);
    setAuxParametros(aux);
  }

  useEffect(() => {
    setDataExame(exame.dataExame !== "" ? new Date(exame.dataExame).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : "");
    setNomeExame(exame.nomeExame);
    setParametros(exame.parametros);
    setDadosInstituicao(exame.dadosInstituicao);
    setSelectedValue(exame.dadosInstituicao.id ? exame.dadosInstituicao.id.toString() : "");
    setSelectedValueTipoExame(exame.nomeExame ? exame.nomeExame : "");
  }, [exame]);

  useEffect(() => {
    auxParametros && setParametros(auxParametros);
  }, [auxParametros]);

  return (
    <Provider>
      <Portal>
        <Dialog visible={visible} onDismiss={hideModal} style={{marginTop:80, flex:3}} >
          <Dialog.ScrollArea>
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
                    const aux:DadosTipoExameResponse = listaTipoExame.find(item => item.nomeExame === itemValue );
                    setNomeExame(aux.nomeExame ? aux.nomeExame : "");
                    setParametrosTipoExame(aux.itensCampo);
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
                <Text style={styles.title}>Parametros do exame</Text>
              { 
              parametros ? parametros.map( (campo, index) => <InputsParametros key={index} funcaoAuxiliar={atualizarParametros} idCampo={campo.idItemCampoExame} idValor={campo.idItemValorExame} flgEdit={!flgAdd} campo={campo.campo} valor={campo.valor} />
              ) : <Text>Não a parametros</Text>
              }

              <Button onPress={addParametros}> + Adicionar parametros</Button>

              <Button disabled={disable} onPress={() => flgAdd ? addExame() : editExame()}>
                { flgAdd ? translate("botaoEnviar") : translate("botaoEditar")}
              </Button>
              <Button style={styles.btCancelar} onPress={hideModal}>
                { translate("btCancelar") }
              </Button>
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>
      </Portal>
      
    </Provider>
  )
};

export default ModalExame;