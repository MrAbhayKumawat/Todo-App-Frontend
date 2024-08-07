import React from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import CompletedTodos from "../components/CompletedTodos";

const Todos = () => {
  return (
    <>
          <main className="mt-10">
              <TodoForm />
        <TodoList />
        
              <CompletedTodos/>
    </main>
    </>
  );
};

export default Todos;
