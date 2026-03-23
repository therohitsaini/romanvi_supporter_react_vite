import axios from "axios";

const AxiosApi = axios.create({
    baseURL: "http://localhost:5000",
});

AxiosApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("__Access_Token_v2");

    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default AxiosApi;