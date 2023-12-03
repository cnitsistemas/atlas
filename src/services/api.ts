// api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL || 'https://cnit.herokuapp.com/',
});

export default api;