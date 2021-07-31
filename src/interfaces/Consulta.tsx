import { INITIAL_INSTITUICAO_REQUEST, InstituicaoRequest } from "./Instituicao";

export interface ConsultaRequest {
    nomeMedico: string;
    dataConsulta: string;
    diagnostico: string;
    prescricao: string;
    idArquivo: number;
    dadosInstituicao: InstituicaoRequest;
}

export interface ConsultaResponse {
    id: number;
    nomeMedico: string;
    dataConsulta: string;
    diagnostico: string;
    prescricao: string;
    idArquivo: number;
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