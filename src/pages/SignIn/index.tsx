import React, { useState } from 'react';
import {  StyleSheet, View } from 'react-native';
import { useAuth } from '../../contexts/auth';
import { Icon, Input, Text, Button } from 'react-native-elements';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    h3: {
        textAlign: 'center',
        justifyContent: 'center'
    },
    btPadrao: {
        marginTop: 10,
    },
});

interface variavel {
    valor: string;
}
const SignIn: React.FC = () => {

    const { signed, signIn } = useAuth();
    const [ email, setEmail ] = useState<string>("");
    const [ senha, setSenha ] = useState<string>(""); 
    const [ trocarIcone, setTrocarIcone ] = useState<boolean>(true);
    const [ mensagemEmail, setMensagemEmail ] = useState<string>("");
    const [ mensagemSenha, setMensagemSenha ] = useState<string>("");

    const alertaPadrao = "Preenchimento obrigatorio!";
    const alertaEmail = "Email deve conter \"@gmail.com\" como domínio!";
    const alertaFormatoSenha = "Minimo de 6 caracteres!";

    function verificaEmailInvalido(valor){
        if(email === ""){
            setMensagemEmail( alertaPadrao );
            return true;
        }  
        else if(!valor.includes('@gmail')){
            setMensagemEmail(alertaEmail);
            return true;
        }
        setMensagemEmail("");
        return false;
    }

    function verificaSenhaInvalido(valor){
        if(valor === ""){
            setMensagemSenha( alertaPadrao );
            return true;
        }  
        else if(valor.length < 6){
            setMensagemSenha( alertaFormatoSenha );
            return true;
        }
        setMensagemSenha("");
        return false;
    }

    function handleSignIn() {
        if(!verificaEmailInvalido(email) && !verificaSenhaInvalido(senha)){
            const parametros = {
                email: email.toLowerCase(),
                senha: senha,
            };
            signIn(parametros);
        }
    }

    return (
        <View style={styles.container}>
            <Text h3 style={styles.h3}>Gerenciador</Text>
            <Input 
                placeholder="E-mail"
                leftIcon={{ type: 'font-awesome', name: 'at' }}
                keyboardType="email-address"
                onChangeText={value => setEmail(value)}
                errorMessage={ mensagemEmail }
            />
            <Input 
                placeholder="Senha"
                errorMessage={ mensagemSenha }
                leftIcon={
                    <Icon
                        type="font-awesome"
                        name={trocarIcone ? "lock" : "unlock"}
                        size={30}
                        color="black"
                    />
                }
                rightIcon={
                    <Icon
                        type="font-awesome"
                        name={trocarIcone ? "eye-slash" : "eye"}
                        size={30}
                        color="black"
                        onPress={ () => setTrocarIcone(!trocarIcone)}
                    />
                }
                secureTextEntry={trocarIcone}
                onChangeText={value => setSenha(value)}
            />

            <Button
                containerStyle={styles.btPadrao}        
                icon={
                    <Icon
                        type="font-awesome"
                        name="arrow-right"
                        size={15}
                        color="white"
                    />
                }iconRight
                title="Entrar               "
                onPress={handleSignIn}
            />
            
            <Button
                containerStyle={styles.btPadrao}
                icon={
                    <Icon
                    type="font-awesome"
                        name="arrow-right"
                        size={15}
                        color="blue"
                    />
                }
                iconRight
                title="Cadastrar-se   "
                type="outline"
            />
        </View>
    )
};

export default SignIn;