// api.ts
import axios from "axios";

const api = axios.create({
  baseURL: 'https://cnit-homolog.herokuapp.com/',
});

export default api;