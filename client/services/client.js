import axios from "axios";
import { retrieveCredentials } from "@/utils/retrieveCredentials";
import { SIGN_UP_API_KEY, LOGIN_API_KEY } from "./constants";

// Endpoints to be excluded
const EXCLUDED_ENDPOINTS = [LOGIN_API_KEY, SIGN_UP_API_KEY];

export const client = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

client.interceptors.request.use(async (config) => {
  if (config.url && !EXCLUDED_ENDPOINTS.includes(config.url)) {
    const { token } = await retrieveCredentials();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
