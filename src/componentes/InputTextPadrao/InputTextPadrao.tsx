import React, { useMemo, useState } from 'react';
import {KeyboardAvoidingView} from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { InputProps } from '../../interfaces/ParametrosRequestTypes';
import { mascaraCep } from '../../utils/Mascaras';
import { campoStringVazio } from '../../utils/Validador';

export default({
    label,
    valor,
    setValor,
    mensagemErro,
    style,
    typeKeybord,
    quantidadeCaracteres,
    flgMascara,
    mascara,
}: InputProps) => {

    const [ valorDigitado, setValorDigitado ] = useState<string>(valor);

    const hasErrors = () => {
        return campoStringVazio(valor) || mensagemErro !== "";
    };

    useMemo(() => {
        if(flgMascara){
            const value = mascara(valorDigitado);
            setValor(value);
            return;
        }
        setValor(valorDigitado);
    },[mascara, flgMascara, valorDigitado]);

    return (
        <KeyboardAvoidingView>
            <TextInput
                style={style} 
                mode="outlined"
                label={label}
                keyboardType={typeKeybord}
                value={valor}
                maxLength={quantidadeCaracteres || 100}
                // defaultValue={t || ''}
                onChangeText={(value:string) => {
                    setValorDigitado(value.trim())
                }}
                error={mensagemErro !== "" ? true : false}
            />
            <HelperText type="error" visible={hasErrors()}>
                {mensagemErro}
            </HelperText>
        </KeyboardAvoidingView>
    );
}