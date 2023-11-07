/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import { ChatInput } from "../components/ChatInput";

import "../assets/styles/Chat.css";

import { ChatBody } from "../components/ChatBody";

import pp from "../assets/imgs/space.png";
import { Loader } from "./Loader";
import { Confirm } from "../components/Confirm";
import axios from "axios";
import { API } from "../config";

export const Chat = (props) => {
  const { sideVisible, toggleSidebar, socket, user } = props;
  const [chat, setChat] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const fetchChatData = async () => {
      try {
        const res = await axios.get(API + "/rooms/" + params.get("id"), {
          withCredentials: true,
        });
        setChat(res.data);
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };

    fetchChatData();
  }, [socket]);

  // Loading
  if (!chat.name) {
    return <Loader />;
  }

  return (
    <div className="chatside">
      <div className="chat-header navbar bg-dark-subtle border-bottom">
        <div className="container-fluid">
          <div className="navbar-brand d-flex gap-3 align-items-center">
            <button
              className={`btn ${sideVisible ? "" : "d-none"}`}
              onClick={toggleSidebar}
            >
              <i className={`fa-solid fa-angle-right fs-5`}></i>
            </button>
            <img
              src={pp}
              alt=""
              width={"50px"}
              height={"50px"}
              className="rounded-circle"
            />
            <div>
              #{chat.name}
              <br />
              <small className="text-muted">{chat.members.length} users</small>
            </div>
          </div>
          <div className="d-flex gap-3">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => alert(`Room id is ${chat.id}`)}
            >
              <i className="fa-solid fa-share"></i>
            </button>
            <button
              className="btn btn-danger btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#confirm"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </div>
        </div>
      </div>

      <Confirm chatId={chat.id} socket={socket} />
      <ChatBody chat={chat} socket={socket} user={user} />
      <ChatInput chat={chat} socket={socket} />
    </div>
  );
};
