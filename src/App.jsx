// import { useState } from "react";
// import "./App.css";

// import ExpenseForm from "./components/ExpenseForm";
// import ExpenseList from "./components/ExpenseList";

// import { generateExpense } from "./services/geminiService";
// import useSpeechRecognition from "./hooks/useSpeechRecognition";

// function App() {
//   const [aiInput, setAiInput] = useState("");
//   const [expenses, setExpenses] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleAddAI = async (text) => {
//     const input = text || aiInput;

//     if (!input) return;

//     try {
//       setLoading(true);

//       const expense = await generateExpense(input);

//       setExpenses((prev) => [...prev, expense]);

//       setAiInput("");
//     } catch (error) {
//       console.error(error);
//       alert("AI could not process input");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const { listening, startListening } =
//     useSpeechRecognition(handleAddAI);

//   return (
//     <div className="container">
//       <h1>AI Expense Tracker</h1>

//       <ExpenseForm
//         aiInput={aiInput}
//         setAiInput={setAiInput}
//         handleAddAI={handleAddAI}
//         loading={loading}
//         listening={listening}
//         startListening={startListening}
//       />

//       <ExpenseList expenses={expenses} />
//     </div>
//   );
// }

// export default App;


import { useState } from "react";
import "./App.css";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

import { generateExpense } from "./services/geminiService";
import useSpeechRecognition from "./hooks/useSpeechRecognition";

function App() {
  const [aiInput, setAiInput] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddAI = async (text) => {
    const input = text || aiInput;

    if (!input) return;

    try {
      setLoading(true);

      const expense = await generateExpense(input);

      setExpenses((prev) => [...prev, expense]);

      setAiInput("");
    } catch (error) {
      console.error(error);
      alert("AI could not process input");
    } finally {
      setLoading(false);
    }
  };

  const { listening, startListening } =
    useSpeechRecognition(handleAddAI);

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">AI Expense Tracker</div>

        <div className="nav-buttons">
          <button className="nav-btn add-btn">
            Add Expense
          </button>

          <button className="nav-btn login-btn">
            Login
          </button>

          <button className="nav-btn signup-btn">
            Signup
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>Manage Your Expenses Smartly with AI</h1>

        <p>
          Track daily expenses, use voice input,
          and let AI organize your spending effortlessly.
        </p>
      </section>

      {/* Dashboard */}
      <div className="dashboard">
        <div className="left-panel">
          <ExpenseForm
            aiInput={aiInput}
            setAiInput={setAiInput}
            handleAddAI={handleAddAI}
            loading={loading}
            listening={listening}
            startListening={startListening}
          />
        </div>

        <div className="right-panel">
          <ExpenseList expenses={expenses} />
        </div>
      </div>
    </div>
  );
}

export default App;



