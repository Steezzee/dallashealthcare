"use client";
import React, { useState } from "react";

const dummyEmail = "noahark2003@gmail.com";
const dummyPass = "password";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === dummyEmail && password === dummyPass) {
      setLoggedInUser(username);
      setError(null);
      localStorage.setItem("loggedInUser", username);
    } else {
      setError("Invalid username or password.");
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        {!loggedInUser ? (
          <form onSubmit={handleLogin} style={styles.form}>
            <h2>Login</h2>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />

            <button type="submit" style={styles.button}>
              Login
            </button>

            {error && <p style={styles.error}>{error}</p>}

            <p>
              Don’t have an account?{" "}
              <a href="#" style={styles.link}>
                Register here
              </a>
            </p>
          </form>
        ) : (
          <div>
            <h2>
              Welcome, <span style={{ color: "#007bff" }}>{loggedInUser}</span>
            </h2>
            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;

const styles: { [key: string]: React.CSSProperties } = {
  body: {
    fontFamily: "'Kanit', sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    margin: 0,
    backgroundColor: "#C2D8B9",
  },
  container: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    margin: "10px 0",
    padding: 10,
    fontSize: 16,
    border: "1px solid #ccc",
    borderRadius: 5,
  },
  button: {
    padding: 10,
    fontSize: 16,
    color: "white",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
  link: {
    color: "#007bff",
    cursor: "pointer",
    textDecoration: "none",
  },
  error: {
    color: "red",
    fontSize: 14,
    marginTop: 8,
  },
};
