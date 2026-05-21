const ExpenseList = ({
  expenses,
 
  handleDeleteExpense,
 
  handleEditClick,
}) => {

  return (

    <div className="card">

      <h2>Expense List</h2>

      {expenses.length === 0 ? (

        <p>No expenses yet.</p>

      ) : (

        expenses.map(
          (exp) => (

            <div
              key={exp.id}
              className="expense"
            >
 
              <h3>
                ₹{exp.amount}
              </h3>
 
              <p>
                <strong>
                  Description:
                </strong>{" "}
                {exp.description}
              </p>
 
              <p>
                <strong>
                  Category:
                </strong>{" "}
                {exp.category}
              </p>

              {exp.title && (
                <p>
                  <strong>
                    Title:
                  </strong>{" "}
                  {exp.title}
                </p>
              )}

              {exp.date && (
                <p>
                  <strong>
                    Date:
                  </strong>{" "}
                  {exp.date}
                </p>
              )}

              <div className="expense-buttons">

                <button
                  className="edit-btn"
                  onClick={() =>
                    handleEditClick(exp)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDeleteExpense(
                      exp.id
                    )
                  }
                >
                  Delete
                </button>

              </div>

            </div>
          )
        )
      )}

    </div>
  );
};

export default ExpenseList;