import React, { createContext, useState } from "react";

const TodosContext = createContext(); // Create the context

export const TodosProvider = ({ children }) => {
  const [fetchagain, setfetchagain] = useState(false);

  const changefetchstate = () => {
    setfetchagain(!fetchagain);
  };

  return (
    <TodosContext.Provider value={{ fetchagain, changefetchstate }}>
      {children}
    </TodosContext.Provider>
  );
};

export { TodosContext }; // Export the context
