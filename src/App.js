import React from "react";
import "./App.css";
import Homepage from "./Components/Homepage";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
