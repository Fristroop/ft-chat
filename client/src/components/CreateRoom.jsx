/* eslint-disable react/prop-types */

export const CreateRoom = (props) => {
  const { socket } = props;
  const createRoom = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const data = {};
    for (const [key, val] of form) {
      data[key] = val;
    }
    socket.emit("createRoom", data);
  };
  return (
    <div>
      <div className="collapse mt-3" id="createRoom">
        <form action="" onSubmit={createRoom}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="null"
              name="name"
              required
            />
            <label>Room Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="null"
              name="password"
            />
            <label>Room Password</label>
            <div id="emailHelp" className="form-text">
              If you leave password blank, anybody can join to room!
            </div>
          </div>
          <div className="mb-3 d-flex justify-content-center">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
