/*import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
//import PetsPage from "../PetsPage/PetsPage";
import LandingPage from "../LandingPage/LandingPage"
import AliceCarousel from "react-alice-carousel";
import { Image } from "cloudinary-react";
//import axios from "axios";
import "react-alice-carousel/lib/scss/alice-carousel.scss";
import "./HomePage.css";
import { Link, useNavigate } from "react-router-dom";
import bgImg from "../../images/bg-landing-2.jpg";

function HomePage() {
  //const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const { isLoggedIn, user,  } = useContext(AuthContext);
  const [pets, setPets] = useState([]);
  const [publicId, setPublicId] = useState("");
  const [owners, setOwners] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      if (user && user.preference) {
        let apiUrl = "";

        if (user.preference === "Dogs") {
          apiUrl = "https:///pet/dogs";
        } else if (user.preference === "Cats") {
          apiUrl = "https://petapp.fly.dev/pet/cats";
        } else if (user.preference === "Small Pets") {
          apiUrl = "https://petapp.fly.dev/pet/small_animals";
        } else {
          apiUrl = "https://petapp.fly.dev/pet/pets";
        }

        const res = await fetch(apiUrl);
        const finalRes = await res.json();
        setPets(finalRes);

        // Get the public ID of the first pet in the fetched data
        if (finalRes.length > 0) {
          setPublicId(finalRes[0].image);
        }
      }
    };

    fetchData();
  }, [user]);


  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const petOwners = pets.map((pet) => pet.owner); // Extract all the owner IDs from the pets array
        const ownerIds = [...new Set(petOwners)]; // Get unique owner IDs

        const ownerDataPromises = ownerIds.map(async (ownerId) => {
          const res = await fetch(`http://localhost:5005/api/owner/${ownerId}`);
          const data = await res.json();
          return data;
        });

        const ownerDataArray = await Promise.all(ownerDataPromises);
        const ownersData = ownerDataArray.reduce((acc, owner) => {
          acc[owner._id] = owner; // Use the owner ID as the key to access owner data
          return acc;
        }, {});

        setOwners(ownersData);
      } catch (error) {
        console.error("Error fetching owners:", error);
      }
    };
    fetchOwners();
  }, [pets]);

  const mapPetsToSlides = () => {
    return pets.map((pet) => (
      <div key={pet.id} className="container mx-auto flex justify-center py-8">
        <div className="carousel-slide grid grid-col">
          <div className="pet-card col-span-1">
            <div className="pet-image grid justify-items-center">
              <Image
                cloudName="dnstseshn"
                publicId={pet.image}
                className="max-w-250"
              />
            </div>
            <div className="p-4">
              <div className="borderpet p-4">
                <h2 className="font-bold text-2xl carousel-slide">
                  {pet.name},{" "}
                  {pet.age > 1 ? (
                    <span>{pet.age} years old</span>
                  ) : (
                    <span>{pet.age} year old</span>
                  )}
                </h2>
                <p className=" text-gray-500 carousel-slide py-2 capitalize">
                  {pet.category}
                </p>
                <div className="boxes grid grid-cols-3 justify-items-center m-2 gap-4">
                  <div className="borderpet">
                    <p className="text-gray-500 p-2">
                      <p className="font-bold">Type </p>
                      {pet.type}
                    </p>
                  </div>
                  <div className="borderpet p-2">
                    <p className="text-gray-500">
                      <p className="font-bold">Temper</p>
                      {pet.temper}
                    </p>
                  </div>
                  <div className="borderpet p-2">
                    <p className="text-gray-500">
                      <p className="font-bold">Special Needs</p>
                      {pet.special_needs ? <p>Yes</p> : <p>No</p>}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {owners[pet.owner] && (
              <div className="grid grid-col">
                <p className="font-bold text-gray-500 py-1">Posted by</p>
                <p className="py-1">{owners[pet.owner].ownerName}</p>
                <div className="p-1">
                  <button
                    onClick={() => navigate(`/owner/${owners[pet.owner]._id}`)}
                    className="bg-lime-800 text-white p-2 rounded border hover:bg-orange-500"
                  >
                    Contact me
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    ));
  };

  return (
    <div style={{ backgroundImage: `url(${bgImg})`, backgroundSize: "cover", backgroundPosition: "center", minHeight: "100vh"  }}>
      <div className="carousel-container">
        {isLoggedIn ? (
          pets.length > 0 ? (
            <AliceCarousel
              mouseTracking
              items={mapPetsToSlides()}
              disableDotsControls
              buttonsDisabled={false} // Disable the default buttons
              renderPrevButton={({ isDisabled }) => (
                <button className="carousel-button prev absolute top-1/2 left-0 transform -translate-y-1/2 mt-4 ml-4" disabled={isDisabled}>
                  Prev
                </button>
              )}
              renderNextButton={({ isDisabled }) => (
                <button className="carousel-button next absolute top-1/2 right-0 transform -translate-y-1/2 mt-4 mr-4" disabled={isDisabled}>
                  Next
                </button>
              )}
            />
          ) : (
            <p>No pets available.</p>
          )
        ) : (
          <LandingPage />
        )}
      </div>
    </div>
  );
}

export default HomePage;*/
/*
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import LandingPage from "../LandingPage/LandingPage";
import AliceCarousel from "react-alice-carousel";
import { Image } from "cloudinary-react";
import "react-alice-carousel/lib/scss/alice-carousel.scss";
import "./HomePage.css";

function HomePage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.preference) {
        let apiUrl = "";

        if (user.preference === "Dogs") {
          apiUrl = "https://petapp.fly.dev/pet/dogs";
        } else if (user.preference === "Cats") {
          apiUrl = "https://petapp.fly.dev/pet/cats";
        } else if (user.preference === "Small Pets") {
          apiUrl = "https://petapp.fly.dev/pet/small_animals";
        } else {
          apiUrl = "https://petapp.fly.dev/pet/pets";
        }

        const res = await fetch(apiUrl);
        const finalRes = await res.json();
        setPets(finalRes);
      }
    };

    fetchData();
  }, [user]);

  const mapPetsToSlides = () => {
    return pets.map((pet) => (
      <div key={pet.id} className="carousel-slide">
        <div className="pet-card">
          <div className="pet-image">
            <Image
              cloudName="dnstseshn"
              publicId={pet.image} // Use the correct property here
            />
          </div>
        </div>
        <div className="pet-details">
          <div className="pet-info">
            <h2>{pet.name}</h2>
            <p>{pet.category}</p>
            <p>Type: {pet.type}</p>
            <p>Age: {pet.age}</p>
            <p>Temper: {pet.temper}</p>
            <p>Special Needs: {pet.special_needs}</p>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <div className="carousel-container">
        {isLoggedIn ? (
          pets.length > 0 ? (
            <AliceCarousel
              mouseTracking
              items={mapPetsToSlides()}
              disableDotsControls
              buttonsDisabled={false} // Disable the default buttons
              renderPrevButton={({ isDisabled }) => (
                <button className="carousel-button prev" disabled={isDisabled}>
                  Prev
                </button>
              )}
              renderNextButton={({ isDisabled }) => (
                <button className="carousel-button next" disabled={isDisabled}>
                  Next
                </button>
              )}
            />
          ) : (
            <p>No pets available.</p>
          )
        ) : (
          <LandingPage />
        )}
      </div>
    </div>
  );
}

export default HomePage; */
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import LandingPage from "../LandingPage/LandingPage";
import AliceCarousel from "react-alice-carousel";
import { Image } from "cloudinary-react";
import "react-alice-carousel/lib/scss/alice-carousel.scss";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import bgImg from "../../images/bg-landing-2.jpg";

