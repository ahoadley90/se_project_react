const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwrproject.twilightparadox.com"
    : "http://localhost:3001";
const getToken = () => {
  return localStorage.getItem("jwt");
};

const TIMEOUT_DURATION = 30000;

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => Promise.reject(err));
};

const fetchWithTimeout = (url, options) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), TIMEOUT_DURATION)
    ),
  ]);
};

export const pingServer = () => {
  return fetchWithTimeout(`${BASE_URL}/ping`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then(checkResponse)
    .catch((error) => {
      console.error("Error pinging server:", error);
      throw error;
    });
};

export const getItems = () => {
  console.log("Attempting to fetch items");
  return fetchWithTimeout(`${BASE_URL}/items`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  })
    .then(checkResponse)
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
  return fetchWithTimeout(`${BASE_URL}/items`, {
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
  const token = getToken();
  return fetchWithTimeout(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then(checkResponse)
    .then((data) => {
      console.log("Delete response:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error deleting item:", error);
      throw error;
    });
};

export const signup = ({ name, avatar, email, password }) => {
  return fetchWithTimeout(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
};

export const signin = ({ email, password }) => {
  return fetchWithTimeout(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const updateUserProfile = (token, userData) => {
  return fetchWithTimeout(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  }).then(checkResponse);
};

export const addCardLike = (id) => {
  return fetchWithTimeout(`${BASE_URL}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  }).then(checkResponse);
};

export const removeCardLike = (id) => {
  return fetchWithTimeout(`${BASE_URL}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  }).then(checkResponse);
};
