import React, { useEffect, useState, useContext } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import {
  deletetodo,
  getAllTodos,
  updateTodoStatus,
} from "../TodosService/TodosService";
import { toast } from "react-toastify";
import { TodosContext } from "./../context/TodosContext";
import { ClipLoader } from "react-spinners"; // Importing ClipLoader

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({}); // State for individual actions
  const { fetchagain, changefetchstate } = useContext(TodosContext);
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
          const filteredTodos = fetchedTodos.filter((todo) => !todo.completed);
          setTodos(filteredTodos);
        } else {
          throw new Error("Todos data is not an array");
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchTodos();
  }, [fetchagain, userId]);

  const handleStatusUpdate = async (todoId) => {
    setActionLoading((prevState) => ({ ...prevState, [todoId]: true }));
    try {
      await updateTodoStatus(userId, todoId, "true");
      toast.success("Task status updated successfully");

      setTodos(todos.filter((todo) => todo._id !== todoId));
      changefetchstate();
    } catch (error) {
      toast.error(
        error.message ||
          "An error occurred while updating the task status. Please try again."
      );
    } finally {
      setActionLoading((prevState) => ({ ...prevState, [todoId]: false }));
    }
  };

  const handleDeleteTodo = async (todoId) => {
    setActionLoading((prevState) => ({ ...prevState, [todoId]: true }));
    try {
      await deletetodo(userId, todoId);
      toast.success("Task deleted successfully");

      setTodos(todos.filter((todo) => todo._id !== todoId));
      changefetchstate();
    } catch (error) {
      toast.error(
        error.message ||
          "An error occurred while deleting the task. Please try again."
      );
    } finally {
      setActionLoading((prevState) => ({ ...prevState, [todoId]: false }));
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="sm:w-[38vw]">
        {todos.length > 0 && (
          <h1 className="mb-2">Tasks to do - {todos.length}</h1>
        )}
        {loading ? (
          <div className="flex justify-center items-center">
            <ClipLoader color="#3E1671" size={50} /> {/* Loader size set to 50 */}
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
                {actionLoading[todo._id] ? (
                  <ClipLoader color="#9E78CF" size={20} />
                ) : (
                  <>
                    <span
                      className="text-[#9E78CF] cursor-pointer text-xl"
                      onClick={() => handleStatusUpdate(todo._id)}
                    >
                      <IoMdCheckmark />
                    </span>
                    <span
                      className="text-[#9E78CF] cursor-pointer text-xl"
                      onClick={() => handleDeleteTodo(todo._id)}
                    >
                      <AiOutlineDelete />
                    </span>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
