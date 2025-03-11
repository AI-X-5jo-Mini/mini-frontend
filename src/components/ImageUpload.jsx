// src/components/ImageUpload.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ImageUpload() {
  const [preview1, setPreview1] = useState("");
  const [preview2, setPreview2] = useState("");
  const [name1, setName1] = useState("나");
  const [name2, setName2] = useState("누군가");
  const navigate = useNavigate();

  const handleImageChange = (e, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 두 이미지가 모두 업로드되었는지 확인
    if (!preview1 || !preview2) {
      alert("두 개의 이미지를 모두 업로드해주세요!");
      return;
    }

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
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="upload-area">
        <div>
          <label className="upload-box upload-label">
            {preview1 && <img src={preview1} alt="미리보기 1" />}
            <input
              type="file"
              onChange={(e) => handleImageChange(e, setPreview1)}
            />
            {!preview1 && <span>👋 여기에 당신의 사진을 넣어주세요 👋</span>}
          </label>
          <input
            type="text"
            className="name-input"
            name="name1"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
          />
        </div>

        <div>
          <label className="upload-box upload-label">
            {preview2 && <img src={preview2} alt="미리보기 2" />}
            <input
              type="file"
              onChange={(e) => handleImageChange(e, setPreview2)}
            />
            {!preview2 && <span>사진 2 등록</span>}
          </label>
          <input
            type="text"
            className="name-input"
            name="name2"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
          />
        </div>
      </div>
      <input type="submit" className="submit-button" value="궁합보기!" />
      <p className="small-text">
        *걱정마세요! 사진은 절대로 저장되지 않습니다.
      </p>
    </form>
  );
}

export default ImageUpload;
