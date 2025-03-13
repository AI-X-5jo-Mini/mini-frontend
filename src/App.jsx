// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ImageUpload from "./components/ImageUpload";
import ResultPage from "./components/ResultPage";
import FacePage from "./components/FacePage";
import "./App.css";
import "./styles/styles.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <h1>관상-궁합 서비스 목업</h1>
              <div className="message-frame">
                세계의 유명한 셀럽들과 당신의 친구! 가족! 사랑하는 사람들과의
                궁합을 알아봅시다! 지금 사진 한 장으로 시작해보세요 🤣
              </div>
              <ImageUpload />
            </div>
          }
        />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/face/:id" element={<FacePage />} />
      </Routes>
    </Router>
  );
}

export default App;
