import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// components
import Login from "../components/Login";
import PrivateRoutes from "./PrivateRoutes";
import Todo from "../components/Todo";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} exact />
      <Route element={<PrivateRoutes />}>
        <Route path="todoapp" element={<Todo />} />
      </Route>
    </>
  )
);

export default Router;
