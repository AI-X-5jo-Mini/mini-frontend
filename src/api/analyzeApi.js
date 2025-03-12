export const analyzeApi = async (image1, image2) => {
  const response = await fetch("http://localhost:8000/analyze", {
    method: "POST",
    body: JSON.stringify({ image1, image2 }),
  });
  const data = await response.json();
  return data;
};
