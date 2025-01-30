import React, { useState } from "react";
import styles from "../styles/AuthForm.module.css";

const AuthForm = ({ onAuth }) => {
  const [idInstance, setIdInstance] = useState("");
  const [apiToken, setApiToken] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuth({ idInstance, apiTokenInstance: apiToken });
  };

  return (
    <div className={styles.authContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="ID Instance"
          value={idInstance}
          onChange={(e) => setIdInstance(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="API Token"
          value={apiToken}
          onChange={(e) => setApiToken(e.target.value)}
          required
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default AuthForm;
