import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../styles/layout.css";

const Layout = () => {
  const [mode, setMode] = useState("single"); // "single" or "double"
  const navigate = useNavigate();

  const handleModeChange = (newMode) => {
    setMode(newMode);
    // 모드 변경 시 메인 페이지로 이동
    navigate("/");
  };

  return (
    <div className="layout-container">
      <nav className="navigation-bar">
        <div className="toggle-container">
          <button
            className={`toggle-button ${mode === "single" ? "active" : ""}`}
            onClick={() => handleModeChange("single")}
          >
            나의 관상
          </button>
          <button
            className={`toggle-button ${mode === "double" ? "active" : ""}`}
            onClick={() => handleModeChange("double")}
          >
            궁합 보기
          </button>
        </div>
      </nav>
      <main className="main-content">
        <Outlet context={{ mode }} />
      </main>
    </div>
  );
};

export default Layout;
