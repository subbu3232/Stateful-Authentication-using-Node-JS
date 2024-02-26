import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import Home from './Home';
import Login from './Login';

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Home />} />
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
