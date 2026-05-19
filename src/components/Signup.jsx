import { useState } from "react";

import {
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase";

function Signup() {
  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError(
        "All fields are mandatory"
      );

      return;
    }

    if (
      password !== confirmPassword
    ) {
      setError(
        "Passwords do not match"
      );

      return;
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log(
        "User has successfully signed up"
      );

      alert("Signup Successful");

      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <form
        className="signup-form"
        onSubmit={handleSignup}
      >
        <h2>Sign Up</h2>

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

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
        />

        <button type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;