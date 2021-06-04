import React, { useEffect, useMemo, useState } from 'react';
import { Button, ScrollView } from 'react-native';
import InputTextPadrao from '../../../componentes/InputTextPadrao/InputTextPadrao';
import { translate } from '../../../locales';
import styles from '../styles';
import {campoStringVazio} from '../../../utils/Validador';
import {mascaraCpf, mascaraData} from '../../../utils/Mascaras';

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

const mensagemPadrao = translate("alertPadrao");

type KeyboardType = 
    'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad' | 'decimal-pad';

export default function StepUm({setProgresso, setEtapa, nome, cpf, dataNascimento, email, senha,
setNome, setCpf, setDataNascimento, setEmail, setSenha, setTela }: Props) {
    const [ mensagemNome, setMensagemNome ] = useState<string>("");

    useEffect(() => {
        setTela(translate("cadastroUsuario.step1.title"));
    }, [setTela]);

    const verificaCampo = (valor: string):boolean => {
        return campoStringVazio(valor);
    }

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
        const flgNome = verificaCampo(nome);
        flgNome && setMensagemNome(mensagemPadrao);
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
                mensagemErro={(mensagemNome)}
                style={styles.marginTop}
                typeKeybord={'default'}
                flgMascara={false}
            />

            <InputTextPadrao 
                label={translate("cadastroUsuario.step1.cpf")}
                valor={cpf}
                setValor={setCpf}
                mensagemErro={("")}
                style={""}
                typeKeybord={'numeric'}
                quantidadeCaracteres={14}
                flgMascara={true}
                mascara={mascaraCpf}
            />

            <InputTextPadrao 
                label={translate("cadastroUsuario.step1.dataNascimento")}
                valor={dataNascimento}
                setValor={setDataNascimento}
                mensagemErro={("")}
                style={""}
                typeKeybord={'numeric'}
                quantidadeCaracteres={10}
                flgMascara={true}
                mascara={mascaraData}
            />

            <InputTextPadrao 
                label={translate("cadastroUsuario.step1.email")}
                valor={email}
                setValor={setEmail}
                mensagemErro={("")}
                style={""}
                typeKeybord={'email-address'}
                flgMascara={false}
            />

            <InputTextPadrao 
                label={translate("cadastroUsuario.step1.senha")}
                valor={senha}
                setValor={setSenha}
                mensagemErro={("")}
                style={""}
                typeKeybord={'visible-password'}
                flgMascara={false}
            />

            <Button disabled={!!!porcentagem} title={translate("botaoProximaEtapa")} onPress={t} />
        </ScrollView>

    );
}