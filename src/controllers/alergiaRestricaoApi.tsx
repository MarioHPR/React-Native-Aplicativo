import { AlergiaRestricao, AlergiaRestricaoRequest } from '../interfaces/AlergiaRestricao';
import {ApiService}  from '../services/apiService';


export const listar = async () => {
  const response: AlergiaRestricao[] = (await ApiService.get('api/restricoes/')).data;
  return  response;
}

export const addNovo = async ( request: AlergiaRestricaoRequest ) => {
  const response = ApiService.post('api/restricoes/salvar', JSON.stringify(request) );
  return response;
}

export const editar = async ( id: number,  request: AlergiaRestricaoRequest ) => {
  const response = ApiService.put( `api/restricoes/editar/${id}`, request );
  return response;
}
    
export const excluir = async ( id: number ) => {
  const response = ApiService.delete(`api/restricoes/deletar/${id}`);
  return response;
} 
