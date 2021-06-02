import React, { useMemo, useState } from 'react';
import { Button } from 'react-native';
import { Headline } from 'react-native-paper';
import InputTextPadrao from '../../../componentes/InputTextPadrao/InputTextPadrao';
import { translate } from '../../../locales';
import styles from '../styles';

interface Props {
    setProgresso: Function;
    setEtapa: Function;
    nome: string;
    setNome: Function;
    cpf: string;
    setCpf: Function;
    dataNascimento: string;
    setDataNascimento: Function;
    email: string;
    setEmail: Function;
    senha: string;
    setSenha: Function;
}

export default function StepUm({setProgresso, setEtapa, nome, cpf, dataNascimento, email, senha,
setNome, setCpf, setDataNascimento, setEmail, setSenha }: Props) {

    const porcentagem = useMemo(() => {
        return cpf !== "" && nome !== "" && email !== "" && 
        senha !== "" &&  dataNascimento !== "";
    }, [cpf, nome, email, senha, dataNascimento]);

    const t = () => {
        porcentagem && setProgresso(0.35);
        porcentagem && setEtapa(2);
    };

    return(
        <>
            <Headline style={styles.h3}>{translate("cadastroUsuario.step1.title")}</Headline >
            <InputTextPadrao 
                label={translate("cadastroUsuario.step1.nome")}
                valor={nome}
                setValor={setNome}
                mensagemErro={("")}
                style={styles.marginTop}
            />

            <InputTextPadrao 
                label={translate("cadastroUsuario.step1.cpf")}
                valor={cpf}
                setValor={setCpf}
                mensagemErro={("")}
                style={styles.marginTop}
            />

            <InputTextPadrao 
                label={translate("cadastroUsuario.step1.dataNascimento")}
                valor={dataNascimento}
                setValor={setDataNascimento}
                mensagemErro={("")}
                style={styles.marginTop}
            />

            <InputTextPadrao 
                label={translate("cadastroUsuario.step1.email")}
                valor={email}
                setValor={setEmail}
                mensagemErro={("")}
                style={styles.marginTop}
            />

            <InputTextPadrao 
                label={translate("cadastroUsuario.step1.senha")}
                valor={senha}
                setValor={setSenha}
                mensagemErro={("")}
                style={styles.marginTop}
            />

            <Button disabled={!!!porcentagem} title={translate("botaoProximaEtapa")} onPress={t} />
        </>

    );
}