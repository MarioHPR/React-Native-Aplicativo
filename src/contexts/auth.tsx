import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContextData } from '../interfaces/ParametrosRequestTypes';
import { ParametrosLogin, UsuarioRequest } from '../models/Usuario';
import { criarUsuario, realizarLogin } from '../controllers/usuarioApi';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [ user, setUser ] = useState<string>("");
    const [ loading, setLoading ] = useState(false);
    const [ novoUsuario, setNovoUsuario ] = useState(false);

    async function signIn(parametros:ParametrosLogin) {  
        console.log("sddssasada") 
        const response = await realizarLogin(parametros);
        await AsyncStorage.setItem('@GEAuth:token', response.headers.authorization);
        setUser(response.headers.authorization)
    }

    async function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null);
        });        
    }

    async function cadastrarUsuario(request:UsuarioRequest) {
        await criarUsuario(request);
       setNovoUsuario(false);
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
        <AuthContext.Provider value={{signed: !!user, user, loading, signIn, signOut, novoUsuario, navegarCadastroUsuario, cadastrarUsuario}}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}