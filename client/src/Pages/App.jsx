/* eslint-disable react/prop-types */
import { io } from "socket.io-client";
import axios from "axios";
import { useState, useEffect } from "react";

import { Sidebar } from "../components/Sidebar";
import { Rooms } from "./Rooms";
import { Chat } from "./Chat";
import "../assets/styles/App.css";
import { Loader } from "./Loader";
import { API } from "../config";

export const App = (props) => {
  const { comp } = props;
  const [sideVisible, setSideVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);

  const toggleSidebar = () => {
    setSideVisible(!sideVisible);
  };

  useEffect(() => {
    // Api Response
    const fetchSelf = async () => {
      try {
        const res = await axios.get(API + "/users/@me", {
          withCredentials: true,
        });
        setUser(res.data);

        // WS Connection
        const socket = io(API, {
          query: {
            userId: res.data.id,
          },
        });

        setSocket(socket);

        // Disconnect
        socket.on("disconnect", () => {
          location.reload();
        });
      } catch (error) {
        location.replace("/login");
      }
    };
    fetchSelf();

    // Responsivity
    if (location.pathname.startsWith("/room") && window.innerWidth < 768) {
      toggleSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Add an empty dependency array to run this effect only once after the initial render

  if (!socket || !user) {
    return <Loader />;
  }

  return (
    <div className="container-fluid">
      <div className="app row">
        <div
          id="sidebar"
          className={`${
            sideVisible ? "v-none" : ""
          } col-md p-3 bg-dark-subtle border-end`}
        >
          <Sidebar
            sideVisible={sideVisible}
            toggleSidebar={toggleSidebar}
            user={user}
          />
        </div>
        <div id="main" className="col-md p-0">
          {comp === "chat" ? (
            <Chat
              sideVisible={sideVisible}
              toggleSidebar={toggleSidebar}
              user={user}
              socket={socket}
            />
          ) : (
            <Rooms
              sideVisible={sideVisible}
              toggleSidebar={toggleSidebar}
              socket={socket}
              user={user}
            />
          )}
        </div>
      </div>
    </div>
  );
};
