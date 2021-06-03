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

export interface InputProps {
    label: string;
    valor: string;
    setValor: Function;
    mensagemErro: string;
    style: any;
}

export interface ButtonProps {
    nomeBotao: string;
    acao: any;
    style: any;
    icon: any;
    type: any;
}