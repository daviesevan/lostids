import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL,
});

const refreshapi = axios.create({
  baseURL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

refreshapi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("refresh_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const signupUser = async (username, fullname, email, password) => {
  try {
    const response = await api.post("/api/auth/signup", {
      username,
      fullname,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw error;
    }
  }
};

const loginUser = async (email, password) => {
  try {
    const response = await api.post("/api/auth/signin", {
      email,
      password,
    });
    const { access_token, refresh_token } = response.data;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  }
};

export { api, refreshapi, signupUser, loginUser };
