import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from './pages/Login'
import Register from "./pages/Register";
import { UserProvider } from "./context/UserContext";
import UserAuth from "./auth/UserAuth";
import Project from "./pages/Project";

const App = () => {
  return (
    <div className="bg-[#504B38] text-[#504B38] min-h-screen min-w-screen">
      <UserProvider>
      <Routes>
        <Route path="/" element={<UserAuth><Home /></UserAuth>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/project" element={<Project />} />
      </Routes>
      </UserProvider>
     
    </div>
  );
};

export default App;
