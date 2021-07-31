import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContextData } from '../interfaces/ParametrosRequestTypes';
import { ParametrosLogin, UsuarioRequest } from '../models/Usuario';
import { criarUsuario, realizarLogin } from '../controllers/usuarioApi';
import { ToastAndroid } from 'react-native';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [ user, setUser ] = useState<string>("");
    const [ loading, setLoading ] = useState(false);
    const [ novoUsuario, setNovoUsuario ] = useState(false);
    const [ atualizarTelas, setAtualizarTelas ] = useState<number>(0);

    const notify = useCallback((msg:string) => {
        ToastAndroid.show(msg,150);
    },[])

    async function signIn(parametros:ParametrosLogin) {  
        try{
            const response = await realizarLogin(parametros);
            await AsyncStorage.setItem('@GEAuth:token', response.headers.authorization);
            setUser(response.headers.authorization)
            console.log("Logou ")
        } catch(error) {
            notify("Verifique suas credenciais email ou senha incorreta!");
        }
    }

    async function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null);
        });        
    }

    async function cadastrarUsuario(request:UsuarioRequest) {
        try{
            await criarUsuario(request);
            setNovoUsuario(false);
            notify("Cadastro realizado com sucesso!");
        } catch(error) {
            notify("Erro ao finalizar o cadastro, verifique os dados se estão corretos!");
        }
    }

    async function navegarCadastroUsuario() {
        let aux = !novoUsuario;
        setNovoUsuario(aux);       
    }

    useEffect(() => {
        async function loadStoragedData() {
            const storageToken = await AsyncStorage.getItem('@GEAuth:token');
            if(storageToken) {
                setUser(storageToken);
                setLoading(false);
            }
        }

        loadStoragedData();
    }, []);

    return (
        <AuthContext.Provider value={{signed: !!user, atualizarTelas, setAtualizarTelas, loading, signIn, signOut, novoUsuario, navegarCadastroUsuario, cadastrarUsuario}}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}