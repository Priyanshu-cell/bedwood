// api.js (or wherever you have your axios setup)
import axios from "axios";

export const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});