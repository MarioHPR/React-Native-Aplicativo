import React, { useEffect, useMemo, useState } from 'react';
import { Button, ScrollView } from 'react-native';
import { translate } from '../../../locales';
import styles from '../styles';
import InputTextMascaraTelefone from '../../../componentes/InputTextPadrao/InputTextMascaraTelefone';
import { UsuarioRequest } from '../../../models/Usuario';
interface Props {
    setProgresso: Function;
    progresso: number;
    setEtapa: Function;
    setTela: Function;
    cadastrar?: Function;
    request: UsuarioRequest;
}

const StepTres: React.FC<Props> = ({setEtapa, setProgresso, progresso, setTela, cadastrar, request}) => {

    const [ contatoUm, setContatoUm ] = useState<string>(request.contatoUm);
    const [ contatoDois, setContatoDois ] = useState<string>(request.contatoDois);

    const porcentagem = useMemo(() => {
        return( contatoUm !== "" && contatoDois !== "");
    }, [contatoUm, contatoDois]);

    const enviar = () => {
        console.log("adsadsa")
    };

    const etapaAnterior = () => {
        setEtapa(2);
    };

    useEffect(() => {
        setTela(translate("cadastroUsuario.step3.title"));
    }, [setTela]);

    useEffect(() => {
        if(contatoUm !== "" && contatoDois !== "") {
            request.contatoUm = contatoUm;
            request.contatoDois = contatoDois;
            let aux: number = progresso < 1 ? 1 : progresso;
            setProgresso(aux)
        }
    }, [contatoUm, contatoDois]);

    return(
        <ScrollView>

            <InputTextMascaraTelefone
                label={translate("cadastroUsuario.step3.contato1")}
                valor={contatoUm}
                setValor={setContatoUm}
                mensagemErro={("")}
                style={styles.marginTop}
                typeKeybord={'default'}
                quantidadeCaracteres={100}
            />

            <InputTextMascaraTelefone
                label={translate("cadastroUsuario.step3.contato2")}
                valor={contatoDois}
                setValor={setContatoDois}
                mensagemErro={("")}
                style={styles.marginTop}
            />

            <Button disabled={!!!porcentagem} title={translate("botaoEnviar")} onPress={enviar} />
            <Button title={translate("botaoEtapaAnterior")} onPress={etapaAnterior} />
        </ScrollView>

    );
}

export default StepTres;