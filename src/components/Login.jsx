import { useState } from "react";

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "../firebase";

function Login({
  onLoginSuccess,
  openSignup,
}) {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError(
        "All fields are mandatory"
      );

      return;
    }

    try {
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const token =
        await userCredential.user.getIdToken();

      localStorage.setItem(
        "token",
        token
      );

      alert("Login Successful");

      onLoginSuccess();
    } catch (err) {
      alert("Invalid credentials");

      setError(err.message);
    }
  };

  const handleForgotPassword =
    async () => {
      if (!email) {
        alert(
          "Please enter your email first"
        );

        return;
      }

      try {
        await sendPasswordResetEmail(
          auth,
          email
        );

        alert(
          "Password reset email sent"
        );
      } catch (err) {
        alert(err.message);
      }
    };

  return (
    <form
      className="signup-form"
      onSubmit={handleLogin}
    >
      <h2>Login</h2>

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <p
        className="forgot-password"
        onClick={
          handleForgotPassword
        }
      >
        Forgot Password?
      </p>

      <button type="submit">
        Login
      </button>

      <p className="switch-text">
        Don't have an account?

        <span onClick={openSignup}>
          Signup
        </span>
      </p>
    </form>
  );
}

export default Login;