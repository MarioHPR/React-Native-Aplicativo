import React, { useMemo, useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useAuth } from '../../contexts/auth';
import { translate } from '../../locales';
import styles from './styles';
import { Appbar, ProgressBar, Colors } from 'react-native-paper';
import InputTextPadrao from '../../componentes/InputTextPadrao/InputTextPadrao';
import StepUm from './steps/StepUm';
import StepDois from './steps/StepDois';
import StepTres from './steps/StepTres';

const CadastroUsuario: React.FC = () => {

    const { navegarCadastroUsuario } = useAuth();
    const [ progresso, setProgresso ] = useState<number>(0);
    const [ etapa, setEtapa ] = useState<number>(1);
    const [ tela, setTela ] = useState<string>("");
    const [ nome, setNome ] = useState<string>('');
    const [ cpf, setCpf ] = useState<string>('');
    const [ dataNascimento, setDataNascimento ] =useState<string>('');
    const [ email, setEmail ] = useState<string>('');
    const [ senha, setSenha ] = useState<string>('');

    const [ cidade, setCidade ] = useState<string>('');
    const [ cep, setCep ] = useState<string>('');
    const [ bairro, setBairro ] = useState<string>('');
    const [ rua, setRua ] = useState<string>('');
    const [ numero, setNumero ] = useState<string>('');

    const [ contatoUm, setContatoUm ] = useState<string>('');
    const [ contatoDois, setContatoDois ] = useState<string>('');
    
    function handleSignOut() {
        navegarCadastroUsuario();
    }

    return (
        <>
            <Appbar.Header style={styles.headerContainer} >
                <Appbar.BackAction 
                    color='white'
                    onPress={handleSignOut} />
                <Appbar.Content title="Cadastro" subtitle={tela} color='white' />
            </Appbar.Header>
            <ProgressBar progress={progresso} color={Colors.green900}style={styles.barraProgresso} />
            
            <View style={styles.container}>
                {
                    etapa === 1  &&
                        <StepUm 
                            setProgresso={setProgresso} setEtapa={setEtapa}
                            nome={nome} setNome={setNome}
                            cpf={cpf} setCpf={setCpf}
                            dataNascimento={dataNascimento} setDataNascimento={setDataNascimento}
                            email={email} setEmail={setEmail}
                            senha={senha} setSenha={setSenha}
                            setTela={setTela}
                        />
                }
                {
                    etapa === 2 &&
                        <StepDois
                            setProgresso={setProgresso} setEtapa={setEtapa}
                            cidade={cidade} setCidade={setCidade}
                            cep={cep} setCep={setCep}
                            bairro={bairro} setBairro={setBairro}
                            rua={rua} setRua={setRua}
                            numero={numero} setNumero={setNumero}
                            setTela={setTela}
                            />
                }
                {
                    etapa === 3 &&
                        <StepTres 
                            setProgresso={setProgresso} setEtapa={setEtapa}
                            contatoUm={contatoUm} setContatoUm={setContatoUm}
                            contatoDois={contatoDois} setContatoDois={setContatoDois}
                            setTela={setTela}
                        />
                }

            </View>
        </>
        // <View style={styles.container}>
            
        //     <Text>{user}</Text>
        //     <Button title="Logout" onPress={handleSignOut} />
        // </View>
    )
};

export default CadastroUsuario;