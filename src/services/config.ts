// api.js (or wherever you have your axios setup)
import axios from "axios";

export const Api = axios.create({
  baseURL: 'https://bedwood.vercel.app',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});