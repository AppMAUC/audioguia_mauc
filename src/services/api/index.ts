import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Substitua pela URL base da sua API
  timeout: 1000, // Tempo limite de requisição em milissegundos
  headers: { "Content-Type": "application/json" },
});