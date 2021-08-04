import React, { useEffect, useState } from 'react';
import { StyleSheet, View} from 'react-native';
import { Button } from 'react-native-paper';
import { translate } from '../../locales';
import InputTextPadrao from './InputTextPadrao';

const styles = StyleSheet.create({
    celula: {
      width: 120
    }
  });

interface Iprops {
    flgEdit:boolean;
    campo:string;
    valor:string;
    idCampo:number;
    idValor: number;
    removeItem: (value:any) => void;
    funcaoAuxiliar: (idDoCampo:number, campoNovo:string, tipoCampo:boolean ) => void;
}

const InputsParametros: React.FC<Iprops> = ({ idCampo, idValor, campo, valor, funcaoAuxiliar, removeItem }) => {

    const [ newCampo, setNewCampo ] = useState<string>(campo);
    const [ newValor, setNewValor ] = useState<string>(valor);

    useEffect(() => {
      funcaoAuxiliar(idCampo, newCampo, true);
      campo = newCampo;
    }, [newCampo]);

    useEffect(() => {
      funcaoAuxiliar(idValor, newValor, false);
      valor = newValor;
    }, [ newValor]);

    return (
      <View
        style={{
            flexDirection: "row",
            display: 'flex',
            justifyContent: 'space-between'
        }}
      >
        <InputTextPadrao 
          label={translate('exame.labels.campo')}
          valor={newCampo}
          setValor={setNewCampo}
          mensagemErro={""}
          style={styles.celula}
          typeKeybord={'default'}
          quantidadeCaracteres={100}
        />

        <InputTextPadrao 
          label={translate('exame.labels.valor')}
          valor={newValor}
          setValor={setNewValor}
          mensagemErro={""}
          style={styles.celula}
          typeKeybord={'default'}
          quantidadeCaracteres={100}
        />
      </View>
    );
}

export default InputsParametros;