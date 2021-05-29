import React, { useState } from 'react';
import { View } from 'react-native';
import { useAuth } from '../../contexts/auth';
import { Icon, Text, Button } from 'react-native-elements';

import { TextInput } from 'react-native-paper';
import styles from './styles';
import { translate } from '../../locales';

const SignIn: React.FC = () => {

    const { navegarCadastroUsuario, signIn } = useAuth();
    const [ email, setEmail ] = useState<string>("");
    const [ senha, setSenha ] = useState<string>(""); 
    const [ trocarIcone, setTrocarIcone ] = useState<boolean>(true);
    const [ mensagemEmail, setMensagemEmail ] = useState<string>("");
    const [ mensagemSenha, setMensagemSenha ] = useState<string>("");

    function verificaEmailInvalido(valor:string){
        if(email === ""){
            setMensagemEmail( translate("alertPadrao") );
            return true;
        }  
        else if(!valor.includes('@gmail')){
            setMensagemEmail(translate("email.error.alertaEmail"));
            return true;
        }
        setMensagemEmail("");
        return false;
    }

    function verificaSenhaInvalido(valor:string){
        if(valor === ""){
            setMensagemSenha( translate("alertPadrao") );
            return true;
        }  
        else if(valor.length < 6){
            setMensagemSenha( translate("senha.error.alertMinimoCaracter") );
            return true;
        }
        setMensagemSenha("");
        return false;
    }

    function handleSignIn() {
        if(!verificaEmailInvalido(email) && !verificaSenhaInvalido(senha)){
            let parametros = {
                email: email.toLowerCase(),
                senha: senha,
            };
            signIn(parametros);
        }
    }

    return (
        <View style={styles.container}>
            <Text h3 style={styles.h3}>{translate("tituloApp")}</Text>
        
            <TextInput
                style={styles.marginTop} 
                mode="outlined"
                label={mensagemEmail === "" ? translate("email.title") : mensagemEmail}
                right={<TextInput.Affix text="/50" />}
                onChangeText={value => setEmail(value)}
                error={mensagemEmail !== "" ? true : false}
            />

            <TextInput
                style={styles.marginTop} 
                mode="outlined"
                label={mensagemSenha === "" ? translate("senha.title") : mensagemSenha}
                secureTextEntry={trocarIcone}
                right={
                    <TextInput.Icon name={ trocarIcone ? "eye-off" : "eye" }
                        onPress={ () => setTrocarIcone(!trocarIcone)}
                    />
                }
                onChangeText={value => setSenha(value)}
                error={mensagemSenha !== "" ? true : false}
            />

            <Button
                containerStyle={styles.marginTop}        
                icon={
                    <Icon
                        type="font-awesome"
                        name="arrow-right"
                        size={15}
                        color="white"
                    />
                }iconRight
                title={translate("botaoEntrar")}
                onPress={handleSignIn}
            />
            
            <Button
                containerStyle={styles.marginTop}
                icon={
                    <Icon
                    type="font-awesome"
                        name="arrow-right"
                        size={15}
                        color="blue"
                    />
                }
                iconRight
                title={translate("botaoCadastrar")}
                type="outline"
                onPress={navegarCadastroUsuario}
            />
        </View>
    )
};

export default SignIn;