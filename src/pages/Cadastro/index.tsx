import React, { useMemo, useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useAuth } from '../../contexts/auth';
import { translate } from '../../locales';
import styles from './styles';
import { Appbar, ProgressBar, Colors } from 'react-native-paper';
import InputTextPadrao from '../../componentes/InputTextPadrao/InputTextPadrao';

const CadastroUsuario: React.FC = () => {

    const { user, navegarCadastroUsuario } = useAuth();
    const [ progresso, setProgresso ] = useState<number>(0);
    const [ nome, setNome ] =useState<string>('');
    const [ cpf, setCpf ] =useState<string>('');
    const [ dataNascimento, setDataNascimento ] =useState<string>('');
    const [ email, setEmail ] =useState<string>('');
    const [ senha, setSenha ] = useState<string>('');

    const t = () => {
        let aux = 0;
        aux += nome !== "" ? 0.07 : 0;
        aux += cpf !== "" ? 0.07 : 0;
        aux += dataNascimento !== "" ? 0.07 : 0;
        aux += email !== "" ? 0.07 : 0;
        aux += senha !== "" ? 0.07 : 0;
        setProgresso(aux)
    };

    function handleSignOut() {
        navegarCadastroUsuario();
    }

    return (
        <>
            <Appbar.Header style={styles.headerContainer} >
                <Appbar.BackAction 
                    color='white'
                    onPress={handleSignOut} />
            </Appbar.Header>
            <ProgressBar progress={progresso} color={Colors.green900}style={styles.barraProgresso} />
            
            <View style={styles.container}>
                <InputTextPadrao 
                    label={translate("cadastroUsuario.step1.nome")}
                    valor={nome}
                    setValor={setNome}
                    mensagemErro=""
                    style={styles.marginTop}
                />

                <InputTextPadrao 
                    label={translate("cadastroUsuario.step1.cpf")}
                    valor={cpf}
                    setValor={setCpf}
                    mensagemErro=""
                    style={styles.marginTop}
                />

                <InputTextPadrao 
                    label={translate("cadastroUsuario.step1.dataNascimento")}
                    valor={dataNascimento}
                    setValor={setDataNascimento}
                    mensagemErro=""
                    style={styles.marginTop}
                />

                <InputTextPadrao 
                    label={translate("cadastroUsuario.step1.email")}
                    valor={email}
                    setValor={setEmail}
                    mensagemErro=""
                    style={styles.marginTop}
                />

                <InputTextPadrao 
                    label={translate("cadastroUsuario.step1.senha")}
                    valor={senha}
                    setValor={setSenha}
                    mensagemErro=""
                    style={styles.marginTop}
                />

                <Button title="Logout" onPress={t} />
            </View>
        </>
        // <View style={styles.container}>
            
        //     <Text>{user}</Text>
        //     <Button title="Logout" onPress={handleSignOut} />
        // </View>
    )
};

export default CadastroUsuario;