import React from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { InputProps } from '../../interfaces/ParametrosRequestTypes';
import { campoStringVazio } from '../../utils/Validador';
import { TextInputMask } from 'react-native-masked-text';

export default({
    label,
    valor,
    setValor,
    mensagemErro
}: InputProps) => {

    const hasErrors = () => {
        return campoStringVazio(valor) || mensagemErro !== "";
    };

    return (
        <KeyboardAvoidingView>
            <TextInput 
                label={label}
                mode="outlined"
                value={valor}
                error={mensagemErro !== "" ? true : false}
                render={(props) =>
                    <TextInputMask
                        {...props}
                        style={styles.input}
                        type={'datetime'}
                        options={{
                            format: 'DD/MM/YYYY'
                        }}
                        value={valor}
                        onChangeText={ text => {
                            setValor(text.trim())
                        } }
                    />
                }
            />
           
            <HelperText type="error" visible={hasErrors()}>
                {mensagemErro}
            </HelperText>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        paddingLeft: 20,
        fontSize:20,
        paddingTop:15,
        borderColor: 'blue'
    }
})