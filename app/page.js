"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Бүгд");
  const [isLoaded, setIsLoaded] = useState(false);

  const sizePrices = ["Бүгд", "Хийх", "Дууссан"];

  useEffect(() => {
    const savedTodos = localStorage.getItem("todoList");

    if (savedTodos) {
      setTodoList(JSON.parse(savedTodos));
    }

    setIsLoaded(true);
  }, []);
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList, isLoaded]);

  const submitTodoList = () => {
    if (inputValue.trim() === "") return;

    const todo = {
      title: inputValue,
      isDone: false,
    };

    setTodoList([...todoList, todo]);
    setInputValue("");
  };

  const deleteTodo = (index) => {
    setTodoList(todoList.filter((todo, i) => i !== index));
  };

  const filteredTodoList = todoList.filter((todo) => {
    if (activeFilter === "Хийх") return !todo.isDone;
    if (activeFilter === "Дууссан") return todo.isDone;
    return true;
  });

  const toggleTodo = (index) => {
    setTodoList(
      todoList.map((item, i) =>
        i === index ? { ...item, isDone: !item.isDone } : item,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 px-4 py-10 flex justify-center items-start">
      <div className="text-black bg-white flex flex-col gap-4 p-10 rounded-2xl">
        <h1 className="text-2xl font-bold">✅ Хийх ажил</h1>

        <p>{todoList.length} ажил</p>

        <div className="flex gap-4 items-center">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submitTodoList();
            }}
            className="w-[400px] h-10 border border-[#ccd7e3] rounded-lg px-4"
            type="text"
            placeholder="шинэ ажил бичих ..."
          />

          <button
            onClick={submitTodoList}
            className="w-[70px] h-10 flex justify-center items-center bg-orange-500 text-white rounded-lg"
          >
            Нэмэх
          </button>
        </div>

        <div className="flex gap-3">
          {sizePrices.map((sizePrice) => (
            <button
              key={sizePrice}
              onClick={() => setActiveFilter(sizePrice)}
              className={`px-5 py-2 rounded-lg ${
                activeFilter === sizePrice
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {sizePrice}
            </button>
          ))}
        </div>

        {filteredTodoList.map((todo) => {
          const originalIndex = todoList.indexOf(todo);

          return (
            <div
              key={originalIndex}
              className="flex justify-between items-center bg-[#f7fafb] px-3 py-2 rounded-lg gap-3"
            >
              <input
                type="checkbox"
                checked={todo.isDone}
                onChange={() => toggleTodo(originalIndex)}
              />

              <p className={todo.isDone ? "line-through text-gray-400" : ""}>
                {todo.title}
              </p>

              <button
                onClick={() => deleteTodo(originalIndex)}
                className="text-2xl"
              >
                🗑️
              </button>
            </div>
          );
        })}
        {filteredTodoList.length === 0 && (
          <p className="text-gray-400 text-center">Ажил байхгүй байна 😊</p>
        )}
      </div>
    </div>
  );
}
