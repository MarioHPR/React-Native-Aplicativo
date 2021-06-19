import axios from 'axios';

const baseURL = 'https:/back-geranciador-exames.herokuapp.com/';

export default class AlergiaRestricaoApi {

    headerRequest = (token: string) => {
        return axios.create({
            baseURL: baseURL,
            headers: { 
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                'Authorization': token
            }
        }) 
    }

    listar(token: string) {  
        const alergiaRestricaoApi = this.headerRequest(token);
        const response = alergiaRestricaoApi.get('api/restricoes/');
        return response;
    }
};