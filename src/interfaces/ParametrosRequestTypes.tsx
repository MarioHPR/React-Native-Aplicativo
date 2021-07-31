import { KeyboardType } from "react-native";
import { AlergiaRestricao } from "../models/AlergiaRestricao";
import { ParametrosLogin, Step1, UsuarioRequest } from "../models/Usuario";

export interface AuthContextData {
    signed: boolean;
    atualizarTelas: number;
    setAtualizarTelas: Function;
    loading: boolean;  
    signIn(userLogin: ParametrosLogin): Promise<void>;
    signOut(): void;
    novoUsuario: boolean;
    navegarCadastroUsuario(): void;
    cadastrarUsuario(request:UsuarioRequest): Promise<void>;
}

export interface AuthRestricoes {
    listaInfos: AlergiaRestricao[];
    listarRestricoes(): Promise<void>;
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
export interface ErrorAPI {
    code: string;
    details: ErrorAPI[];
    error: string;
    message: string;
}