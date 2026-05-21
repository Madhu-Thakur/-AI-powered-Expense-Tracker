import { useState, useEffect } from "react";

import "./App.css";

import { signOut } from "firebase/auth";

import { auth } from "./firebase";

import Signup from "./components/Signup";
import Modal from "./components/Modal";
import Login from "./components/Login";

import Welcome from "./components/Welcome";
import Profile from "./components/Profile";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

import { generateExpense } from "./services/geminiService";

import useSpeechRecognition from "./hooks/useSpeechRecognition";

function App() {
  const [aiInput, setAiInput] = useState("");

  const [expenses, setExpenses] = useState([]);

  const [loading, setLoading] = useState(false);

  const [showSignup, setShowSignup] = useState(false);

  const [showLogin, setShowLogin] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showProfile, setShowProfile] = useState(false);

  //--------------------------new changed expense form states
  const [amount, setAmount] = useState("");

  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("");

  const [editingId, setEditingId] = useState(null);

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

  const { listening, startListening } = useSpeechRecognition(handleAddAI);

  // -----------------------logout function----------------------
  const handleLogout = async () => {
    try {
      await signOut(auth);

      localStorage.removeItem("token");

      setIsLoggedIn(false);

      alert("Logged out successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  //----------------------------------new changed expense add function
  const handleAddExpense = async () => {
    if (!amount || !description || !category) {
      alert("Please fill all fields");

      return;
    }

    const newExpense = {
      amount: amount,
      description: description,
      category: category,
      date: new Date().toLocaleDateString(),
    };

    try {
      if (editingId) {
        await fetch(
          `https://expense-tracker-c15d3-default-rtdb.firebaseio.com/expenses/${editingId}.json`,
          {
            method: "PUT",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify(newExpense),
          },
        );

        setExpenses((prev) =>
          prev.map((expense) =>
            expense.id === editingId
              ? {
                  ...newExpense,
                  id: editingId,
                }
              : expense,
          ),
        );

        setEditingId(null);
      } else {
        const response = await fetch(
          "https://expense-tracker-c15d3-default-rtdb.firebaseio.com/expenses.json",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify(newExpense),
          },
        );

        const data = await response.json();

        setExpenses((prev) => [
          ...prev,
          {
            id: data.name,
            ...newExpense,
          },
        ]);
      }
      setAmount("");
      setDescription("");
      setCategory("");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await fetch(
        `https://expense-tracker-c15d3-default-rtdb.firebaseio.com/expenses/${id}.json`,
        {
          method: "DELETE",
        },
      );

      setExpenses((prev) => prev.filter((expense) => expense.id !== id));

      console.log("Expense successfully deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (expense) => {
    setAmount(expense.amount);

    setDescription(expense.description);

    setCategory(expense.category);

    setEditingId(expense.id);
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(
          "https://expense-tracker-c15d3-default-rtdb.firebaseio.com/expenses.json",
        );

        const data = await response.json();

        if (data) {
          const loadedExpenses = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));

          setExpenses(loadedExpenses);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div className="app">
      {/*-----------------------------------------Navbar-----------------------------------------*/}
      <nav className="navbar">
        <div className="logo">AI Expense Tracker</div>

        <div className="nav-buttons">
          {isLoggedIn ? (
            <button
              type="button"
              className="nav-btn logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <button type="button" className="nav-btn add-btn">
                Add Expense
              </button>

              <button
                type="button"
                className="nav-btn login-btn"
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>

              <button
                type="button"
                className="nav-btn signup-btn"
                onClick={() => setShowSignup(true)}
              >
                Signup
              </button>
            </>
          )}
        </div>
      </nav>

      {/*-----------------------IF LOGGED IN------------------------*/}
      {isLoggedIn ? (
        <>
          <Welcome openProfile={() => setShowProfile(true)} />
          <div className="dashboard">
            <div className="left-panel">
              <ExpenseForm
                aiInput={aiInput}
                setAiInput={setAiInput}
                handleAddAI={handleAddAI}
                loading={loading}
                listening={listening}
                startListening={startListening}
                amount={amount}
                setAmount={setAmount}
                description={description}
                setDescription={setDescription}
                category={category}
                setCategory={setCategory}
                handleAddExpense={handleAddExpense}
              />
            </div>
            <div className="right-panel">
              <ExpenseList
                expenses={expenses}
                handleDeleteExpense={handleDeleteExpense}
                handleEditClick={handleEditClick}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          {/*-------------------Hero Section-------------------------- */}
          <section className="hero">
            <h1>Manage Your Expenses Smartly with AI</h1>

            <p>
              Track daily expenses, use voice input, and let AI organize your
              spending effortlessly.
            </p>
          </section>

          {/*-------------------Dashboard-------------------------- */}
          {/* <div className="dashboard">
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
          </div> */}
        </>
      )}

      {/*-------------------Signup Modal-------------------------- */}
      {showSignup && (
        <Modal onClose={() => setShowSignup(false)}>
          <Signup
            openLogin={() => {
              setShowSignup(false);

              setShowLogin(true);
            }}
          />
        </Modal>
      )}

      {/*-------------------Login Modal-------------------------- */}
      {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <Login
            onLoginSuccess={() => {
              setShowLogin(false);

              setIsLoggedIn(true);
            }}
            openSignup={() => {
              setShowLogin(false);

              setShowSignup(true);
            }}
          />
        </Modal>
      )}

      {/*-------------------Profile Modal-------------------------- */}
      {showProfile && (
        <div className="modal-overlay">
          <div className="modal-content">
            <Profile closeProfile={() => setShowProfile(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
