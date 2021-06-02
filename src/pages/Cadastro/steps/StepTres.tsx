import React, { useMemo, useState } from 'react';
import { Button } from 'react-native';
import { Headline } from 'react-native-paper';
import InputTextPadrao from '../../../componentes/InputTextPadrao/InputTextPadrao';
import { translate } from '../../../locales';
import styles from '../styles';

interface Props {
    setProgresso: Function;
    setEtapa: Function;
    contatoUm: string;
    setContatoUm: Function;
    contatoDois: string;
    setContatoDois: Function;
}

export default function StepTres({setEtapa, setProgresso, contatoUm, contatoDois, setContatoUm, setContatoDois}: Props) {

    const porcentagem = useMemo(() => {
        return contatoUm !== "" && contatoDois !== "";
    }, [contatoUm, contatoDois]);

    const t = () => {
        porcentagem && setProgresso(1);
    };

    const etapaAnterior = () => {
        setEtapa(2);
    };

    return(
        <>
            <Headline style={styles.h3}>{translate("cadastroUsuario.step3.title")}</Headline >

            <InputTextPadrao 
                label={translate("cadastroUsuario.step3.contato1")}
                valor={contatoUm}
                setValor={setContatoUm}
                mensagemErro={("")}
                style={styles.marginTop}
            />

            <InputTextPadrao 
                label={translate("cadastroUsuario.step3.contato2")}
                valor={contatoDois}
                setValor={setContatoDois}
                mensagemErro={("")}
                style={styles.marginTop}
            />

            <Button disabled={!!!porcentagem} title={translate("botaoEnviar")} onPress={t} />
            <Button title={translate("botaoEtapaAnterior")} onPress={etapaAnterior} />
        </>

    );
}