import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Chat from "./components/Chat";
import "./index.css";
import styles from "./styles/App.module.css";

function App() {
  const [credentials, setCredentials] = useState(() => {
    const saved = localStorage.getItem("green-api-credentials");
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (data) => {
    localStorage.setItem("green-api-credentials", JSON.stringify(data));
    setCredentials(data);
  };

  const handleLogout = () => {
    localStorage.removeItem("green-api-credentials");
    setCredentials(null);
  };

  return (
    <div className="App">
      <header className={styles.header}>
        <h1>WhatsApp Chat</h1>
        {localStorage.getItem("green-api-credentials") && (
          <button onClick={() => handleLogout()}>Выход</button>
        )}
      </header>
      <Routes>
        <Route
          path="/"
          element={
            credentials ? (
              <Chat {...credentials} />
            ) : (
              <AuthForm
                onAuth={(data) => {
                  handleLogin(data);
                }}
              />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
