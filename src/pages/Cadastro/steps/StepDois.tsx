import React, { useEffect, useMemo, useState } from 'react';
import { Button, ScrollView } from 'react-native';
import InputTextPadrao from '../../../componentes/InputTextPadrao/InputTextPadrao';
import { translate } from '../../../locales';
import styles from '../styles';
import {mascaraCep} from '../../../utils/Mascaras';

interface Props {
    setProgresso: Function;
    setEtapa: Function;
    cidade: string;
    setCidade: Function;
    cep: string;
    setCep: Function;
    bairro: string;
    setBairro: Function;
    rua: string;
    setRua: Function;
    numero: string;
    setNumero: Function;
    setTela: Function;
}

export default function StepDois({
    setEtapa, setProgresso,
    cidade, cep, bairro, rua, numero,
    setCidade, setCep, setBairro, setRua, setNumero, setTela
}: Props) {

    useEffect(() => {
        setTela(translate("cadastroUsuario.step2.title"));
    }, [setTela]);

    const porcentagem = useMemo(() => {
        if(cidade !== "" && cep !== "" &&
            bairro !== "" && rua !== "" && numero !== ""){
                setProgresso(0.70);
                return true;
        }
        setProgresso(0.35);
        return false;
    }, [cidade, cep, bairro, rua, numero]);

    const t = () => {
        setEtapa(3);
    };

    const etapaAnterior = () => {
        setEtapa(1);
    };

    return(
        <ScrollView>
            <InputTextPadrao 
                label={translate("cadastroUsuario.step2.cidade")}
                valor={cidade}
                setValor={setCidade}
                mensagemErro={("")}
                style={styles.marginTop}
                typeKeybord={'default'}
                flgMascara={false}
            />

            <InputTextPadrao 
                label={translate("cadastroUsuario.step2.cep")}
                valor={cep}
                setValor={setCep}
                mensagemErro={("")}
                style={""}
                typeKeybord={'numeric'}
                quantidadeCaracteres={11}
                flgMascara={true}
                mascara={mascaraCep}
            />

            <InputTextPadrao 
                label={translate("cadastroUsuario.step2.bairro")}
                valor={bairro}
                setValor={setBairro}
                mensagemErro={("")}
                style={""}
                typeKeybord={'default'}
                flgMascara={false}
            />

            <InputTextPadrao 
                label={translate("cadastroUsuario.step2.rua")}
                valor={rua}
                setValor={setRua}
                mensagemErro={("")}
                style={""}
                typeKeybord={'default'}
                flgMascara={false}
            />

            <InputTextPadrao 
                label={translate("cadastroUsuario.step2.numero")}
                valor={numero}
                setValor={setNumero}
                mensagemErro={("")}
                style={""}
                typeKeybord={'numeric'}
                flgMascara={false}
            />

            <Button disabled={!!!porcentagem} title={translate("botaoProximaEtapa")} onPress={t} />
            <Button title={translate("botaoEtapaAnterior")} onPress={etapaAnterior} />
        </ScrollView>

    );
}