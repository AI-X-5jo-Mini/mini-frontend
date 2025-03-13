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
              <img
                src="/FACTE.png"
                alt="logo"
                className="logo"
                width={270}
                height={200}
              />
              <br />
              <br />
              <div className="message-frame">
                ✨ Face Fate ✨ 얼굴에도 운명의 힌트가 있다?! 🔮😝
                <br />
                친구, 가족, 연인과의 관상 궁합을 가볍게 즐겨보세요! 사진 두 장만
                올리면, 재미있는 해석과 함께 궁합 결과를 알려드립니다! 💝 <br />
                운명은 정해진 게 아니니까, 유쾌하게 확인해볼까요? 😜 ✨
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
