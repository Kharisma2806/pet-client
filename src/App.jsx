//
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import io from "socket.io-client";

import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from "./pages/HomePage/HomePage";
import PetDetailsPage from "./pages/PetsDetailsPage/PetsDetailsPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import GuidelinesPage from "./pages/GuidelinesPage/GuidelinesPage";
import ShopHomePage from "./pages/ShopHomePage/ShopHomePage";
import OwnerSignupPage from "./pages/OwnerSignupPage/OwnerSignupPage";
import OwnerLoginPage from "./pages/OwnerLoginPage/OwnerLoginPage";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
import CartPage from "./pages/CartPage/CartPage";
import CartContext from "./components/cartContext";
import OwnerHomepage from "./pages/OwnerHomepage/OwnerHomepage";
import OwnerDashboard from "./pages/OwnerDashboard/OwnerDashboard";

import EditProfile from "./pages/EditProfile/EditProfile";
import OwnerProfilePage from "./pages/OwnerProfilePage/OwnerProfilePage";
import LiveChat from "../src/pages/LiveChat/LiveChatPage";

//import OwnerDashboard from "./pages/OwnerDashboard/OwnerDashboard";

import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51NRxMIAJ0RHQyfziSQFiiswOORe2ztGLwkPBLRjk5JezRTwYfqJ4VQ5D3ZzF5qw58O4M2KflSYTmdelmUVJEsWSJ00sshA570x"
);

//version before deployment
//const socket = io.connect("http://localhost:5005");
const socket = io.connect("https://petapp.fly.dev");

function App() {
  const [cartItems, setCartItems] = useState([]);
  //commented this section out, there were not assignted values that coused errors during deployment
  const [username /*setUsername*/] = useState("");
  const [room /*setRoom*/] = useState("");
  const [showChat /*setShowChat*/] = useState(false);

  //const options = {
  //clientSecret: process.env.STRIPE_SECRET_KEY

  //};

  /* const joinRoom = () => {
    //console.log(username, room);
    if (username !== "" && room !== "") socket.emit("join_room", room);
    setShowChat(true);
 };
 */

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      <div className="App">
        {!showChat ? (
          <>
            <Navbar />

            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/ownerhome" element={<OwnerHomepage />} />

              <Route path="/pets/:petId" component={PetDetailsPage} />
              <Route path="/guidelines" element={<GuidelinesPage />} />
              <Route path="/shop" element={<ShopHomePage />} />
              <Route
                path="/product/:productId"
                element={<ProductDetailsPage />}
              />
              <Route
                path="/cart"
                element={
                  <Elements stripe={stripePromise}>
                    <CartPage />{" "}
                  </Elements>
                }
              />
              <Route
                path="/profile"
                element={
                  <IsPrivate>
                    <ProfilePage />
                  </IsPrivate>
                }
              />
              <Route
                path="/livechat"
                element={
                  <IsPrivate>
                    <LiveChat />
                  </IsPrivate>
                }
              />
              <Route
                path="/editprofile"
                element={
                  <IsPrivate>
                    <EditProfile />
                  </IsPrivate>
                }
              />
              <Route path="/owner/:ownerId" element={<OwnerProfilePage />} />
              <Route
                path="/ownerdashboard/:ownerId"
                element={<OwnerDashboard />}
              />

              <Route
                path="/signup"
                element={
                  <IsAnon>
                    <SignupPage />
                  </IsAnon>
                }
              />
              <Route
                path="/ownersignup"
                element={
                  <IsAnon>
                    <OwnerSignupPage />
                  </IsAnon>
                }
              />
              <Route
                path="/ownerlogin"
                element={
                  <IsAnon>
                    <OwnerLoginPage />
                  </IsAnon>
                }
              />
              <Route
                path="/login"
                element={
                  <IsAnon>
                    <LoginPage />
                  </IsAnon>
                }
              />
            </Routes>
          </>
        ) : (
          <LiveChat socket={socket} username={username} room={room} />
        )}
      </div>
    </CartContext.Provider>
  );
}

export default App;
