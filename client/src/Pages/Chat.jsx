/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import { ChatInput } from "../components/ChatInput";

import "../assets/styles/Chat.css";

import { ChatBody } from "../components/ChatBody";

import pp from "../assets/imgs/pp.jpg";
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
      <div className="navbar p-0 pe-3 bg-dark-subtle border-bottom">
        <div className="text-light text-decoration-none rounded px-1 d-flex">
          <div className="ms-3 d-flex align-items-center justify-content-center">
            <button
              className={`btn ${sideVisible ? "" : "d-none"}`}
              onClick={toggleSidebar}
            >
              <i className={`fa-solid fa-angle-right fs-5`}></i>
            </button>
          </div>
          <div className="mx-3 d-flex align-items-center">
            <img
              src={pp}
              alt=""
              width={"40px"}
              height={"40px"}
              className="rounded-circle"
            />
          </div>
          <div className="pt-3">
            <h5 className="mb-0">{chat.name}</h5>
            <p className="text-muted small">{chat.members.length} people</p>
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

      <Confirm chatId={chat.id} socket={socket} />
      <ChatBody chat={chat} socket={socket} user={user} />
      <ChatInput chat={chat} socket={socket} />
    </div>
  );
};
