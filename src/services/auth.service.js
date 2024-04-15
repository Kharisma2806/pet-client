import axios from "axios";

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
      //baseURL: process.env.REACT_APP_SERVER_URL || "https://petapp.fly.dev",
    });

    // Automatically set JWT token on the request headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  login = (requestBody) => {
    //return this.api.post("/auth/login", requestBody);
    // same as
    return axios.post("http://localhost:5005/auth/login", requestBody);
  };

  signup = (requestBody) => {
    //return this.api.post("/auth/signup", requestBody);
    // same as
    return axios.post("http://localhost:5005/auth/signup", requestBody);
  };

  ownersignup = (requestBody) => {
    //return this.api.post("/auth/ownersignup", requestBody);
    return axios.post("http://localhost:5005/auth/ownersignup", requestBody);
  };

  editprofile = (requestBody) => {
    // return this.api.post("/auth/editprofile", requestBody);
    return axios.post("http://localhost:5005/auth/editprofile", requestBody);
  };

  editownerprofile = (requestBody) => {
    //return this.api.post("/auth/editownerprofile", requestBody);
    return axios.post(
      "http://localhost:5005/auth/editownerprofile",
      requestBody
    );
  };

  ownerlogin = (requestBody) => {
    //return this.api.post("/auth/ownerlogin", requestBody);
    return axios.post("http://localhost:5005/auth/ownerlogin", requestBody);
  };

  verify = () => {
    //return this.api.get("/auth/verify");
    // same as
    return axios.get("http://localhost:5005/auth/verify");
  };
}

// Create one instance (object) of the service
const authService = new AuthService();

export default authService;
