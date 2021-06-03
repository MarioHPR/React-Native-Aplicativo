import React, { useEffect, useMemo, useState } from 'react';
import { Button, ScrollView } from 'react-native';
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
    setTela: Function;
}

export default function StepUm({setProgresso, setEtapa, nome, cpf, dataNascimento, email, senha,
setNome, setCpf, setDataNascimento, setEmail, setSenha, setTela }: Props) {

    useEffect(() => {
        setTela(translate("cadastroUsuario.step1.title"));
    }, [setTela]);

    const porcentagem = useMemo(() => {
        if(cpf !== "" && nome !== "" && email !== "" && 
        senha !== "" &&  dataNascimento !== "") {
            setProgresso(0.35);
            return true;
        }
        setProgresso(0);
        return false;
    }, [cpf, nome, email, senha, dataNascimento]);

    const t = () => {
        porcentagem && setEtapa(2);
    };

    return(
        <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >
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
                style={""}
            />

            <InputTextPadrao 
                label={translate("cadastroUsuario.step1.dataNascimento")}
                valor={dataNascimento}
                setValor={setDataNascimento}
                mensagemErro={("")}
                style={""}
            />

            <InputTextPadrao 
                label={translate("cadastroUsuario.step1.email")}
                valor={email}
                setValor={setEmail}
                mensagemErro={("")}
                style={""}
            />

            <InputTextPadrao 
                label={translate("cadastroUsuario.step1.senha")}
                valor={senha}
                setValor={setSenha}
                mensagemErro={("")}
                style={""}
            />

            <Button disabled={!!!porcentagem} title={translate("botaoProximaEtapa")} onPress={t} />
        </ScrollView>

    );
}