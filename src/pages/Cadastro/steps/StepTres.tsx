import React, { useEffect, useMemo, useState } from 'react';
import { Button, ScrollView } from 'react-native';
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
    setTela: Function;
}

export default function StepTres({
    setEtapa,
    setProgresso,
    contatoUm,
    contatoDois,
    setContatoUm,
    setContatoDois,
    setTela
}: Props) {

    useEffect(() => {
        setTela(translate("cadastroUsuario.step3.title"));
    }, [setTela]);

    const porcentagem = useMemo(() => {
        if( contatoUm !== "" && contatoDois !== ""){
            setProgresso(1)
            return true;
        }
        setProgresso(0.70)
        return false;
    }, [contatoUm, contatoDois]);

    const t = () => {
        // porcentagem && setProgresso(1);
    };

    const etapaAnterior = () => {
        setEtapa(2);
    };

    return(
        <ScrollView>
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
        </ScrollView>

    );
}