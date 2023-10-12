import { createContext, useState, useReducer } from "react";
import { stateReducer, stateReducerState } from "../reducers/stateReducer";

export const DataContext = createContext();

export default function DataProvider({ children }) {
  const [isLogin, setIsLogin] = useState(() => false);
  const [stateGlobal, globalDispatch] = useReducer(
    stateReducer,
    stateReducerState
  );

  const contextData = {
    isLogin,
    setIsLogin,
    stateGlobal,
    globalDispatch,
  };

  return (
    <DataContext.Provider value={contextData}>{children}</DataContext.Provider>
  );
}
