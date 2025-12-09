'use client';

import React, { useState } from "react";
import { useRouter, usePathname } from 'next/navigation';


const dummyEmail = "noahark2003@gmail.com";
const dummyPass = "password";


const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);


  // Checking login creds and navigating to homepage

  const router = useRouter();
  const pathname = usePathname();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();


    if (username === dummyEmail && password === dummyPass) {
      setLoggedInUser(username);
      setError(null);
      localStorage.setItem("loggedInUser", username);
      setTimeout(() => {
        router.push('./home'); // Redirect to home page if login successful
        }, 1000);
    } else {
      setError("Invalid username or password.");
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <html>
      <body>
      <div style={styles.body}>
      <div style={styles.container}>
        {!loggedInUser ? (
          <form onSubmit={handleLogin} style={styles.form}>
            <h2>Login to MyDallasHealth</h2>

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

          <button
            type="submit"
            style={{
              padding: 10,
              fontSize: 16,
              color: "white",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
              backgroundColor: password ? "#4CAF50" : "#AFCEC3",
              transition: "background-color 0.3s ease",
            }}
          >
            Login
          </button>


            {error && <p style={styles.error}>{error}</p>}

            
          </form>
        ) : (
          <div>
            <h2>
              Welcome! <span style={{ color: "#AFCEC3" }}>{loggedInUser}</span>
            </h2>
           
          </div>
        )}
      </div>
    </div>
      </body>
    </html>
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
    backgroundColor: "#D5EBE3",
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
    backgroundColor: "#AFCEC3",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
  link: {
    color: "#AFCEC3",
    cursor: "pointer",
    textDecoration: "none",
  },
  error: {
    color: "red",
    fontSize: 14,
    marginTop: 8,
  },
};
