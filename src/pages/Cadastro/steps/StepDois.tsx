import React, { useMemo, useState } from 'react';
import { Button } from 'react-native';
import { Headline } from 'react-native-paper';
import InputTextPadrao from '../../../componentes/InputTextPadrao/InputTextPadrao';
import { translate } from '../../../locales';
import styles from '../styles';

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
}

export default function StepDois({
    setEtapa, setProgresso,
    cidade, cep, bairro, rua, numero,
    setCidade, setCep, setBairro, setRua, setNumero
}: Props) {

    const porcentagem = useMemo(() => {
        return cidade !== "" && cep !== "" &&
        bairro !== "" && rua !== "" && numero !== "";
    }, [cidade, cep, bairro, rua, numero]);

    const t = () => {
        porcentagem && setProgresso(0.70);
        setEtapa(3);
    };

    const etapaAnterior = () => {
        setEtapa(1);
    };

    return(
        <>
            <Headline style={styles.h3}>{translate("cadastroUsuario.step2.title")}</Headline >

            <InputTextPadrao 
                label={translate("cadastroUsuario.step2.cidade")}
                valor={cidade}
                setValor={setCidade}
                mensagemErro={("")}
                style={styles.marginTop}
            />

            <InputTextPadrao 
                label={translate("cadastroUsuario.step2.cep")}
                valor={cep}
                setValor={setCep}
                mensagemErro={("")}
                style={styles.marginTop}
            />

            <InputTextPadrao 
                label={translate("cadastroUsuario.step2.bairro")}
                valor={bairro}
                setValor={setBairro}
                mensagemErro={("")}
                style={styles.marginTop}
            />

            <InputTextPadrao 
                label={translate("cadastroUsuario.step2.rua")}
                valor={rua}
                setValor={setRua}
                mensagemErro={("")}
                style={styles.marginTop}
            />

            <InputTextPadrao 
                label={translate("cadastroUsuario.step2.numero")}
                valor={numero}
                setValor={setNumero}
                mensagemErro={("")}
                style={styles.marginTop}
            />



            

            <Button disabled={!!!porcentagem} title={translate("botaoProximaEtapa")} onPress={t} />
            <Button title={translate("botaoEtapaAnterior")} onPress={etapaAnterior} />
        </>

    );
}