import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import * as auth from '../services/auth';

interface userLogin {
    email : string;
    senha : string;
}
interface AuthContextData {
    signed: boolean;
    user: string;
    loading: boolean;  
    signIn(userLogin): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);



export const AuthProvider: React.FC = ({ children }) => {
    const [ user, setUser ] = useState<string>("");
    const [ loading, setLoading ] = useState(false);

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

    async function signIn(parametros) {   
        console.log(parametros)  
        const response = await api.post('/login', parametros);
        await AsyncStorage.setItem('@GEAuth:token', response.headers.authorization);
        setUser(response.headers.authorization)
    }

    async function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null);
        });        
    }

    return (
        <AuthContext.Provider value={{signed: !!user, user, loading, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}