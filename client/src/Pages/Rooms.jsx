/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { CreateRoom } from "../components/CreateRoom";
import { JoinRoom } from "../components/JoinRoom";

export const Rooms = (props) => {
  const { sideVisible, toggleSidebar, socket } = props;

  useEffect(() => {
    socket?.on("joinRoom", (roomId) => {
      location.replace(`/chat?id=${roomId}`);
    });
  });

  return (
    <div className="rooms h-100">
      <div className="navbar p-3 bg-dark-subtle border-bottom d-flex">
        <div className="ms-3">
          <button
            className={`btn ${sideVisible ? "" : "d-none"}`}
            onClick={toggleSidebar}
          >
            <i className={`fa-solid fa-angle-right fs-5`}></i>
          </button>
        </div>
        <div>
          <h5>Ft-Chat</h5>
        </div>
        <div>
          <button className="btn">
            <i className="fa-solid fa-bars fs-5"></i>
          </button>
        </div>
      </div>

      <div className="lobby container-fluid d-flex justify-content-center mt-5">
        <div className="col-12 bg-dark-subtle p-5 rounded">
          <div>
            <h5 className="text-center">Chat Room</h5>
            <hr />
            <div className="mb">
              <button
                className="btn btn-success w-100"
                data-bs-toggle="collapse"
                data-bs-target="#createRoom"
                aria-expanded="false"
              >
                Create
              </button>
              <CreateRoom socket={socket} />
            </div>
            <hr />
            <div className="mb-3">
              <button
                className="btn btn-primary w-100"
                data-bs-toggle="collapse"
                data-bs-target="#joinRoom"
                aria-expanded="false"
              >
                Join
              </button>
              <JoinRoom socket={socket} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
