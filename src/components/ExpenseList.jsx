const ExpenseList = ({ expenses }) => {
  return (
    <div className="card">
      <h2>Expense List</h2>

      {expenses.length === 0 ? (
        <p>No expenses yet.</p>
      ) : (
        expenses.map((exp, index) => (
          <div key={index} className="expense">
            <p>
              <strong>{exp.title}</strong> — ₹{exp.amount}
            </p>

            <p>{exp.category}</p>
            <p>{exp.description}</p>
            <p>{exp.date}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ExpenseList;