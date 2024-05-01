import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const { default: Navbar } = require("./Components/Navbar");

function App() {
  const [todo, setTodo] = useState("");

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (id) => {
    let index = todos.findIndex((todo) => todo.id === id);

    setTodo(todos[index].todo);
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleAdd = () => {
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);
    setTodo("");
    saveToLS(newTodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (id) => {

    const newTodos = todos.map((item) => {
      if (item.id === id) {
        item.isCompleted = !item.isCompleted;
        return item;
      }
    });



    setTodos(newTodos);
    saveToLS(newTodos);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
        <div className="addTodo my-5">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input
            type="text"
            className="w-3/4 px-2"
            border-color-black
            onChange={(e) => handleChange(e)}
            value={todo}
          ></input>
          <button
            onClick={handleAdd}
            className="bg-violet-800 hover:bg-violet-950 p-2 py-1 tex-sm font-bold text-white rounded-md mx-6"
          >
            Add
          </button>
        </div>
        <h1 className="text-lg font-bold ">Your Todos</h1>
        <div className="todos">
          {todos.length === 0 && (
            <div className="m-5"> No todos to dispaly </div>
          )}
          {todos.map((item) => {
            return (
              <div key={item} className="todo flex w-1/2 justify-between my-3">
                {/* <div> */}
                <div className="flex items-center gap-5">
                  <input
                    name={item.id}
                    type="checkbox"
                    onChange={() => handleCheckbox(item.id)}
                    value={todo.isCompleted}
                    id=""
                  ></input>
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>

                <div className="buttons flex h-full">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-violet-800 hover:bg-violet-950 p-2 py-1 tex-sm font-bold text-white rounded-md mx-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-violet-800 hover:bg-violet-950 p-2 py-1 tex-sm font-bold text-white rounded-md mx-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
