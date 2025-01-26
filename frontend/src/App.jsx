import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from './pages/Login'
import Register from "./pages/Register";
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <div className="bg-blue-950 min-h-screen min-w-screen">
      <UserProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </UserProvider>
     
    </div>
  );
};

export default App;
