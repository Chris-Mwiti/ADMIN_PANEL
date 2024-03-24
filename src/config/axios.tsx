import axios from "axios";

const useAxiosInstance = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  console.log(accessToken, refreshToken);
  return axios.create({
    baseURL:
      "https://juice-hub-ts-server-562ekrs7b-chrismwitis-projects.vercel.app/",
    timeout: 3000,
    headers: {
      authorization: `Bearer ${accessToken} ${refreshToken}`,
    },
  });
};

export default useAxiosInstance;
