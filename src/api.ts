// src/api.ts
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  //baseURL: 'http://localhost:3000', // ← Directo sin variable
});


export default API;
