import React from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import SideBar from "./components/SideBar";
import Home from "./pages/Home";
import Employee from "./pages/Employee";
import Equipment from "./pages/Equipment";
import Member from "./pages/Member";
import Login from "./pages/Login";
import PrivateRoute from "./utils/PrivateRoute";
import Room from "./pages/Room";
import Feedbacks from "./pages/FeedBack";
import TrainingPackage from "./pages/TrainingPackage";
import TypePackage from "./pages/TypePackage";

function App() {
  const isAuthenticated = true;

  const location = useLocation();
  const hideSideBarRoutes = ["/login"];
  const shouldShowSideBar = !hideSideBarRoutes.includes(location.pathname);

  return (
    <div>
      {shouldShowSideBar && <SideBar />}
      <div className="min-h-screen bg-[#ffdd7b]">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
        >
            <Route Component={Home} path="/" />
            <Route Component={Room} path="/room" />
            <Route Component={Employee} path="/employee" />
            <Route Component={Equipment} path="/equipment" />
            <Route Component={Member} path="/member" />
            <Route Component={Feedbacks} path="/feedbacks" />
            <Route Component={TrainingPackage} path="/training_package" />
            <Route Component={TypePackage} path="/type_package" />
        </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
