import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [bahasa, setBahasa] = useState("id"); // default ke bahasa Indonesia

  return (
    <LanguageContext.Provider value={{ bahasa, setBahasa }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);