import React from 'react';
import { TextInput, HelperText } from 'react-native-paper';
import { InputProps } from '../../interfaces/ParametrosRequestTypes';
import { campoStringVazio } from '../../utils/Validador';

export default({label, valor, setValor, mensagemErro, style}: InputProps) => {

    const hasErrors = () => {
        return campoStringVazio(valor) || mensagemErro !== "";
    };

    return (
        <>
            <TextInput
                style={style} 
                mode="outlined"
                label={label}
                onChangeText={value => setValor(value)}
                error={mensagemErro !== "" ? true : false}
            />
            <HelperText type="error" visible={hasErrors()}>
                {mensagemErro}
            </HelperText>
        </>
    );
}