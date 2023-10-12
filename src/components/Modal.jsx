import { updateTodo } from "../api/todoApi";

export default function Modal(props) {
  return (
    <div className="modal-container">
      <div className="modal">
        <input
          type="text"
          value={props.editTodo.task_taskname}
          onChange={(e) =>
            props.setEditTodo({
              ...props.editTodo,
              task_taskname: e.target.value,
            })
          }
        />
        <button
          className="submit"
          onClick={() => {
            updateTodo(props.editTodo.task_taskname, props.editTodo.id).then(
              (data) => console.log(data)
            );
            props.setRender(true);
            props.setShowModal(false);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
