import React from "react";
import "./App.css";
import Main from "./components/Main";
import ThemeContext from "./theme";

function App() {
  return (
    <React.StrictMode>
      {/* no longer need <ThemeContext.Provider>*/}
      <ThemeContext value={{ color: "#36f" }}>
        <Main />
      </ThemeContext>
    </React.StrictMode>
  );
}

export default App;
