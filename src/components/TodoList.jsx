import React, { useEffect, useState, useContext } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import {
  deletetodo,
  getAllTodos,
  updateTodoStatus,
} from "../TodosService/TodosService";
import { toast } from "react-toastify";
import { TodosContext } from "./../context/TodosContext"; // Import TodosContext
import { ClipLoader } from "react-spinners";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchagain, changefetchstate } = useContext(TodosContext); // Use TodosContext
  const userdata = JSON.parse(localStorage.getItem("userdata"));
  const userId = userdata?.id;

  useEffect(() => {
    const fetchTodos = async () => {
      if (!userId) {
        toast.error("User ID not found");
        setLoading(false);
        return;
      }

      try {
        const fetchedTodos = await getAllTodos(userId);
        if (Array.isArray(fetchedTodos)) {
          // Filter out completed todos
          const filteredTodos = fetchedTodos.filter((todo) => !todo.completed);
          setTodos(filteredTodos);
        } else {
          throw new Error("Todos data is not an array");
        }
        setLoading(false);
      } catch (error) {
        toast.error(
          "An error occurred while fetching the todos. Please try again."
        );
        setLoading(false);
      }
    };

    fetchTodos();
  }, [fetchagain, userId]); // Added userId as a dependency

  const handleStatusUpdate = async (todoId) => {
    try {
      await updateTodoStatus(userId, todoId, "true");
      toast.success("Task status updated successfully");

      // Update the todos state to reflect the change
      setTodos(
        todos
          .map((todo) =>
            todo._id === todoId ? { ...todo, completed: true } : todo
          )
          .filter((todo) => !todo.completed)
      ); // Filter out the completed task

      changefetchstate();
    } catch (error) {
      toast.error(
        error.message ||
          "An error occurred while updating the task status. Please try again."
      );
    }
  };
  const handledeletetodo = async (todoId) => {
    try {
      await deletetodo(userId, todoId);
      toast.success("Task deleted successfully");

      // Update the todos state to reflect the change
      setTodos(
        todos
          .map((todo) =>
            todo._id === todoId ? { ...todo, completed: true } : todo
          )
          .filter((todo) => !todo.completed)
      ); // Filter out the completed task

      changefetchstate();
    } catch (error) {
      toast.error(
        error.message ||
          "An error occurred while updating the task status. Please try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="sm:w-[38vw]">
        {todos.length > 0 ? (
          <h1 className="mb-2">Tasks to do - {todos.length}</h1>
        ) : (
          ""
        )}
        {loading ? (
          <div className="loader">
            <ClipLoader color="#3E1671" />
          </div>
        ) : todos.length === 0 ? (
          <p>No todos found</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo._id}
              className="bg-[#15101C] rounded-md flex justify-between px-4 p-5 mb-2 max-[628px]:w-80 max-[342px]:w-[87vw]"
            >
              <p
                className={`text-[#9E78CF] truncate ${
                  todo.completed ? "line-through" : ""
                }`}
              >
                {todo.title}
              </p>
              <div className="flex items-center sm:gap-x-4 max-[630px]:gap-x-2">
                <span
                  className="text-[#9E78CF] cursor-pointer text-xl"
                  onClick={() => {
                    handleStatusUpdate(todo._id);
                  }}
                >
                  <IoMdCheckmark />
                </span>
                <span
                  className="text-[#9E78CF] cursor-pointer text-xl"
                  onClick={() => {
                    handledeletetodo(todo._id);
                  }}
                >
                  <AiOutlineDelete />
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
