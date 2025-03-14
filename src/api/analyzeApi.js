export const analyzeApi = async (image1, image2 = null) => {
  const formData = new FormData();
  formData.append("image1", image1);

  // image2가 있는 경우에만 추가
  if (image2) {
    formData.append("image2", image2);
  }

  // 모드 정보 추가 (image2가 있으면 dual, 없으면 single)
  formData.append("mode", image2 ? "dual" : "single");

  const response = await fetch("http://localhost:8000/analyze/", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
};
