import axios from 'axios';

const ip = 'http://192.168.0.106:3000/';// || 'http://192.168.0.108:3000/';

const api = axios.create({
    baseURL: ip// trocar sempre que logar em outra rede
});

export default api;