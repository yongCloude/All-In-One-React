import axios from "axios";


const client = axios.create();


/**
 * 
 */

// client.defaults.baseURL = 'http://3.39.95.217:8080/';
client.defaults.headers.common['Authorization'] = 'Token ';
client.defaults.withCredentials = false;

export default client;