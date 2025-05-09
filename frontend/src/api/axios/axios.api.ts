import axios from "axios";

export const apiInstance = axios.create({
  baseURL: "/api", // points at your Next.js proxy
  withCredentials: true, // only if you need cookies/auth
});
