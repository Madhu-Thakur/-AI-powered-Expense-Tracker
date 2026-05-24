const initialState = {
  darkMode: false,
};

const themeReducer = (
  state = initialState,
  action
) => {

  if (
    action.type ===
    "TOGGLE_THEME"
  ) {
    return {
      darkMode:
        !state.darkMode,
    };
  }

  return state;
};

export default themeReducer;