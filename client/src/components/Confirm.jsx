/* eslint-disable react/prop-types */

export const Confirm = ({ chatId, socket }) => {
  const acceptFunc = () => {
    console.log(chatId);
    socket.emit("leaveRoom", chatId);
    location.replace("/");
  };
  return (
    <div>
      <div
        className="modal fade"
        id="confirm"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Confirmation
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              If you leave that chat room you will need to rejoin!
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={acceptFunc}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
