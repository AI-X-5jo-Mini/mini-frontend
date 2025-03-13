export const analyzeApi = async (formData) => {
  try {
    const response = await fetch("http://localhost:8000/analyze/", {
      method: "POST",
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    console.log("API 응답 데이터:", data);

    // FormData 형식으로 변환
    const resultFormData = new FormData();
    
    if (Array.isArray(data)) {
      // 배열 형태로 오는 경우
      data.forEach((item, index) => {
        resultFormData.append(`analysis_${index + 1}`, item.analysis);
      });
    } else if (typeof data === 'object' && data !== null) {
      if (data.analysis) {
        // 단일 분석 결과
        resultFormData.append("analysis_1", data.analysis);
      } else if (data.compatibility_result) {
        // 궁합 분석 결과
        resultFormData.append("analysis_1", data.compatibility_result.person1_analysis);
        resultFormData.append("analysis_2", data.compatibility_result.person2_analysis);
        resultFormData.append("analysis_3", data.compatibility_result.compatibility_analysis);
      }
    }

    // FormData를 객체로 변환하여 반환
    const result = {};
    for (let [key, value] of resultFormData.entries()) {
      result[key] = value;
    }
    
    return result;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    throw error;
  }
};