// hooks
import { useState, useEffect } from "react";

// todo api
import { getAllTodo, addTodo, deleteTodo } from "../api/todoApi";

// token api
import { checkAccessToken, checkRefreshToken } from "../api/verifyToken";

import Modal from "./Modal";

import { NavLink, useNavigate } from "react-router-dom";

export default function Todo() {
  const [todo, setTodo] = useState(() => "");
  const [todoList, setTodoList] = useState(() => {});
  const [editTodo, setEditTodo] = useState(() => {});

  const [render, setRender] = useState(() => false);

  const [username, setUsername] = useState(() => {
    return localStorage.getItem("token").split(",")[1];
  });

  const [showModal, setShowModal] = useState(() => false);

  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const navigate = useNavigate();

  // everytime the value of render change, request
  // todos from the backend
  useEffect(() => {
    // fetch then put the value into the TodoList
    getAllTodo(username).then((data) => setTodoList(data.data));

    // change the value of render
    setRender(false);
  }, [render]);

  useEffect(() => {
    setToken(() => {
      const storage = localStorage.getItem("token");

      if (storage !== null) return storage;

      return null;
    });
  }, []);

  // function to clear the local storage when logging out
  const handleLogout = () => {
    localStorage.clear();
  };

  // function to handle verification
  const handleVerification = async () => {
    // split the the token with comma, and grab the index 0
    const accessRes = await checkAccessToken(token.split(",")[0]);

    // check whether the remove is true or false
    // if true the token is expire, if not u guess it
    if (accessRes.remove) {
      // request a new access token by providing the
      // refresh token which is index number 1
      const refreshRes = await checkRefreshToken(token.split(",")[1]);

      // if the refresh token is also expire
      if (refreshRes.remove) {
        // clear the storage
        localStorage.clear();

        // logout the user
        navigate("/");
      } else {
        // replace the token in the localstorage
        localStorage.setItem("token", refreshRes.token);

        // set the token state to a new one
        setToken(refreshRes.token);
      }
    }
  };

  return (
    <>
      <NavLink className="logout" onClick={handleLogout} to="/">
        Logout
      </NavLink>

      {showModal && (
        <Modal
          setShowModal={setShowModal}
          editTodo={editTodo}
          setEditTodo={setEditTodo}
          setRender={setRender}
        />
      )}

      <div className="todo-app">
        <div className="add-todo-container">
          <input
            type="text"
            placeholder="add todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button
            className="add"
            onClick={() => {
              addTodo(todo, username);
              setRender(true);
              handleVerification(token);
            }}
          >
            Add
          </button>
        </div>

        <div className="todo-list-container">
          {todoList !== undefined &&
            todoList.map((todo) => {
              return (
                <span key={todo.id}>
                  <p>{todo.task_taskname}</p>
                  <div className="button-container">
                    <button
                      className="delete"
                      onClick={() => {
                        deleteTodo(todo.id);
                        setRender(true);
                        handleVerification(token);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="edit"
                      onClick={() => {
                        setShowModal(true);
                        setEditTodo({
                          id: todo.id,
                          task_taskname: todo.task_taskname,
                        });
                        handleVerification(token);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </span>
              );
            })}
        </div>
      </div>
    </>
  );
}
