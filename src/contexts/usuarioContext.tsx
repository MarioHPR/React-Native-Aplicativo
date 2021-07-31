import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

import { AuthContextUsuario } from '../interfaces/ParametrosRequestTypes';
import { Step1 } from '../models/Usuario';

const AuthContext = createContext<AuthContextUsuario>({} as AuthContextUsuario);

export const AuthProvider: React.FC = ({ children }) => {
    const [ novoUsuario, setNovoUsuario ] = useState();

    async function step1(parametros:Step1) {
    }

    return (
        <AuthContext.Provider value={{step1}}>
            {children}
        </AuthContext.Provider>
    );
};

export function useCadastroAuth() {
    const context = useContext(AuthContext);
    return context;
}