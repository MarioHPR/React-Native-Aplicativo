import React from 'react';
import {KeyboardAvoidingView, StyleSheet} from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { InputProps } from '../../interfaces/ParametrosRequestTypes';
import { campoStringVazio } from '../../utils/Validador';
import { TextInputMask } from 'react-native-masked-text';

export default({
    label,
    valor,
    setValor,
    mensagemErro,
    style
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
                defaultValue={valor || ''}
                style={style}
                error={mensagemErro !== "" ? true : false}
                render={(props) =>
                    <TextInputMask
                        {...props}
                        style={styles.input}
                        type={'cel-phone'}
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99) '
                        }}
                        value={valor}
                        onChangeText={ text => setValor(text.trim()) }
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