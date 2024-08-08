import React, { useEffect, useState, useContext } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { getCompletedTodos, deletetodo } from "../TodosService/TodosService"; // Import deletetodo
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { TodosContext } from "../context/TodosContext";

const CompletedTodos = () => {
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
        const completedTodos = await getCompletedTodos(userId);

        // Handle different potential structures of the response
        if (Array.isArray(completedTodos)) {
          setTodos(completedTodos);
        } else if (completedTodos && Array.isArray(completedTodos.usertodos)) {
          setTodos(completedTodos.usertodos);
        } else {
          throw new Error("Todos data is not in the expected format");
        }

        setLoading(false);
      } catch (error) {
       console.log(error)
        setLoading(false);
      }
    };

    fetchTodos();
  }, [fetchagain]); // Added userId to the dependency array

  const handleDeleteTodo = async (todoId) => {
    try {
      await deletetodo(userId, todoId);
      toast.success("Task deleted successfully");

      // Update the todos state to reflect the change
      setTodos(todos.filter((todo) => todo._id !== todoId));
      changefetchstate();
    } catch (error) {
      toast.error(
        error.message ||
          "An error occurred while deleting the task. Please try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="sm:w-[38vw]">
        {todos.length > 0 ? (
          <h1 className="mb-2">Completed - {todos.length}</h1>
        ) : (
          ""
        )}
        {loading ? (
          <div className="loader">
            <ClipLoader color="#3E1671" />
          </div>
        ) : todos.length === 0 ? (
          <p></p>
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
                <span
                  className="text-[#9E78CF] cursor-pointer text-xl"
                  onClick={() => handleDeleteTodo(todo._id)}
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

export default CompletedTodos;