function HomePage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [pets, setPets] = useState([]);
  const [publicId, setPublicId] = useState("");
  const [owners, setOwners] = useState({});
  console.log(publicId);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.preference) {
        let apiUrl = "";

        if (user.preference === "Dogs") {
          apiUrl = "https://petapp.fly.dev/pet/dogs";
        } else if (user.preference === "Cats") {
          apiUrl = "https://petapp.fly.dev/pet/cats";
        } else if (user.preference === "Small Pets") {
          apiUrl = "https://petapp.fly.dev/pet/small_animals";
        } else {
          apiUrl = "https://petapp.fly.dev/pet/pets";
        }

        const res = await fetch(apiUrl);
        const finalRes = await res.json();
        setPets(finalRes);

        // Get the public ID of the first pet in the fetched data
        if (finalRes.length > 0) {
          setPublicId(finalRes[0].image);
        }
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const petOwners = pets.map((pet) => pet.owner); // Extract all the owner IDs from the pets array
        const ownerIds = [...new Set(petOwners)]; // Get unique owner IDs

        const ownerDataPromises = ownerIds.map(async (ownerId) => {
          const res = await fetch(
            `https://petapp.fly.dev/api/owner/${ownerId}`
          );
          const data = await res.json();
          return data;
        });

        const ownerDataArray = await Promise.all(ownerDataPromises);
        const ownersData = ownerDataArray.reduce((acc, owner) => {
          acc[owner._id] = owner; // Use the owner ID as the key to access owner data
          return acc;
        }, {});

        setOwners(ownersData);
      } catch (error) {
        console.error("Error fetching owners:", error);
      }
    };
    fetchOwners();
  }, [pets]);

  const mapPetsToSlides = () => {
    return pets.map((pet) => (
      <div key={pet.id} className="container mx-auto flex justify-center py-8">
        <div className="carousel-slide grid grid-col">
          <div className="pet-card col-span-1">
            <div className="pet-image grid justify-items-center">
              <Image
                cloudName="dnstseshn"
                publicId={pet.image}
                className="max-w-250"
              />
            </div>
            <div className="p-4">
              <div className="borderpet p-4">
                <h2 className="font-bold text-2xl carousel-slide">
                  {pet.name},{" "}
                  {pet.age > 1 ? (
                    <span>{pet.age} years old</span>
                  ) : (
                    <span>{pet.age} year old</span>
                  )}
                </h2>
                <p className=" text-gray-500 carousel-slide py-2 capitalize">
                  {pet.category}
                </p>
                <div className="boxes grid grid-cols-3 justify-items-center m-2 gap-4">
                  <div className="borderpet">
                    <p className="text-gray-500 p-2">
                      <p className="font-bold">Type </p>
                      {pet.type}
                    </p>
                  </div>
                  <div className="borderpet p-2">
                    <p className="text-gray-500">
                      <p className="font-bold">Temper</p>
                      {pet.temper}
                    </p>
                  </div>
                  <div className="borderpet p-2">
                    <p className="text-gray-500">
                      <p className="font-bold">Special Needs</p>
                      {pet.special_needs ? <p>Yes</p> : <p>No</p>}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {owners[pet.owner] && (
              <div className="grid grid-col">
                <p className="font-bold text-gray-500 py-1">Posted by</p>
                <p className="py-1">{owners[pet.owner].ownerName}</p>
                <div className="p-1">
                  <button
                    onClick={() => navigate(`/owner/${owners[pet.owner]._id}`)}
                    className="bg-lime-800 text-white p-2 rounded border hover:bg-orange-500"
                  >
                    Contact me
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="carousel-container">
        {isLoggedIn ? (
          pets.length > 0 ? (
            <AliceCarousel
              mouseTracking
              items={mapPetsToSlides()}
              disableDotsControls
              buttonsDisabled={false} // Disable the default buttons
              renderPrevButton={({ isDisabled }) => (
                <button
                  className="carousel-button prev absolute top-1/2 left-0 transform -translate-y-1/2 mt-4 ml-4"
                  disabled={isDisabled}
                >
                  Prev
                </button>
              )}
              renderNextButton={({ isDisabled }) => (
                <button
                  className="carousel-button next absolute top-1/2 right-0 transform -translate-y-1/2 mt-4 mr-4"
                  disabled={isDisabled}
                >
                  Next
                </button>
              )}
            />
          ) : (
            <p>No pets available.</p>
          )
        ) : (
          <LandingPage />
        )}
      </div>
    </div>
  );
}

export default HomePage;
