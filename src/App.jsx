import "./App.css";

import { RouterProvider } from "react-router-dom";

import Router from "./routes/Router";

function App() {
  /***** 
   NOTE: learn how to deploy your react, django, and postgres app
  *****/

  return <RouterProvider router={Router} />;
}

export default App;
