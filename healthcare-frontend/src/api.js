import axios from "axios";

const api = axios.create({
  baseURL: "https://home-healthcare-operations-system.onrender.com",
});

export default api;
