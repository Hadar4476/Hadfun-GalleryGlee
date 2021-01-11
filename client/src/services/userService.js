import httpService from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export async function login(email, password) {
  const { data } = await httpService.post(`${apiUrl}/auth`, {
    email,
    password,
  });
  localStorage.setItem(tokenKey, data.token);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login: login,
  getCurrentUser: getCurrentUser,
  logout: logout,
  getJwt: getJwt,
};
