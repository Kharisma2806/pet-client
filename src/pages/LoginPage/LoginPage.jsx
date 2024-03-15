import "./LoginPage.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
//import authService from "../../services/auth.service";
import LoginImg from "../../images/iStock-1324099927.webp";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    // Send a request to the server using axios

    axios
      .post(`https://petapp.fly.dev/auth/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/home");
      })

      // Or using a service
      /*authService
      .login(requestBody)
      .then((response) => {
        // If the POST request is successful store the authentication token,
        // after the token is stored authenticate the user
        // and at last navigate to the home page
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/home");
      })
      */
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="LoginPage">
      <div
        className="min-h-screen py-40"
        style={{
          backgroundImage:
            "linear-gradient(115deg, rgb(237, 135, 51), rgb(255, 175, 128))",
        }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
            <div
              className="w-full lg:w-1/2 flex flex-col items-center p-12 bg-no-repeat bg-cover bg-center"
              style={{
                backgroundImage: `url(${LoginImg})`,
                objectFit: "scale-down",
              }}
            ></div>
            <div className="w-full lg:w-1/2 py-16 px-12">
              <h2 className="text-3xl mb-4">Login</h2>
              <p class="mb-4">Welcome back!</p>
              <form onSubmit={handleLoginSubmit}>
                <div className="mt-5">
                  <input
                    className="border border-gray-400 py-1 px-2 w-full"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                    placeholder="Enter you email"
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                    className="border border-gray-400 py-1 px-2 w-full"
                    placeholder="********"
                  />
                </div>
                <div className="mt-5">
                  <button
                    className="w-full py-3 text-center text-white"
                    style={{ backgroundColor: "rgb(63, 98, 18)" }}
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </form>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <p>Don't have an account yet?</p>
              <Link
                style={{ color: "rgb(63, 98, 18)" }}
                className="font-bold"
                to={"/signup"}
              >
                {" "}
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
