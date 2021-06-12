import React, { useState } from 'react';
import { View } from 'react-native';
import { useAuth } from '../../contexts/auth';
import styles from './styles';
import { translate } from '../../locales';
import {
    verificaEmailInvalido,
    verificaSenhaInvalida } from '../../utils/Validador';
import InputTextPadrao from '../../componentes/InputTextPadrao/InputTextPadrao';
import InputPassWord from '../../componentes/InputPassWord/InputPassWord';
import ButtonComIconPadrao from '../../componentes/ButtonComIconPadrao/ButtonComIconPadrao';
import { Headline } from 'react-native-paper';

const SignIn: React.FC = () => {

    const { navegarCadastroUsuario, signIn } = useAuth();
    const [ email, setEmail ] = useState<string>("");
    const [ senha, setSenha ] = useState<string>(""); 
    const [ mensagemEmail, setMensagemEmail ] = useState<string>("");
    const [ mensagemSenha, setMensagemSenha ] = useState<string>("");

    const verificaCampoEmail = (): boolean => {
        setMensagemEmail(verificaEmailInvalido(email));
        return verificaEmailInvalido(email) === "";
    }

    const verificaCampoSenha = (): boolean => {
        setMensagemSenha(verificaSenhaInvalida(senha));
        return verificaEmailInvalido(email) === "";
    }

    const handleSignIn = () => {
        const flgEmail = verificaCampoEmail();
        const flgSenha = verificaCampoSenha();
        if(flgEmail && flgSenha){
            let parametros = {
                email: email.toLowerCase(),
                senha: senha,
            };
            signIn(parametros);
        }
    }
    return (
        <View style={styles.container}>
            <Headline  style={styles.h3}>{translate("tituloApp")}</Headline >
        
            <InputTextPadrao 
                label={translate("email.title")}
                valor={email}
                setValor={setEmail}
                mensagemErro={mensagemEmail}
                style={styles.marginTop}
                typeKeybord={'email-address'}
                quantidadeCaracteres={100}
                flgMascara={false}
                mascara={() => {}}
            />

            <InputPassWord 
                label={translate("senha.title")}
                valor={senha}
                setValor={setSenha}
                mensagemErro={mensagemSenha}
                style={styles.marginTop} />

            <ButtonComIconPadrao 
                nomeBotao={translate("botaoEntrar")}
                acao={handleSignIn}
                style={styles.marginTop}
                icon="arrow-right"
                type="solid" />
            
            <ButtonComIconPadrao 
                nomeBotao={translate("botaoCadastrar")}
                acao={navegarCadastroUsuario}
                style={styles.marginTop}
                icon="arrow-right"
                type="outline" />
        </View>
    )
};

export default SignIn;