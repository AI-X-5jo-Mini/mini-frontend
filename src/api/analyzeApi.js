export const analyzeApi = async (image1, image2) => {
  const formData = new FormData();
  formData.append("image1", image1);
  formData.append("image2", image2);

  const response = await fetch("http://localhost:8000/analyze/", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
};
