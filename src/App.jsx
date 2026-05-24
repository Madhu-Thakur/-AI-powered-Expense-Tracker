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

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { generateExpense } from "./services/geminiService";

import useSpeechRecognition from "./hooks/useSpeechRecognition";

function App() {
  const [aiInput, setAiInput] = useState("");

  const [loading, setLoading] = useState(false);

  const [showSignup, setShowSignup] = useState(false);

  const [showLogin, setShowLogin] = useState(false);

  const [showProfile, setShowProfile] = useState(false);

  /*---------------------------------Expense Form State------------------------------*/
  const [amount, setAmount] = useState("");

  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("");

  const [editingId, setEditingId] = useState(null);

  const dispatch = useDispatch();

  /*---------------------------------Redux Auth State------------------------------*/
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const darkMode = useSelector((state) => state.theme.darkMode);

  /*---------------------------------Redux Expense State------------------------------*/
  const expenses = useSelector((state) => state.expense.expenses);
  const totalExpense = expenses.reduce(
    (total, expense) => total + Number(expense.amount || 0),
    0,
  );

  /*---------------------------------AI Expense State------------------------------*/
  const handleAddAI = async (text) => {
    const input = text || aiInput;

    if (!input) return;

    try {
      setLoading(true);

      const expense = await generateExpense(input);

      dispatch({
        type: "ADD_EXPENSE",

        payload: expense,
      });

      setAiInput("");
    } catch (error) {
      console.error(error);

      alert("AI could not process input");
    } finally {
      setLoading(false);
    }
  };

  const { listening, startListening } = useSpeechRecognition(handleAddAI);

  /*---------------------------------Logout State------------------------------*/
  const handleLogout = async () => {
    try {
      await signOut(auth);

      localStorage.removeItem("token");

      dispatch({
        type: "LOGOUT",
      });

      alert("Logged out successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  /*---------------------------------Add/Update Expense State------------------------------*/
  const handleAddExpense = async () => {
    if (!amount || !description || !category) {
      alert("Please fill all fields");

      return;
    }

    const newExpense = {
      amount,
      description,
      category,
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

        dispatch({
          type: "UPDATE_EXPENSE",

          payload: {
            ...newExpense,

            id: editingId,
          },
        });

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

        dispatch({
          type: "ADD_EXPENSE",

          payload: {
            id: data.name,

            ...newExpense,
          },
        });
      }

      setAmount("");
      setDescription("");
      setCategory("");
    } catch (error) {
      alert(error.message);
    }
  };

  /*---------------------------------Delete Expense State------------------------------*/
  const handleDeleteExpense = async (id) => {
    try {
      await fetch(
        `https://expense-tracker-c15d3-default-rtdb.firebaseio.com/expenses/${id}.json`,
        {
          method: "DELETE",
        },
      );

      dispatch({
        type: "DELETE_EXPENSE",

        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /*---------------------------------Edit Expense State------------------------------*/
  const handleEditClick = (expense) => {
    setAmount(expense.amount);

    setDescription(expense.description);

    setCategory(expense.category);

    setEditingId(expense.id);
  };

  // ---------------- DOWNLOAD CSV ----------------
const downloadCSV = () => {

  const headers = [
    "Amount",
    "Description",
    "Category",
    "Date",
  ];

  const rows = expenses.map(
    (expense) => [
      expense.amount,

      expense.description,

      expense.category,

      expense.date,
    ]
  );

  const csvContent = [
    headers,
    ...rows,
  ]
    .map((row) =>
      row.join(",")
    )
    .join("\n");

  const blob = new Blob(
    [csvContent],
    {
      type: "text/csv",
    }
  );

  const url =
    window.URL.createObjectURL(
      blob
    );

  const a =
    document.createElement("a");

  a.href = url;

  a.download =
    "expenses.csv";

  a.click();

  window.URL.revokeObjectURL(
    url
  );
};

  /*---------------------------------Fetch Expenses State------------------------------*/
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

          dispatch({
            type: "SET_EXPENSES",

            payload: loadedExpenses,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchExpenses();
  }, [dispatch]);

  return (
    <div className={`app ${darkMode ? "dark-theme" : ""}`}>
      {/*---------------------------------Navbar------------------------------*/}
      <nav className="navbar">

  <div className="logo">
    AI Expense Tracker
  </div>

  <div className="nav-buttons">

    {isLoggedIn ? (
      <>

        <button
          type="button"
          className="nav-btn logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

        {totalExpense > 10000 && (
          <>

            <button
              className="premium-btn"
              onClick={() =>
                dispatch({
                  type: "TOGGLE_THEME",
                })
              }
            >
              Activate Premium
            </button>

            <button
              className="download-btn"
              onClick={downloadCSV}
            >
              Download CSV
            </button>

          </>
        )}

      </>
    ) : (
      <>

        <button
          type="button"
          className="nav-btn add-btn"
        >
          Add Expense
        </button>

        <button
          type="button"
          className="nav-btn login-btn"
          onClick={() =>
            setShowLogin(true)
          }
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

      </>
    )}

  </div>

</nav>

{/* ---------------- HERO / DASHBOARD ---------------- */}

{isLoggedIn ? (
  <>
    <Welcome
      openProfile={() =>
        setShowProfile(true)
      }
    />

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
    <section className="hero">

      <h1>
        Manage Your Expenses Smartly with AI
      </h1>

      <p>
        Track daily expenses,
        use voice input,
        and let AI organize your
        spending effortlessly.
      </p>

    </section>
  </>
)}
      {/*---------------------------------Signup MODAL------------------------------*/}
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
      {/*---------------------------------LOGIN MODAL------------------------------*/}
      {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <Login
            onLoginSuccess={() => {
              setShowLogin(false);
            }}
            openSignup={() => {
              setShowLogin(false);

              setShowSignup(true);
            }}
          />
        </Modal>
      )}
      {/*---------------------------------Profile Modal------------------------------*/}
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
