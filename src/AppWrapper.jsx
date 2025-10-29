import React from "react";
import App from "./App";
import { LanguageProvider } from "./components/LanguageContext";

function AppWrapper() {
  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
}

export default AppWrapper;