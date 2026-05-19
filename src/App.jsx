import { useState } from "react";

import "./App.css";

import Signup from "./components/Signup";
import Modal from "./components/Modal";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

import { generateExpense } from "./services/geminiService";

import useSpeechRecognition from "./hooks/useSpeechRecognition";

function App() {
  const [aiInput, setAiInput] =
    useState("");

  const [expenses, setExpenses] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [showSignup, setShowSignup] =
    useState(false);

  const handleAddAI = async (text) => {
    const input = text || aiInput;

    if (!input) return;

    try {
      setLoading(true);

      const expense =
        await generateExpense(input);

      setExpenses((prev) => [
        ...prev,
        expense,
      ]);

      setAiInput("");
    } catch (error) {
      console.error(error);

      alert(
        "AI could not process input"
      );
    } finally {
      setLoading(false);
    }
  };

  const { listening, startListening } =
    useSpeechRecognition(handleAddAI);

  return (
    <div className="app">
    
      <nav className="navbar">
        <div className="logo">
          AI Expense Tracker
        </div>

        <div className="nav-buttons">
          <button
            type="button"
            className="nav-btn add-btn"
          >
            Add Expense
          </button>

          <button
            type="button"
            className="nav-btn login-btn"
          >
            Login
          </button>

          <button
            type="button"
            className="nav-btn signup-btn"
            onClick={() =>
              setShowSignup(true)
            }
          >
            Signup
          </button>
        </div>
      </nav>

      <section className="hero">
        <h1>
          Manage Your Expenses
          Smartly with AI
        </h1>

        <p>
          Track daily expenses,
          use voice input, and let
          AI organize your
          spending effortlessly.
        </p>
      </section>

      <div className="dashboard">
        <div className="left-panel">
          <ExpenseForm
            aiInput={aiInput}
            setAiInput={setAiInput}
            handleAddAI={
              handleAddAI
            }
            loading={loading}
            listening={listening}
            startListening={
              startListening
            }
          />
        </div>

        <div className="right-panel">
          <ExpenseList
            expenses={expenses}
          />
        </div>
      </div>

      {showSignup && (
        <Modal
          onClose={() =>
            setShowSignup(false)
          }
        >
          <Signup />
        </Modal>
      )}
    </div>
  );
}

export default App;