import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

import { AuthContextData } from '../interfaces/ParametrosRequestTypes';
import { ParametrosLogin, UsuarioRequest } from '../models/Usuario';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [ user, setUser ] = useState<string>("");
    const [ loading, setLoading ] = useState(false);
    const [ novoUsuario, setNovoUsuario ] = useState(false);

    useEffect(() => {
        async function loadStoragedData() {
            const storageToken = await AsyncStorage.getItem('@GEAuth:token');
            if(storageToken) {
                api.defaults.headers.Authorization = `${storageToken}`;
                setUser(storageToken);
                setLoading(false);
            }
        }

        loadStoragedData();
    }, []);

    async function signIn(parametros:ParametrosLogin) {   
        const response = await api.post('/login', parametros);
        await AsyncStorage.setItem('@GEAuth:token', response.headers.authorization);
        setUser(response.headers.authorization)
    }

    async function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null);
        });        
    }

    async function cadastrarUsuario(request:UsuarioRequest) {
        const response = await api.post('/api/usuario/salvar', JSON.stringify(request));
        console.log("wqeqweqweqw")
        console.log("wqeqweqweqw")
        console.log(response)
        console.log("wqeqweqweqw")
        console.log("wqeqweqweqw")
    }

    async function navegarCadastroUsuario() {
        let aux = !novoUsuario;
        setNovoUsuario(aux);       
    }

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