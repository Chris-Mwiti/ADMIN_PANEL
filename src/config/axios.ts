import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: "http://localhost:1100/Sales/1",
    timeout: 3000
})

export default AxiosInstance