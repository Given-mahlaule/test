import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import FileUpload from "./FileUpload";
import DataSummary from "./DataSummary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/upload" element={<FileUpload />} />
        <Route path="/data-summary" element={<DataSummary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
