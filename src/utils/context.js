import React, { createContext, useState } from "react";

// Create a new context
export const ArticleContext = createContext();

export const AppProvider = ({ children }) => {
  const [page, setPage] = useState({});
  return (
    <ArticleContext.Provider value={{ page, setPage }}>
      {children}
    </ArticleContext.Provider>
  );
};
