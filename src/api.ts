// src/api.ts
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', // cambia a tu dominio si haces deploy
});

export default API;
