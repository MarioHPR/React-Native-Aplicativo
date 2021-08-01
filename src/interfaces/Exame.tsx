import { INITIAL_INSTITUICAO_REQUEST, InstituicaoRequest } from "./Instituicao";
import { ItemValorExameRequest } from "./ItemValorExame";

export interface DadosExameRequest {
    bairro: string;
    cep: string;
    cidade: string;
    contatoDoisInstituicao: string;
    contatoUmInstituicao: string;
    dataExame: string;
    idArquivo: number;
    idInstituicao: number;
    nomeInstituicao: string;
    numero: number | string;
    parametros: ItemValorExameRequest[];
    rua: string;
    nomeExame: string;
}
export interface DadosExameEditRequest {
    bairro: string;
    cep: string;
    cidade: string;
    contatoDoisInstituicao: string;
    contatoUmInstituicao: string;
    dataExame: string;
    idArquivo: number;
    idInstituicao: number;
    nomeInstituicao: string;
    numero: number | string;
    parametros: ItemValorExameRequest[];
    rua: string;
    nomeExame: string;
}
export interface DadosExameResponse {
    id: number;
    nomeExame: string;
    idArquivo: number;
    dataExame: string;
    dadosInstituicao: InstituicaoRequest;
    parametros: ItemValorExameRequest[];
    flgDeleted: boolean;
}

export const INITIAL_EXAME_RESPONSE: DadosExameResponse = {
    id: 0,
    nomeExame: "",
    dataExame: "",
    idArquivo: 0,
    dadosInstituicao: INITIAL_INSTITUICAO_REQUEST,
    parametros: [],
    flgDeleted: false
}

export const INITIAL_EXAME_REQUEST: DadosExameRequest = {
    bairro: "",
    cep: "",
    cidade: "",
    contatoDoisInstituicao: "",
    contatoUmInstituicao: "",
    dataExame: "",
    idArquivo: 0,
    idInstituicao: 0,
    nomeInstituicao: "",
    numero: 0,
    parametros: [],
    rua: "",
    nomeExame: ""
}