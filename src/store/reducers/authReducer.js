const initialState = {
  token: localStorage.getItem("token") || "",
  isLoggedIn: !!localStorage.getItem("token"),
};

const authReducer = (
  state = initialState,
  action
) => {
  if (action.type === "LOGIN") {
    return {
      ...state,
      token: action.payload,
      isLoggedIn: true,
    };
  }

  if (action.type === "LOGOUT") {
    return {
      token: "",
      isLoggedIn: false,
    };
  }

  return state;
};

export default authReducer;