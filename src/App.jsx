import { useState } from "react";
import { Routes, Route, Navigate } from "react-router";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter } from "react-router-dom";
import Exel from "./pages/exel";
import Spreadsheet from "./components/Spreadsheet";

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Spreadsheet  />}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
