import React from "react";
import styles from "../styles/Chat.module.css";

const Message = ({ text, isSent }) => {
  return (
    <div
      className={`${styles.message} ${isSent ? styles.sent : styles.received}`}
    >
      <div className={styles.bubble}>{text}</div>
    </div>
  );
};

export default Message;
