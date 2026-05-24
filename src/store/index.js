import { createStore, combineReducers } from "redux";

import authReducer from "./reducers/authReducer";

import expenseReducer from "./reducers/expenseReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  expense: expenseReducer,
});

const store = createStore(rootReducer);

export default store;