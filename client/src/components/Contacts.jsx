import { useEffect, useState } from "react";
import { request } from "../helpers/requestManager";
import pp from "../assets/imgs/pp.jpg";
import { Loader } from "../Pages/Loader";

export const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  const handleSearch = (searchTerm) => {
    const filtered = contacts.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(filtered);
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await request("/rooms");
      setContacts(res.data);
      setFilteredContacts(res.data);
    };
    fetch();
  }, []);

  if (!filteredContacts) {
    return <Loader />;
  }

  return (
    <div className="">
      <div className="col mb-3 d-none">
        <div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="search-icon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              aria-describedby="search-icon"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="col mt-3 w-100 rounded">
        {filteredContacts.length === 0 ? (
          <div className="">
            <hr />
            <h5 className="text-center">You have not joined any room yet!</h5>
          </div>
        ) : (
          // Eğer filteredContacts dizisi boş değilse, kişileri listeleyin
          <ul id="contacts" className="list-unstyled">
            {filteredContacts.map((room, i) => (
              <li key={i} className="border-bottom">
                <a
                  className="contact text-light text-decoration-none rounded px-1 pt-3 d-flex"
                  href={`/room?id=${room.id}`}
                >
                  <div className="mx-3 mt-1">
                    <img
                      src={pp}
                      alt=""
                      width={"40px"}
                      height={"40px"}
                      className="rounded-circle"
                    />
                  </div>
                  <div className="">
                    <h5 className="mb-0">{room.name}</h5>
                    <p className="text-muted small">
                      {room.lastMessage || "Send the first message!"}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
