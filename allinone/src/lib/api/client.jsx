import axios from "axios";


const client = axios.create();


/**
 * 
 */

client.defaults.baseURL = 'http://localhost:3000/';
client.defaults.headers.common['Authorization'] = 'Token ';
client.defaults.withCredentials = false;

export default client;