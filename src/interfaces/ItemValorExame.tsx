export interface ItemValorExameRequest {
    id: number;
    campo: string;
    valor: string;
    idItemCampoExame: number;
    idItemValorExame: number;
}

export const INITIAL_PARAMETROS_REQUEST: ItemValorExameRequest = {
    id: 0,
    campo: " ",
    valor: " ",
    idItemCampoExame: 0,
    idItemValorExame: 0
}