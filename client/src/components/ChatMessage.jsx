/* eslint-disable react/prop-types */
import pp from "../assets/imgs/pp.jpg";

export const ChatMessage = ({ msg, isMe }) => {
  const getDate = (m) => new Date(Number(m.timestamp)).toLocaleTimeString();
  return (
    <div
      className={`${isMe ? "chat-message-right" : "chat-message-left"} mb-3`}
    >
      <div className={isMe ? "d-none" : ""}>
        <img
          src={pp}
          className="rounded-circle mr-1 mt"
          alt="img"
          width="40"
          height="40"
        />
      </div>
      <div
        className={`mx-2 flex-shrink-1 rounded px-3 py-2 ${
          isMe ? "bg-success" : "bg-dark-subtle"
        } `}
      >
        {!isMe ? (
          <h6 className="font-weight-bold mb-1 text-danger text-wrap">
            {msg.author.substr(0, 16)}
          </h6>
        ) : null}
        <p className="mb-1">{msg.content}</p>
        <div className="text-muted small text-nowrap text-end">
          {getDate(msg)}
        </div>
      </div>
    </div>
  );
};
