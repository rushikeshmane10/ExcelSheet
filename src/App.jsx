import { useState } from "react";
import { Routes, Route, Navigate } from "react-router";

import { BrowserRouter } from "react-router-dom";
import Excel from "./pages/Excel";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Excel />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
