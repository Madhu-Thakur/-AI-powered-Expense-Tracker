import { useState } from "react";

import "../styles/auth.css";

import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebase";
import { useDispatch } from "react-redux";

function Login({ onLoginSuccess, openSignup }) {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("All fields are mandatory");

      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const token = await userCredential.user.getIdToken();

      localStorage.setItem("token", token);
      dispatch({ type: "LOGIN", payload: token });
      alert("Login Successful");

      onLoginSuccess();
    } catch (err) {
      alert("Invalid credentials");

      setError(err.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email first");

      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${
          import.meta.env.VITE_FIREBASE_API_KEY
        }`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            requestType: "PASSWORD_RESET",

            email: email,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message);
      }

      alert("Password reset email sent");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleLogin}>
      <h2>Login</h2>

      {error && <p className="error-message">{error}</p>}

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <p className="forgot-password" onClick={handleForgotPassword}>
        {loading ? "Sending Reset Link..." : "Forgot Password?"}
      </p>

      <button type="submit">Login</button>

      <p className="switch-text">
        Don't have an account?
        <span onClick={openSignup}>Signup</span>
      </p>
    </form>
  );
}

export default Login;
