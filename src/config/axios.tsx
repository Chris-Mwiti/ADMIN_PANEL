import axios from "axios";


const useAxiosInstance = () => {
    
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    return axios.create({
        baseURL: "http://localhost:3000",
        timeout: 3000,
        headers: {
            "authorization" : `Bearer ${accessToken} ${refreshToken}`
        }
    })
}

export default useAxiosInstance