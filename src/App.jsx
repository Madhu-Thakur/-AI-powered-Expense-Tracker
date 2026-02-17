import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./App.css";


console.log("ENV KEY =>", import.meta.env.VITE_GEMINI_API_KEY);



function App() {
  const [aiInput, setAiInput] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const genAI = new GoogleGenerativeAI(
    import.meta.env.VITE_GEMINI_API_KEY
  );

  // ===== AI HANDLER =====
  const handleAddAI = async (inputText) => {
    const text = inputText || aiInput;
    if (!text) return;

    setLoading(true);

    try {
      const today = new Date().toISOString().split("T")[0];

      const prompt = `
You are a JSON API.

Text: "${text}"

Respond ONLY with valid JSON.
No explanation.

{
  "title": "Food",
  "amount": 100,
  "category": "Food",
  "description": "Expense added using AI",
  "date": "${today}"
}
`;

      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-lite",
      });

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      const cleaned = responseText.replace(/```json|```/g, "");
      const expense = JSON.parse(cleaned);

      setExpenses((prev) => [...prev, expense]);
      setAiInput("");
    } catch (error) {
      console.error("Gemini Error:", error);
      alert("AI could not process input");
    }

    setLoading(false);
  };

  // ===== VOICE INPUT =====
  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice input not supported in this browser");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setAiInput(transcript);
      handleAddAI(transcript);
    };

    recognition.start();
  };

  return (
    <div className="container">
      <h1>AI Expense Tracker</h1>

      <div className="card">
        <h2>Add Expense with AI or Voice</h2>

        <input
          type="text"
          placeholder='e.g. "100 rupees biryani"'
          value={aiInput}
          onChange={(e) => setAiInput(e.target.value)}
        />

        <div className="buttons">
          <button
            className="btn green"
            onClick={() => handleAddAI()}
            disabled={loading}
          >
            {loading ? "Processing..." : "Add with AI"}
          </button>

          <button
            className={`btn ${listening ? "red" : "purple"}`}
            onClick={handleVoiceInput}
          >
            {listening ? "Listening..." : "🎤 Speak"}
          </button>
        </div>
      </div>

      <div className="card">
        <h2>Expense List</h2>

        {expenses.length === 0 && (
          <p className="empty">No expenses yet.</p>
        )}

        {expenses.map((exp, index) => (
          <div key={index} className="expense">
            <p><strong>{exp.title}</strong> — ₹{exp.amount}</p>
            <p>{exp.category}</p>
            <p>{exp.description}</p>
            <p className="date">{exp.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
 