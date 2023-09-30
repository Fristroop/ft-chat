/* eslint-disable react/prop-types */
import { Contacts } from "./Contacts.jsx";
import pp from "../assets/imgs/pp.jpg";

export const Sidebar = (props) => {
  const { toggleSidebar, user } = props;

  return (
    <div className="w-100">
      <div className="row-cols-1">
        <div className="col py-1 mb-3 d-flex justify-content-between bg-secondary-subtle rounded">
          <a href="/" className="btn mx-2">
            <img
              src={pp}
              alt=""
              width={"40px"}
              height={"40px"}
              className="rounded-circle"
            />
            <h6>{user?.username}</h6>
          </a>
          <div className="d-flex gap-1 px-3">
            <button
              className="btn d-flex align-items-center"
              onClick={toggleSidebar}
            >
              <i className="fa-solid fa-angle-left"></i>
            </button>
          </div>
        </div>
      </div>

      <Contacts />
    </div>
  );
};
