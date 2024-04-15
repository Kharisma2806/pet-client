import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import LiveChat from "../../components/LiveChat/LiveChat";
import LiveChatImg from "../../images/national-pets-day.webp";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5005");

const LiveChatPage = () => {
  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  console.log(user);

  const joinRoom = () => {
    console.log(username, room);
    if (username !== "" && room !== "") socket.emit("join_room", room);
    setShowChat(true);
  };

  return (
    <div>
      {!showChat ? (
        <div className="LiveChat">
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
                    backgroundImage: `url(${LiveChatImg})`,
                    objectFit: "scale-down",
                  }}
                ></div>
                <div className="w-full lg:w-1/2 py-16 px-12">
                  <h2 className="text-3xl mb-4 font-bold">Enter the chat</h2>
                  <div className="grid grid-col px-7">
                    {user.name ? (
                      <input
                        type="text"
                        value={user.name}
                        onChange={(event) => {
                          setUsername(event.target.value);
                        }}
                        className="joinChatInput"
                      />
                    ) : (
                      <input
                        type="text"
                        value={user.ownerName}
                        onChange={(event) => {
                          setUsername(event.target.value);
                        }}
                        className="joinChatInput"
                      />
                    )}

                    <input
                      type="text"
                      value={user._id}
                      onChange={(event) => {
                        setRoom(event.target.value);
                      }}
                      className="joinChatInput"
                    />
                    <button
                      onClick={joinRoom}
                      className="bg-lime-800 text-white p-2 rounded border hover:bg-orange-500"
                    >
                      Join
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <LiveChat socket={socket} username={username} room={room} />
        </>
      )}{" "}
    </div>
  );
};

export default LiveChatPage;
