import { INITIAL_INSTITUICAO_REQUEST, InstituicaoRequest } from "./Instituicao";

export interface ConsultaRequest {
    nomeMedico: string;
    dataConsulta: string;
    diagnostico: string;
    prescricao: string;
    idArquivo: number;

    bairro: string;
    cep: string;
    cidade: string;
    contatoDoisInstituicao: string;
    contatoUmInstituicao: string;
    idContatoInstituicao: number;
    idEnderecoInstituicao: number;
    idInstituicao: number;
    nomeInstituicao: string;
    numero: number | string;
    rua: string;
}

export interface ConsultaResponse {
    id: number;
    nomeMedico: string;
    dataConsulta: string;
    diagnostico: string;
    prescricao: string;
    idArquivo: number;
    idInstituicao?: number;
    dadosInstituicao: InstituicaoRequest;
}

export const INITIAL_CONSULTA_RESPONSE: ConsultaResponse = {
    id: 0,
    nomeMedico: "",
    dataConsulta: "",
    diagnostico: "",
    prescricao: "",
    idArquivo: 0,
    dadosInstituicao: INITIAL_INSTITUICAO_REQUEST
}

export const INITIAL_CONSULTA_REQUEST: ConsultaRequest = {
    nomeMedico: "",
    dataConsulta: "",
    diagnostico: "",
    prescricao: "",
    idArquivo: 0,
    bairro: "",
    cep: "",
    cidade: "",
    contatoDoisInstituicao: "",
    contatoUmInstituicao: "",
    idContatoInstituicao: 0,
    idEnderecoInstituicao: 0,
    idInstituicao: 0,
    nomeInstituicao: "",
    numero: 0,
    rua: ""
}