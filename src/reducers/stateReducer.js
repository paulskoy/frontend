export const stateReducerState = {
  isLogin: false,
  username: "",
};

export const stateReducerAction = {
  UPDATE_LOGIN: "update login",
  UPDATE_USERNAME: "update username",
};

export const stateReducer = (state, action) => {
  switch (action.type) {
    case "update login":
      return { ...state, isLogin: action.payload };

    case "update username":
      return { ...state, username: action.payload };

    default:
      return state;
  }
};
