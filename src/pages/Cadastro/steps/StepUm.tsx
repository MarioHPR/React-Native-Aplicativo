import React, { useEffect, useMemo, useState } from 'react';
import { Button, ScrollView } from 'react-native';
import InputTextPadrao from '../../../componentes/InputTextPadrao/InputTextPadrao';
import { translate } from '../../../locales';
import styles from '../styles';
import { dataValida, localeDateToISO, verificaEmailInvalido, verificaSenhaInvalida} from '../../../utils/Validador';
import InputTextMascaraData from '../../../componentes/InputTextPadrao/InputTextMascaraData';
import InputTextMascaraCpf from '../../../componentes/InputTextPadrao/InputTextMascaraCpf';
import InputPassWord from '../../../componentes/InputPassWord/InputPassWord';
import { UsuarioRequest } from '../../../models/Usuario';
interface Props {
    setProgresso: Function;
    progresso: number;
    setEtapa: Function;
    request: UsuarioRequest;
    setTela: Function;
}

const StepUm: React.FC<Props> = ({ setProgresso, progresso, setEtapa, setTela, request }) => {

    const [ nome, setNome ] = useState<string>(request.nome);
    const [ cpf, setCpf ] = useState<string>(request.cpf);
    const [ dataNascimento, setDataNascimento ] =useState<string>(request.dataNascimento);
    const [ email, setEmail ] = useState<string>(request.email);
    const [ senha, setSenha ] = useState<string>(request.senha);

    const [ mensagemDataNascimento, setMensagemDataNascimento ] = useState<string>("");
    const [ mensagemEmail, setMensagemEmail ] = useState<string>("");
    const [ mensagemSenha, setMensagemSenha ] = useState<string>("");

    const error = useMemo(() => {
        return (mensagemDataNascimento === "" && 
        mensagemEmail === "" && mensagemSenha === "");
    }, [mensagemDataNascimento, mensagemEmail, mensagemSenha]);

    const porcentagem = useMemo(() => {
        if(cpf !== "" && nome !== "" && email !== "" && 
        senha !== "" &&  dataNascimento !== "") {
            setMensagemDataNascimento(dataValida(dataNascimento));
            setMensagemEmail(verificaEmailInvalido(email));
            setMensagemSenha(verificaSenhaInvalida(senha));
            return false;
        }
        return true;
    }, [cpf, nome, email, senha, dataNascimento]);

    const enviarProximaEtapa = () => {
        !!!porcentagem && error && setEtapa(2);
    };

    useEffect(() => {
        setTela(translate("cadastroUsuario.step1.title"));
    }, [setTela]);

    useEffect(() => {  
        if(cpf !== "" && nome !== "" && email !== "" && 
        senha !== "" &&  dataNascimento !== "" && error) {
            let aux: number = progresso < 0.35 ? 0.35 : progresso;
            setProgresso(aux)
            request.nome = nome;
            request.cpf = cpf;
            request.dataNascimento = localeDateToISO(dataNascimento);
            request.email = email;
            request.senha = senha;
        }
    }, [cpf, nome, email, senha, dataNascimento]);

    return(
        <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >
            <InputTextPadrao 
                label={translate("cadastroUsuario.step1.nome")}
                valor={nome}
                setValor={ setNome }
                mensagemErro={""}
                style={styles.marginTop}
                typeKeybord={'default'}
                quantidadeCaracteres={100}
            />

            <InputTextMascaraCpf
                label={translate("cadastroUsuario.step1.cpf")}
                valor={cpf}
                setValor={setCpf}
                mensagemErro={""}
                style={styles.marginTop}
            />

            <InputTextMascaraData
                label={translate("cadastroUsuario.step1.dataNascimento")}
                valor={dataNascimento}
                setValor={setDataNascimento}
                mensagemErro={!!!error ? mensagemDataNascimento : ""}
                style={styles.marginTop}
            />
            
            <InputTextPadrao 
                label={translate("cadastroUsuario.step1.email")}
                valor={email}
                setValor={setEmail}
                mensagemErro={!!!error ? mensagemEmail : ""}
                style={""}
                typeKeybord={'email-address'}
                quantidadeCaracteres={50}
            />

            <InputPassWord 
                label={translate("cadastroUsuario.step1.senha")}
                valor={senha}
                setValor={setSenha}
                mensagemErro={!!!error ? mensagemSenha : ""}
                style={styles.marginTop} />

            <Button disabled={porcentagem} title={translate("botaoProximaEtapa")} onPress={enviarProximaEtapa} />
        </ScrollView>
    );
}

export default StepUm;