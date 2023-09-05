import axios from 'axios';

const viaCEPBaseUrl  = axios.create({
  baseURL: 'https://viacep.com.br/ws/', 
});

export default viaCEPBaseUrl ;
