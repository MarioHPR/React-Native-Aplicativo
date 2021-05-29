import { ParametrosLogin } from "../models/Usuario";

export interface AuthContextData {
    signed: boolean;
    user: string;
    loading: boolean;  
    signIn(userLogin: ParametrosLogin): Promise<void>;
    signOut(): void;
    novoUsuario: boolean;
    navegarCadastroUsuario(): void;
}