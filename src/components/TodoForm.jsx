import React, { useContext, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";
import { createtodo } from "../TodosService/TodosService";
import { TodosContext } from "./../context/TodosContext";

const TodoForm = () => {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  const { changefetchstate } = useContext(TodosContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!task) {
      toast.error("Task cannot be empty");
      return;
    }

    setLoading(true);

    try {
      await createtodo({ title: task, completed: false });
      toast.success("Task created successfully");
      setTask("");
      changefetchstate();
    } catch (error) {
      toast.error(
        error.message ||
          "An error occurred while creating the task. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex justify-center items-center" onSubmit={handleSubmit}>
      <div className="flex justify-center items-center gap-x-3 sm:w-[35vw]">
        <input
          type="text"
          placeholder="Add a new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="focus:outline-none border border-[#3E1671] rounded-md p-3 sm:w-[35vw] placeholder-[#777777] bg-transparent"
          required
        />
        <button
          type="submit"
          className="text-xl bg-[#9E78CF] p-3.5 rounded-md"
          disabled={loading}
        >
          <AiOutlinePlus />
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
