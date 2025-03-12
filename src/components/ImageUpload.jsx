// src/components/ImageUpload.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/imageUpload.css";

function ImageUpload() {
  const [preview1, setPreview1] = useState("");
  const [preview2, setPreview2] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [name1, setName1] = useState("나");
  const [name2, setName2] = useState("타인");
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

  const uploadImages = async (file1, file2) => {
    const formData = new FormData();
    formData.append("image1", file1);
    if (file2) {
        formData.append("image2", file2); // 두 번째 파일이 있을 경우 추가
    }

    try {
        const response = await fetch("http://127.0.0.1:8000/analyze/", {
            method: "POST",
            body: formData, // FormData를 직접 전송
        });

        const result = await response.json();
        console.log("서버 응답:", result);
    } catch (error) {
        console.error("파일 업로드 중 오류 발생:", error);
    }
};


  const handleSubmit = (e) => {
    e.preventDefault();

    // 두 이미지가 모두 업로드되었는지 확인
    if (!image1 || !image2) {
      alert("두 개의 이미지를 모두 업로드해주세요!");
      return;
    }

    uploadImages(image1, image2);

    // 결과 페이지로 이동하면서 이미지와 이름 데이터를 전달
    navigate("/result", {
      state: {
        image1: preview1,
        image2: preview2,
        name1: name1,
        name2: name2,
      },
    });
  };

  

  return (
    <div className="upload-container">
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
        </div>

        <button type="submit" className="submit-button">
          궁합보기!
        </button>
        <p className="notice-text">
          *걱정마세요! 사진은 절대로 저장되지 않습니다.
        </p>
      </form>
    </div>
  );
}

export default ImageUpload;
