import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://ng9v0ecsug.execute-api.us-east-1.amazonaws.com/dev',
    headers : {
        'Content-Type':  'application/json'
    }
})

export default instance;