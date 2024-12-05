import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import Home from "./pages/Home";
import Employee from "./pages/Employee";
import Equipment from "./pages/Equipment";
import Member from "./pages/Member";

function App() {
  return (
    <div className="flex">
      <SideBar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/member" element={<Member />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
