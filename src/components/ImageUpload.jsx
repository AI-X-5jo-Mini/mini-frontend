// src/components/ImageUpload.jsx
import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import "../styles/imageUpload.css";
import { analyzeApi } from "../api/analyzeApi";
import CircularProgress from "@mui/material/CircularProgress";

function ImageUpload() {
  const { mode } = useOutletContext();
  const [preview1, setPreview1] = useState("");
  const [preview2, setPreview2] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [name1, setName1] = useState("나");
  const [name2, setName2] = useState(mode === "single" ? "AI" : "짝꿍");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e, setPreview, setImage) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "single") {
      // 1인 모드에서는 이미지 1개만 확인
      if (!image1) {
        alert("이미지를 업로드해주세요!");
        return;
      }
    } else {
      // 2인 모드에서는 이미지 2개 모두 확인
      if (!image1 || !image2) {
        alert("두 개의 이미지를 모두 업로드해주세요!");
        return;
      }
    }

    try {
      setLoading(true);
      
      // FormData 생성
      const formData = new FormData();
      formData.append("image1", image1);
      formData.append("name1", name1);
      
      if (mode === "double") {
        formData.append("image2", image2);
        formData.append("name2", name2);
      }
      
      formData.append("mode", mode);

      let result;
      if (mode === "single") {
        // 1인 모드일 때는 AI 이미지를 사용
        result = await analyzeApi(formData);
      } else {
        // 2인 모드일 때는 두 이미지 모두 사용
        result = await analyzeApi(formData);
      }
      console.log("서버 응답:", result);

      // 결과 페이지로 이동하면서 데이터 전달
      navigate("/result", {
        state: {
          mode: mode,
          image1: preview1,
          image2: mode === "single" ? null : preview2,
          name1: name1,
          name2: name2,
          analysisResult: result,
        },
      });
    } catch (error) {
      console.error("파일 업로드 중 오류 발생:", error);
      alert("이미지 분석 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
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
        {mode === "single" 
          ? "AI와 나의 궁합을 알아봅시다! 당신의 사진 한 장으로 시작해보세요 🤖"
          : "친구! 가족! 사랑하는 사람들과의 궁합을 알아봅시다! 사진 두 장으로 시작해보세요 🤣"}
      </div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="upload-area">
          <div className="upload-item">
            <label className="upload-box">
              {preview1 ? (
                <img
                  src={preview1}
                  alt="미리보기 1"
                  className="preview-image"
                />
              ) : (
                <div className="upload-placeholder">
                  <i className="upload-icon">📷</i>
                  <p>여기에 당신의 사진을 넣어주세요</p>
                </div>
              )}
              <input
                type="file"
                onChange={(e) => handleImageChange(e, setPreview1, setImage1)}
                className="file-input"
              />
            </label>
            <input
              type="text"
              className="name-input"
              name="name1"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              placeholder="이름 입력"
            />
          </div>

          {mode === "double" && (
            <div className="upload-item">
              <label className="upload-box">
                {preview2 ? (
                  <img
                    src={preview2}
                    alt="미리보기 2"
                    className="preview-image"
                  />
                ) : (
                  <div className="upload-placeholder">
                    <i className="upload-icon">📷</i>
                    <p>상대방 사진을 넣어주세요</p>
                  </div>
                )}
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, setPreview2, setImage2)}
                  className="file-input"
                />
              </label>
              <input
                type="text"
                className="name-input"
                name="name2"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                placeholder="이름 입력"
              />
            </div>
          )}
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "분석 중..." : "궁합보기!"}
        </button>
        <p className="notice-text">
          *걱정마세요! 사진은 절대로 저장되지 않습니다.
        </p>
      </form>
      {loading && (
        <div className="loading-overlay">
          <CircularProgress size={60} />
          <p>이미지 분석 중입니다...</p>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
