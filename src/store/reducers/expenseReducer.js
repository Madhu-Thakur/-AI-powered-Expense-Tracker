const initialState = {
  expenses: [],
};

const expenseReducer = (
  state = initialState,
  action
) => {

/*---------------------------------Fetch Expenses State------------------------------*/
  if (
    action.type ===
    "SET_EXPENSES"
  ) {
    return {
      expenses:
        action.payload,
    };
  }

  /*---------------------------------Add Expense State------------------------------*/
  if (
    action.type ===
    "ADD_EXPENSE"
  ) {
    return {
      expenses: [
        ...state.expenses,
        action.payload,
      ],
    };
  }

  if (
    action.type ===
    "DELETE_EXPENSE"
  ) {
    return {
      expenses:
        state.expenses.filter(
          (expense) =>
            expense.id !==
            action.payload
        ),
    };
  }

   
  if (
    action.type ===
    "UPDATE_EXPENSE"
  ) {
    return {
      expenses:
        state.expenses.map(
          (expense) =>
            expense.id ===
            action.payload.id
              ? action.payload
              : expense
        ),
    };
  }

  return state;
};

export default expenseReducer;