import axios from 'axios';

const instance = axios.create({
    baseURL: "https://burger-app-a7839.firebaseio.com/"
});

export default instance;