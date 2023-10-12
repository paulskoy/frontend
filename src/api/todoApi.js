export const getAllTodo = async (username) => {
  const res = await fetch(
    `${import.meta.env.VITE_REACT_API_TODO}/getalltodo/${username}`
  );

  const data = res.json();

  return data;
};

export const addTodo = async (todo, username) => {
  const res = await fetch(`${import.meta.env.VITE_REACT_API_TODO}/addtodo`, {
    method: "POST",
    headers: { "Content-type": "Application/json" },
    body: JSON.stringify({ todo, username }),
  });

  const data = res.json();

  return data;
};

export const updateTodo = async (todo, id) => {
  const res = await fetch(
    `${import.meta.env.VITE_REACT_API_TODO}/updatetodo/${id}`,
    {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify({ task_taskname: todo }),
    }
  );

  const data = res.json();

  return data;
};

export const deleteTodo = async (id) => {
  const res = await fetch(
    `${import.meta.env.VITE_REACT_API_TODO}/deletetodo/${id}`,
    {
      method: "POST",
    }
  );

  const data = res.json();

  return data;
};
