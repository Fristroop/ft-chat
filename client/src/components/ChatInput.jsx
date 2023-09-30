/* eslint-disable react/prop-types */
import { useState, useRef } from "react";

export const ChatInput = (props) => {
  const { socket } = props;

  const [message, setMessage] = useState("");
  const [roomId, setRoomId] = useState("");

  const textareaRef = useRef(null);

  useState(() => {
    const params = new URLSearchParams(location.search);
    setRoomId(params.get("id"));
  }, []);

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
    resizeTextarea();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.length === 0) return;

    socket.emit("messageCreate", message, roomId);

    // reset
    setMessage("");
  };

  return (
    <div className="chat-input d-flex justify-content-center p-4 col-12 bg-dark-subtle border-top">
      <form onSubmit={handleSubmit} className="w-100">
        <div className="d-flex gap-3 w-100">
          <textarea
            className="form-control"
            id="message"
            rows="1"
            ref={textareaRef}
            style={{ resize: "none" }}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            value={message}
            placeholder="Type your message..."
            // eslint-disable-next-line react/prop-types
            disabled={props.chat?.id ? false : true}
            required
          ></textarea>
          <button type="submit" className="btn btn-success">
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </div>
  );
};
