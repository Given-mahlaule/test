import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap


const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "50vh",
        padding: "20px",
        
      }}
    >
      {/* Heading */}
      <h1 className="text-center mb-4">Welcome to the Main Page</h1>

      {/* Button at the Top */}
      <button
        onClick={() => navigate("/upload")}
        className="btn btn-primary"
        style={{ width: "200px" }}
      >
        Go to Form
      </button>

      {/* Button at the Bottom */}
      <button
        onClick={() => navigate("/data-summary")}
        className="btn btn-primary"
        style={{ width: "200px" }}
      >
        View Data Summary
      </button>
    </div>
  );
};

export default MainPage;
