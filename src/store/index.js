import { createStore, combineReducers } from "redux";

import authReducer from "./reducers/authReducer";

import expenseReducer from "./reducers/expenseReducer";
import themeReducer from "./reducers/themeReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  expense: expenseReducer,
  theme: themeReducer,
});

const store = createStore(rootReducer);

export default store;