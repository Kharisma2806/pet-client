// OwnerProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import catIcon from "../../images/cat-profile.jpg";
import bgImg from "../../images/bg-landing-2.jpg";

import LiveChat from "../../components/LiveChat/LiveChat";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5005");

function OwnerProfilePage() {
  const { user } = useContext(AuthContext);
  const { ownerId } = useParams();
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [username, setUsername] = useState("");
  const [owner, setOwner] = useState(null);
  const [ownerPets, setOwnerPets] = useState([]);

  const fetchOwnerPets = async () => {
    try {
      const res = await fetch(`http://localhost:5005/api/pets/${ownerId}`);
      const data = await res.json();
      setOwnerPets(data);
    } catch (error) {
      console.error("Error fetching owner pets:", error);
    }
  };

  useEffect(() => {
    fetchOwnerPets();
  });

  const joinRoom = () => {
    console.log(room);
    if (username !== "" && room !== "") socket.emit("join_room", room);
    setShowChat(true);
  };

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const res = await fetch(`http://localhost:5005/api/owner/${ownerId}`);
        const data = await res.json();
        setOwner(data);
      } catch (error) {
        console.error("Error fetching owner data:", error);
      }
    };
    fetchOwnerData();
  }, [ownerId]);

  if (!owner) {
    return <p>Loading...</p>;
  }

  return (
    // Wrap the ternary operator in parentheses
    <>
      {!showChat ? (
        <div
          style={{
            backgroundImage: `url(${bgImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
          }}
        >
          <div className="flex justify-center py-12 px-6">
            <div className="w-full p-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-col items-center pb-10">
                <img
                  className="w-24 h-24 mb-3 rounded-full shadow-lg"
                  src={catIcon}
                  alt={owner.ownerName}
                />
                <h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white">
                  {owner.ownerName}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400 py-3">
                  {owner.zip}, {owner.city}, {owner.country}
                </span>
                <div className="grid grid-col text-start">
                  <span className="text-sm text-gray-500 dark:text-gray-400 py-3">
                    <span className="font-bold">Email:</span> {owner.ownerEmail}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 py-3">
                    <span className="font-bold">Phone: </span>
                    {owner.ownerPhone}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 py-3">
                    <span className="font-bold">Pets posted so far: </span>
                    {ownerPets.length}
                  </span>
                </div>
              </div>
              <div className="">
                <h3 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  Contact me
                </h3>
                <div className="grid grid-col px-7">
                  <input
                    type="text"
                    value={user.name}
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }}
                    className="joinChatInput"
                  />
                  <input
                    type="text"
                    value={ownerId}
                    onChange={(event) => {
                      setRoom(event.target.value);
                    }}
                    className="joinChatInput"
                  />
                  <button
                    onClick={joinRoom}
                    className="bg-lime-800 text-white p-2 rounded border hover:bg-orange-500"
                  >
                    Join a room
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            backgroundImage: `url(${bgImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
          }}
        >
          <div className="flex justify-center py-12 px-6">
            <div className="w-full p-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-col items-center pb-10">
                <img
                  className="w-24 h-24 mb-3 rounded-full shadow-lg"
                  src={catIcon}
                  alt={owner.ownerName}
                />
                <h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white">
                  {owner.ownerName}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400 py-3">
                  {owner.zip}, {owner.city}, {owner.country}
                </span>
                <div className="grid grid-col text-start">
                  <span className="text-sm text-gray-500 dark:text-gray-400 py-3">
                    <span className="font-bold">Email:</span> {owner.ownerEmail}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 py-3">
                    <span className="font-bold">Phone: </span>
                    {owner.ownerPhone}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 py-3">
                    <span className="font-bold">Pets posted so far: </span>
                    {ownerPets.length}
                  </span>
                </div>
                <div className="">
                  <LiveChat socket={socket} username={username} room={room} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OwnerProfilePage;
