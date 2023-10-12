import { useState, useRef, useEffect, useContext } from "react";

import { DataContext } from "../context/DataProvider";

// api
import { loginApi } from "../api/loginApi";

import { stateReducerAction } from "../reducers/stateReducer";

import { useNavigate } from "react-router-dom";

export default function Login() {
  // state context for us to verify if the user can login or not
  const { stateGlobal, globalDispatch } = useContext(DataContext);

  // state that allows us to switch between sign up or sing in
  const [isSignUp, setIsSignUp] = useState(() => false);

  // state to store our data, note that the key should match
  //   the backend fields
  const [data, setData] = useState(() => {
    return { user_username: "", user_password: "", confirm_password: "" };
  });

  // when switching between sign in and sign up
  // form should not be submitted immediately
  // instead we want the user press the same button twice
  // for it to sign up

  // solution is store the previous value of the isSignUp
  // to the useRef so that if both are equal meaning the
  // user press the button two in a row
  const prevIsSignUp = useRef(!isSignUp);

  // state to store our messages
  const [message, setMessage] = useState(() => "");

  const navigate = useNavigate();

  //   handle the clearing of the fields when switching from sign up to sing in
  useEffect(() => {
    setData({ user_username: "", user_password: "", confirm_password: "" });
    setMessage("");
  }, [isSignUp]);

  // handle the change of isSignUP
  const handleIsSignUp = (page) => {
    prevIsSignUp.current = isSignUp;
    page === "sign up" ? setIsSignUp(true) : setIsSignUp(false);
  };

  //   handle submition
  const handleSumbit = async (e, data) => {
    e.preventDefault();

    // before proceeding to submit the form check first if the
    // prev sign up value is equal to the current isSignUp value
    if (prevIsSignUp.current === isSignUp) {
      if (isSignUp) {
        // check if the password matches
        if (data.user_password === data.confirm_password) {
          // send data to the backend
          loginApi("createuser", data).then((response) =>
            setMessage(response.message)
          );
        } else {
          // if the password doesn't match output this
          setMessage(`pls match the password`);
        }
      } else {
        // verify the user
        await loginApi("verifyuser", data).then((response) => {
          // set the local storage's value
          localStorage.setItem("token", response.token);

          // set the message
          setMessage(response.message);

          // set the login
          globalDispatch({
            type: stateReducerAction.UPDATE_LOGIN,
            payload: response.login,
          });

          // update the user
          globalDispatch({
            type: stateReducerAction.UPDATE_USERNAME,
            payload: response.username,
          });
        });

        const storage = localStorage.getItem("token");

        // check whether the return value of the getItem
        // is not undefined(string), we need to do this
        // in order for our message to show up, because
        // navigate refreshes the page
        storage !== "undefined" && navigate("/todoapp");
      }
    }
  };

  return (
    <form className="login-container" onSubmit={(e) => handleSumbit(e, data)}>
      <h1>WELCOME!</h1>

      <div className="input-container">
        {/* render the confirm password when it's the sign up page */}
        <input
          type="username"
          placeholder="username or gmail"
          value={data.user_username}
          onChange={(e) => setData({ ...data, user_username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="password"
          value={data.user_password}
          onChange={(e) => setData({ ...data, user_password: e.target.value })}
          required
        />
        {isSignUp && (
          <input
            type="password"
            placeholder="confirm password"
            value={data.confirm_password}
            onChange={(e) =>
              setData({ ...data, confirm_password: e.target.value })
            }
            required
          />
        )}

        <span className={message === "" ? "message" : "message show"}>
          {message}
        </span>
      </div>

      <div className="button-container">
        <button
          type="submit"
          onClick={() => {
            handleIsSignUp("sign in");
          }}
        >
          Sign In
        </button>

        <button
          onClick={() => {
            handleIsSignUp("sign up");
          }}
          type="submit"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}
