import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<div>Login</div>} />
        <Route path="/register" element={<div>Register</div>} />
      </Routes>
    </>
  );
};

export default App;
