import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://blog-react-2f3e0-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default instance;