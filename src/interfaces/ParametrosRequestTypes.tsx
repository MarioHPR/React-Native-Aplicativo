import { KeyboardType } from "react-native";
import { ParametrosLogin, Step1, UsuarioRequest } from "../models/Usuario";

export interface AuthContextData {
    signed: boolean;
    user: string;
    loading: boolean;  
    signIn(userLogin: ParametrosLogin): Promise<void>;
    signOut(): void;
    novoUsuario: boolean;
    navegarCadastroUsuario(): void;
    cadastrarUsuario(request:UsuarioRequest): Promise<void>;
}

export interface AuthContextUsuario {
    step1(parametros:Step1): Promise<void>;
}

export interface InputProps {
    label: string;
    valor: string;
    setValor: any;
    mensagemErro: string;
    style: any;
    typeKeybord?: KeyboardType;
    quantidadeCaracteres?: number;
    flgMascara?: boolean;
    mascara?: Function;
}

export interface ButtonProps {
    nomeBotao: string;
    acao: any;
    style: any;
    icon: any;
    type: any;
}