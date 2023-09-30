/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { ChatMessage } from "./ChatMessage";

import ringtone from "../assets/sounds/minions_message.mp3";

export const ChatBody = ({ chat, socket, user }) => {
  const [messages, setMessages] = useState(chat.messages || []);

  useEffect(() => {
    const handleMessageReceived = (msg) => {
      // Yeni mesajı mesaj listesine ekleyin
      setMessages((prevMessages) => [...prevMessages, msg]);

      // Alert
      if (msg.authorId !== user.id) {
        playNotificationSound(); // Bildirim sesini çal
      }
    };

    socket.on("messageCreate", handleMessageReceived);

    // Clean-up: bileşen unmount edildiğinde event dinlemeyi kaldırın
    return () => {
      socket.off("messageCreate", handleMessageReceived);
    };
  }, [socket, user]);

  useEffect(() => {
    const chatBody = document.getElementById("chat-body");
    if (!chatBody) return;
    chatBody.scrollTo({
      top: chatBody.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const isMe = (m) => m.authorId === user.id;

  // Bildirim sesini çalacak fonksiyon
  const playNotificationSound = () => {
    const audio = new Audio(ringtone);
    audio.play();
  };

  return (
    <div id="chat-body" className="chat-body p-2">
      {messages.map((msg, index) => (
        <ChatMessage key={index} msg={msg} isMe={isMe(msg)} />
      ))}
    </div>
  );
};
