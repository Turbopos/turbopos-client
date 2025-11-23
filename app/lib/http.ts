import axios from "axios";

export const http = () => {
  const config = useRuntimeConfig();

  const baseURL = config.public.API_URL;
  const headers: Record<string, any> = {
    "Content-Type": "application/json",
  };
  const token = useCookie("token").value;

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return axios.create({
    baseURL,
    headers,
  });
};
