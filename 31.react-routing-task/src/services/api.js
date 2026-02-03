import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.DEV
    ? "/api" 
    : "https://book-store-api-liard-three.vercel.app", 
  timeout: 15000,
});
