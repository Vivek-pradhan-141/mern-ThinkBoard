import axios from "axios";

// note : while deploying we wil not get a localhost url hence we need to make the base url Dynamic

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5005/api" : "/api"

const api = axios.create({
    baseURL:BASE_URL,
})

export default api;