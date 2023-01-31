export const BASE_URL = "https://auth.nomoreparties.co";

export const signup = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(password, email),
  })
    .then((resp) => {
      console.log(resp);
      return resp.json();
    })
    .then((data) => {
      console.log(data);
      // сохраняем токен
      // localStorage.setItem("token", data.token);
      return data;
    })

    .catch((err) => console.log(err));
};

export const signin = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(password, email),
  })
    .then((resp) => {
      console.log(resp);
      return resp.json();
    })
    .then((data) => {
      console.log(data);
      // сохраняем токен
      localStorage.setItem("token", data.token);
      return data;
    })

    .catch((err) => console.log(err));
};

export const userValidation = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      return data;
    })

    .catch((err) => console.log(err));
};
