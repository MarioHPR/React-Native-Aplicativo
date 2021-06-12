import React, { useEffect, useMemo, useState } from 'react';
import { Button, ScrollView } from 'react-native';
import InputTextPadrao from '../../../componentes/InputTextPadrao/InputTextPadrao';
import { translate } from '../../../locales';
import { UsuarioRequest } from '../../../models/Usuario';
import styles from '../styles';

interface Props {
    setProgresso: Function;
    progresso: number;
    setEtapa: Function;
    setTela: Function;
    request: UsuarioRequest;
}

const StepDois: React.FC<Props> = ({setEtapa, setProgresso, progresso, setTela, request}) => {

    const [ cidade, setCidade ] = useState<string>(request.cidade);
    const [ cep, setCep ] = useState<string>(request.cep);
    const [ bairro, setBairro ] = useState<string>(request.bairro);
    const [ rua, setRua ] = useState<string>(request.rua);
    const [ numero, setNumero ] = useState<number>(request.numero);

    const porcentagem = useMemo(() => {
        return (cidade !== "" && cep !== "" &&
            bairro !== "" && rua !== "" && numero !== 0);
    }, [cidade, cep, bairro, rua, numero]);

    const enviarProximaEtapa = () => {
        porcentagem && setEtapa(3);
    };

    const etapaAnterior = () => {
        setEtapa(1);
    };

    useEffect(() => {
        setTela(translate("cadastroUsuario.step2.title"));
    }, [setTela]);

    useEffect(() => {  
        if(cidade !== "" && cep !== "" &&
        bairro !== "" && rua !== "" && numero !== 0) {
            let aux: number = progresso < 0.7 ? 0.7 : progresso;
            setProgresso(aux)
            request.cidade = cidade;
            request.cep = cep;
            request.bairro = bairro;
            request.rua = rua;
            request.numero = numero;
        }
    }, [cidade, cep, bairro, rua, numero]);

    return(
        <ScrollView>
            <InputTextPadrao 
                label={translate("cadastroUsuario.step2.cidade")}
                valor={cidade}
                setValor={setCidade}
                mensagemErro={("")}
                style={styles.marginTop}
                typeKeybord={'default'}
            />

            <InputTextPadrao 
                label={translate("cadastroUsuario.step2.cep")}
                valor={cep}
                setValor={setCep}
                mensagemErro={("")}
                style={""}
                typeKeybord={'numeric'}
                quantidadeCaracteres={11}
            />

            <InputTextPadrao 
                label={translate("cadastroUsuario.step2.bairro")}
                valor={bairro}
                setValor={setBairro}
                mensagemErro={("")}
                style={""}
                typeKeybord={'default'}
            />

            <InputTextPadrao 
                label={translate("cadastroUsuario.step2.rua")}
                valor={rua}
                setValor={setRua}
                mensagemErro={("")}
                style={""}
                typeKeybord={'default'}
            />

            <InputTextPadrao 
                label={translate("cadastroUsuario.step2.numero")}
                valor={numero.toString()}
                setValor={setNumero}
                mensagemErro={("")}
                style={""}
                typeKeybord={'numeric'}
            />

            <Button disabled={!!!porcentagem} title={translate("botaoProximaEtapa")} onPress={enviarProximaEtapa} />
            <Button title={translate("botaoEtapaAnterior")} onPress={etapaAnterior} />
        </ScrollView>

    );
}

export default StepDois;