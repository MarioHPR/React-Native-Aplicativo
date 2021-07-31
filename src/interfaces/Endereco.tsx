export interface EnderecoRequest {
    id: number;
    cidade: string;
    cep: string;
    bairro: string;
    rua: string;
    numero: number | string;
    flgEnderecoDoUsuario: false;
}

export const INITIAL_ENDERECO_REQUEST: EnderecoRequest = {
    id: 0,
    cidade: "",
    cep: "",
    bairro: "",
    rua: "",
    numero: "",
    flgEnderecoDoUsuario: false
}