import axios from "axios";

const instance = axios.create({
    // baseURL : "http://localhost:8001"
    baseURL : "https://calorix-backend.herokuapp.com/"
})

export default instance;