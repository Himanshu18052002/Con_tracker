import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../Screens/Home/Index";
import Issue from "../Screens/Issue/Index";
import Login from "../Screens/Auth/Login/Index";
import Register from "../Screens/Auth/Register/Index";
import Drawing from "../Screens/Drawing/Index";
import DrawingDetails from "../Screens/Drawing/DrawingDetail/Index";
import Inventory from "../Screens/Inventory/Index";
import MaterialScreen from "../Screens/Material_Screen/Index";
import Tasks from "../Screens/Tasks/Index";
import Progress from "../Screens/Progress_approval/Index";
import Addprogress from "../Screens/Progress_approval/Add_progress_approval/Index";
import Attendance from "../Screens/Attendance/Index";
import Header from "../Components/Header/Index";

function Index() {
  const [isNavbarOpened, setIsNavbarOpened] = useState(false);
  const location = useLocation();

  const toggleNavbar = () => {
    setIsNavbarOpened(!isNavbarOpened);
  };

  const showNavbar =
    location.pathname !== "/" && location.pathname !== "/register";

  return (
    <>
      {showNavbar && <Header toggleNavbar={toggleNavbar} />}
      <div className={`main-content ${isNavbarOpened ? "shifted" : ""}`}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/drawing" element={<Drawing />} />
          <Route path="/drawing_details" element={<DrawingDetails />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/materialScreen" element={<MaterialScreen />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/add_progress" element={<Addprogress />} />
          <Route path="/issue" element={<Issue />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </div>
    </>
  );
}

export default Index;
