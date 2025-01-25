const baseUrl = "http://localhost:3001";

export const getItems = () => {
  return fetch(`${baseUrl}/items`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((data) => {
      console.log("API response:", data);
      return data;
    });
};
