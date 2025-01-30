import React, { useState } from "react";
import axios from "axios";
import Message from "./Message";
import usePolling from "../hooks/usePolling";
import styles from "../styles/Chat.module.css";

const Chat = ({ idInstance, apiTokenInstance }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState("");

  const sendMessage = async () => {
    if (!message || !chatId) return;
    try {
      await axios.post(
        `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
        {
          chatId: `${chatId}@c.us`,
          message,
        }
      );
      setMessages([...messages, { text: message, isSent: true }]);
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  usePolling(idInstance, apiTokenInstance, (newMessage) => {
    setMessages([...messages, { text: newMessage, isSent: false }]);
  });

  const createChat = (value) => {
    setChatId(value.replace(/\D/g, ""));
    setMessages([]);
  };

  return (
    <div className={styles.chat}>
      <div className={styles.chatList}>
        <input
          type="text"
          placeholder="Введите номер..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createChat(e.target.value);
              e.target.value = "";
            }
          }}
        />
        {chatId.length > 0 && (
          <div className={styles.chatListItem}>{"+" + chatId}</div>
        )}
      </div>

      <div className={styles.chatContainer}>
        <div className={styles.chatIdInput}></div>
        <div className={styles.messages}>
          {messages.map((msg, index) => (
            <Message key={index} text={msg.text} isSent={msg.isSent} />
          ))}
        </div>
        {chatId.length > 0 && (
          <div className={styles.inputArea}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Сообщение..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>➤</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
