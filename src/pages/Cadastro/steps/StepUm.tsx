import React, { useMemo, useState } from 'react';
import InputTextPadrao from '../../../componentes/InputTextPadrao/InputTextPadrao';
import { translate } from '../../../locales';
import styles from '../styles';

export default function StepUm() {

    const [ nome, setNome ] =useState<string>('');
    const [ cpf, setCpf ] =useState<string>('');
    const [ dataNascimento, setDataNascimento ] =useState<string>('');
    const [ email, setEmail ] =useState<string>('');
    const [ senha, setSenha ] = useState<string>('');

    useMemo<void>(() => {
        let aux = 0;
        aux += nome !== "" ? 0.07 : 0;
        aux += cpf !== "" ? 0.07 : 0;
        aux += dataNascimento !== "" ? 0.07 : 0;
        aux += email !== "" ? 0.07 : 0;
        aux += senha !== "" ? 0.07 : 0;
        console.log(aux)]
    },[nome, cpf, dataNascimento, email, senha]);

    return(
        <>
            <InputTextPadrao 
                label={translate("email.title")}
                valor={nome}
                setValor={setNome}
                mensagemErro={("")}
                style={styles.marginTop}
            />

            <InputTextPadrao 
                label={translate("email.title")}
                valor={cpf}
                setValor={setCpf}
                mensagemErro={("")}
                style={styles.marginTop}
            />

            <InputTextPadrao 
                label={translate("email.title")}
                valor={dataNascimento}
                setValor={setDataNascimento}
                mensagemErro={("")}
                style={styles.marginTop}
            />

            <InputTextPadrao 
                label={translate("email.title")}
                valor={email}
                setValor={setEmail}
                mensagemErro={("")}
                style={styles.marginTop}
            />

            <InputTextPadrao 
                label={translate("email.title")}
                valor={senha}
                setValor={setSenha}
                mensagemErro={("")}
                style={styles.marginTop}
            />
        </>

    );
}