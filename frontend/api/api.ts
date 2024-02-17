import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-production-4aac.up.railway.app",
});

export default api;
