import { DataContext } from "../context/DataProvider";
import { Outlet, Navigate } from "react-router-dom";
import { useContext, useState } from "react";

// private route
// ALWAYS REMEBER THAT ROUTER PROVIDER
// IS ONLY RENDERED ONCE AND U CAN'T
// USE SETSTATE INSIDE OF IT
export default function PrivateRoutes() {
  // grab the global state
  const { stateGlobal } = useContext(DataContext);
  //  the reason we don't use state is because, we don't
  // need to 3gger a rerender, so it's okay that everytime
  // the app is refresh/render we just calculate the value of the token
  let token = "";

  if (localStorage.getItem("token") !== null) {
    token = localStorage.getItem("token").split(",")[0];
  } else {
    token = "";
  }

  return (
    // render the child or redirect in the login
    // depending on the value of the states
    <>
      {stateGlobal.isLogin === true || token.length !== "" ? (
        <>
          <Outlet />
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
