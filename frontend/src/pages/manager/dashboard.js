import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Redirect for unauthorized users
import ManagerLayout from "../../layouts/ManagerLayout"; // Assuming you have a ClientLayout
import axios from "../../api/axiosConfig"; // The axios instance for API requests
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManagerDashboard = () => {


  return (
    <ManagerLayout>
      {/* Dashboard Heading */}
      <h1 className="text-4xl font-extrabold text-center mb-6 
                 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600
                 drop-shadow-lg shadow-blue-500/50 
                 transform transition duration-300 hover:scale-105">
        ManagerLayout
      </h1>

    </ManagerLayout>
  );
};

export default ManagerDashboard;
