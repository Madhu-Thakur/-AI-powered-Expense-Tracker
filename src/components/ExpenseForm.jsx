const ExpenseForm = ({
  aiInput,
  setAiInput,
  handleAddAI,
  loading,
  listening,
  startListening,
  amount,
  setAmount,
  description,
  setDescription,
  category,
  setCategory,
  handleAddExpense,
}) => {

  return (
    <div className="card">

      <h2>Add Expense</h2>

      <input
        type="text"
        placeholder='e.g. "100 rupees biryani"'
        value={aiInput}
        onChange={(e) =>
          setAiInput(e.target.value)
        }
      />

      <div className="buttons">

        <button
          className="btn green"
          onClick={handleAddAI}
        >
          {loading
            ? "Processing..."
            : "Add with AI"}
        </button>

        <button
          className={`btn ${
            listening
              ? "red"
              : "purple"
          }`}
          onClick={startListening}
        >
          {listening
            ? "Listening..."
            : "🎤 Speak"}
        </button>

      </div>

      <div className="manual-expense-form">

        {/* NEW: Amount input */}
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />

        <select
        placeholder="Select Category"
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
        >
          <option value="Food">
            Food
          </option>

          <option value="Petrol">
            Petrol
          </option>

          <option value="Shopping">
            Shopping
          </option>

          <option value="Travel">
            Travel
          </option>

          <option value="Salary">
            Salary
          </option>

        </select>

        <button
        type="button"
          className="btn blue"
          onClick={handleAddExpense}
        >
          Add Expense
        </button>

      </div>

    </div>
  );
};

export default ExpenseForm;