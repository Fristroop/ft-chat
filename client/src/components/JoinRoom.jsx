/* eslint-disable react/prop-types */
export const JoinRoom = ({ socket }) => {
  const joinRoom = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const data = {};
    for (const [key, val] of form) {
      data[key] = val;
    }

    socket.emit("joinRoom", data);
  };

  socket.on("joinRoomSuccess", (roomId) => {
    location.replace(`/room?id=${roomId}`);
  });

  socket.on("joinRoomFail", (msg) => {
    alert(msg)
  });

  return (
    <div>
      <div className="collapse mt-3" id="joinRoom">
        <form action="" onSubmit={joinRoom}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="null"
              name="roomId"
              required
            />
            <label>Room Id</label>
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
              If room is password secured, you must provide password or join
              request will be failed!
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
