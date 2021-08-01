import { useState } from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import { translate } from '../../locales';
import InputTextPadrao from './InputTextPadrao';

const styles = StyleSheet.create({
    celula: {
      width: 150
    }
  });

interface Iprops {
    id: number;
    parametrosExistentes: any;
    adicionarParametro: Function;
}

export default({
    id,
    parametrosExistentes,
    adicionarParametro
}: Iprops) => {

    const [ campo, setCampo ] = useState();
    const [ valor, setValor ] = useState();

    return (
        <KeyboardAvoidingView>
            <View key={id}
                    style={{
                        flexDirection: "row",
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: 10
                    }}
                  >
                    <InputTextPadrao 
                      label={translate('exame.labels.campo')}
                      valor={campo}
                      setValor={setCampo}
                      mensagemErro={""}
                      style={styles.celula}
                      typeKeybord={'default'}
                      quantidadeCaracteres={100}
                    />

                    <InputTextPadrao 
                      label={translate('exame.labels.valor')}
                      valor={valor}
                      setValor={setValor}
                      mensagemErro={""}
                      style={styles.celula}
                      typeKeybord={'default'}
                      quantidadeCaracteres={100}
                    />
                  </View>
        </KeyboardAvoidingView>
    );
}