const ExpenseForm = ({
  aiInput,
  setAiInput,
  handleAddAI,
  loading,
  listening,
  startListening,
}) => {
  return (
    <div className="card">
      <h2>Add Expense</h2>

      <input
        type="text"
        placeholder='e.g. "100 rupees biryani"'
        value={aiInput}
        onChange={(e) => setAiInput(e.target.value)}
      />

      <div className="buttons">
        <button
          className="btn green"
          onClick={handleAddAI}
        >
          {loading ? "Processing..." : "Add with AI"}
        </button>

        <button
          className={`btn ${listening ? "red" : "purple"}`}
          onClick={startListening}
        >
          {listening ? "Listening..." : "🎤 Speak"}
        </button>
      </div>
    </div>
  );
};

export default ExpenseForm;