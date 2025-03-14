import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ BrowserRouter 사용
import Layout from "./layout/layout";
import ImageUpload from "./components/ImageUpload";
import ResultPage from "./components/ResultPage";
import FacePage from "./components/FacePage";
import "./App.css";
import "./styles/styles.css";

function App() {
  return (
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <div className="container">
                <ImageUpload />
              </div>
            }
          />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/face/:id" element={<FacePage />} />
        </Route>
      </Routes>
  );
}

export default App;
