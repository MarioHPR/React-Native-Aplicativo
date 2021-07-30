import React, { useState } from 'react';
import { View } from 'react-native';
import { useAuth } from '../../contexts/auth';
import styles from './styles';
import { Appbar, ProgressBar, Colors } from 'react-native-paper';
import StepUm from './steps/StepUm';
import StepDois from './steps/StepDois';
import StepTres from './steps/StepTres';
import { UsuarioRequest } from '../../models/Usuario';
import { INITIAL_REQUEST } from '../../interfaces/Usuario';

const CadastroUsuario: React.FC = () => {
    const { cadastrarUsuario, navegarCadastroUsuario } = useAuth();
    const [ progresso, setProgresso ] = useState<number>(0);
    const [ etapa, setEtapa ] = useState<number>(1);
    const [ tela, setTela ] = useState<string>("");
    const [ request ] = useState<UsuarioRequest>(INITIAL_REQUEST);
    
    function cadastrar() {
        cadastrarUsuario(request);
    }

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
                            setProgresso={setProgresso}
                            progresso={progresso}
                            setEtapa={setEtapa}
                            setTela={setTela}
                            request={request}
                        />
                }
                {
                    etapa === 2 &&
                        <StepDois
                            setProgresso={setProgresso}
                            progresso={progresso}
                            setEtapa={setEtapa}
                            setTela={setTela}
                            request={request}
                            />
                }
                {
                    etapa === 3 &&
                        <StepTres 
                            setProgresso={setProgresso}
                            progresso={progresso}
                            setEtapa={setEtapa}
                            setTela={setTela}
                            cadastrar={cadastrar}
                            request={request}
                        />
                }

            </View>
        </>
    )
};

export default CadastroUsuario;