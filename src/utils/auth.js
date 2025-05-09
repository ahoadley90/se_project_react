import { checkResponse } from "./Api";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.yourdomain.com"
    : "http://localhost:3001";

export const signup = (userData) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then(handleResponse);
};

export const signin = (userData) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then(checkResponse);
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
