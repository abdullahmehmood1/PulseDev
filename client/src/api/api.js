import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export const getServices = () => api.get("/services");
export const getProjects = () => api.get("/projects");
export const sendContactMessage = (payload) => api.post("/contact", payload);

export default api;
