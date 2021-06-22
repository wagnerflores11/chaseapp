import axios from 'axios';


const apioracle = axios.create({
    baseURL: 'http://localhost:6565/api'
})


export default apioracle;