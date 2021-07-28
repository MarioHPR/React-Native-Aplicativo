import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {KeyboardAvoidingView} from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { InputProps } from '../../interfaces/ParametrosRequestTypes';
import { campoStringVazio } from '../../utils/Validador';

export default({
    label,
    valor,
    setValor,
    mensagemErro,
    style,
    typeKeybord,
    quantidadeCaracteres
}: InputProps) => {

    const hasErrors = () => {
        return campoStringVazio(valor) || mensagemErro !== "";
    };

    return (
        <KeyboardAvoidingView>
            <TextInput
                style={style} 
                mode="outlined"
                label={label}
                keyboardType={typeKeybord}
                value={valor}
                maxLength={quantidadeCaracteres || 100}
                defaultValue={valor || ''}
                onChangeText={(value:string) => setValor(value)}
                error={mensagemErro !== "" ? true : false}
            />
            <HelperText type="error" visible={hasErrors()}>
                {mensagemErro}
            </HelperText>
        </KeyboardAvoidingView>
    );
}