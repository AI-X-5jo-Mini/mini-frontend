// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import ImageUpload from "./components/ImageUpload";
import ResultPage from "./components/ResultPage";
import FacePage from "./components/FacePage";
import "./App.css";
import "./styles/styles.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={<ImageUpload />}
        />
        <Route path="result" element={<ResultPage />} />
        <Route path="face/:id" element={<FacePage />} />
      </Route>
    </Routes>
  );
}

export default App;
