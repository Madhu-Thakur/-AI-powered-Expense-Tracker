const ExpenseList = ({
  expenses,
}) => {

  return (

    <div className="card">

      <h2>Expense List</h2>

      {expenses.length === 0 ? (

        <p>No expenses yet.</p>

      ) : (

        expenses.map(
          (exp, index) => (

            <div
              key={index}
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

            </div>
          )
        )
      )}

    </div>
  );
};

export default ExpenseList;