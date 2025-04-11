const BASE_URL = "/api";
const getToken = () => {
  return localStorage.getItem("jwt");
};

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const getItems = () => {
  console.log("Attempting to fetch items");
  return fetch(`${BASE_URL}/items`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${text}`
          );
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log("Received items:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error in getItems:", error);
      throw error;
    });
};

export const addItem = (item) => {
  const token = getToken();
  if (!token) {
    return Promise.reject("User not authenticated");
  }
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  }).then(checkResponse);
};

export const deleteItem = (id) => {
  console.log("Attempting to delete item with id:", id);
  const token = localStorage.getItem("jwt");
  console.log("Token being sent:", token);
  return fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    console.log("Delete response:", res);
    return res.text().then((text) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}, message: ${text}`);
      }
      return text ? JSON.parse(text) : {};
    });
  });
};

export const signup = ({ name, avatar, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
};

export const signin = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const updateUserProfile = (token, userData) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  }).then(checkResponse);
};

export const addCardLike = (id) => {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  }).then(checkResponse);
};

export const removeCardLike = (id) => {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  }).then(checkResponse);
};
