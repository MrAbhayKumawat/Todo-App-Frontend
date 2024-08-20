import React, { useEffect, useState, useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { getCompletedTodos, deletetodo } from "../TodosService/TodosService";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { TodosContext } from "../context/TodosContext";

const CompletedTodos = () => {
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
        const completedTodos = await getCompletedTodos(userId);

        if (Array.isArray(completedTodos)) {
          setTodos(completedTodos);
        } else if (completedTodos && Array.isArray(completedTodos.usertodos)) {
          setTodos(completedTodos.usertodos);
        } else {
          throw new Error("Todos data is not in the expected format");
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchTodos();
  }, [fetchagain, userId]);

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
          <h1 className="mb-2">Completed - {todos.length}</h1>
        )}
        {loading ? (
          <div className="flex justify-center items-center">
            <ClipLoader color="#3E1671" size={50} />
          </div>
        ) : todos.length === 0 ? (
          <p>No completed todos found</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo._id}
              className="bg-[#15101C] rounded-md flex justify-between px-4 p-5 mb-2 max-[628px]:w-80 max-[342px]:w-[87vw]"
            >
              <p className="text-green-200 line-through truncate">
                {todo.title}
              </p>
              <div className="flex items-center sm:gap-x-4 max-[630px]:gap-x-2">
                {actionLoading[todo._id] ? (
                  <ClipLoader color="#9E78CF" size={20} />
                ) : (
                  <span
                    className="text-[#9E78CF] cursor-pointer text-xl"
                    onClick={() => handleDeleteTodo(todo._id)}
                  >
                    <AiOutlineDelete />
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CompletedTodos;
