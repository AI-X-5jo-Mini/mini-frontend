import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import "../styles/resultPage.css";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { image1, image2, name1, name2, analysisResult, error } =
    location.state || {};

  // 오류 처리 및 이미지가 없으면 홈으로 리다이렉트
  useEffect(() => {
    if (error) {
      alert(`오류가 발생했습니다: ${error}`);
      navigate("/");
      return;
    }

    if (!image1 || !image2) {
      alert("이미지가 없습니다. 다시 시도해주세요.");
      navigate("/");
    }

    if (!analysisResult || !analysisResult.compatibility_result) {
      alert("분석 결과가 없습니다. 다시 시도해주세요.");
      navigate("/");
    }
  }, [image1, image2, navigate, error, analysisResult]);

  // 차트 초기화
  useEffect(() => {
    if (image1 && image2) {
      const canvas = document.getElementById("myChart");
      if (!canvas) return;

      const ctx = canvas.getContext("2d");

      // 분석 결과에서 점수 추출
      const extractScore = (scoreText) => {
        console.log("scoreText:", scoreText);
        if (!scoreText) return [0, 0];
        const scores = scoreText.split(":")[1].trim().split(",");
        return [
          parseInt(scores[0].trim().replace("점", "")),
          parseInt(scores[1].trim().replace("점", "")),
        ];
      };

      const [외모1, 외모2] = extractScore(
        analysisResult?.compatibility_result?.score1
      );
      const [성격1, 성격2] = extractScore(
        analysisResult?.compatibility_result?.score2
      );
      const [취향1, 취향2] = extractScore(
        analysisResult?.compatibility_result?.score3
      );
      const [가치관1, 가치관2] = extractScore(
        analysisResult?.compatibility_result?.score4
      );
      const [미래1, 미래2] = extractScore(
        analysisResult?.compatibility_result?.score5
      );

      const data1 = [외모1, 성격1, 취향1, 가치관1, 미래1];
      const data2 = [외모2, 성격2, 취향2, 가치관2, 미래2];

      console.log("data1:", data1);
      console.log("data2:", data2);

      if (window.myChartInstance) {
        window.myChartInstance.destroy();
      }

      window.myChartInstance = new Chart(ctx, {
        type: "radar",
        data: {
          labels: ["외모", "성격", "취향", "가치관", "미래"],
          datasets: [
            {
              label: name1,
              data: data1,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
            },
            {
              label: name2,
              data: data2,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 2,
            },
          ],
        },
        options: {
          scales: {
            r: {
              beginAtZero: true,
              max: 5,
            },
          },
        },
      });

      return () => {
        if (window.myChartInstance) {
          window.myChartInstance.destroy();
        }
      };
    }
  }, [image1, image2, name1, name2, analysisResult]);

  // API 응답에서 궁합 결과 가져오기
  const person1Analysis = analysisResult?.compatibility_result?.person1_analysis
    ? analysisResult.compatibility_result.person1_analysis
        .replace(/첫 번째 사람의 관상:[ \t\n]*/i, "")
        .replace(/첫 번째 사람 분석 내용:[ \t\n]*/i, "")
        .trim()
    : "";
  const person2Analysis = analysisResult?.compatibility_result?.person2_analysis
    ? analysisResult.compatibility_result.person2_analysis
        .replace(/두 번째 사람의 관상:[ \t\n]*/i, "")
        .replace(/두 번째 사람 분석 내용:[ \t\n]*/i, "")
        .trim()
    : "";
  const compatibilityAnalysis = analysisResult?.compatibility_result
    ?.compatibility_analysis
    ? analysisResult.compatibility_result.compatibility_analysis
        .replace(/두 사람의 궁합 분석 내용:[ \t\n]*/i, "")
        .replace(/두 사람의 궁합 분석:[ \t\n]*/i, "")
        .trim()
    : "";

  // 디버깅을 위한 콘솔 로그 추가
  console.log("원본 데이터:", analysisResult?.compatibility_result);
  console.log("처리된 데이터:", {
    person1Analysis,
    person2Analysis,
    compatibilityAnalysis,
  });

  return (
    <div className="container simple-result-container">
      <h1>궁합 결과</h1>

      <div className="result-scroll-container">
        <div className="simple-images">
          <div className="simple-person">
            <img src={image1} alt={name1} />
            <p>{name1}</p>
          </div>

          <div className="simple-result">
            <h2>
              {compatibilityAnalysis.includes("총점")
                ? (() => {
                    const score = parseInt(
                      compatibilityAnalysis
                        .split("총점은")[1]
                        .split("점")[0]
                        .trim()
                    );

                    let evaluation;
                    switch (true) {
                      case score >= 90:
                        evaluation = "매우 좋음";
                        break;
                      case score >= 80:
                        evaluation = "좋음";
                        break;
                      case score >= 70:
                        evaluation = "중간";
                        break;
                      case score >= 60:
                        evaluation = "나쁨";
                        break;
                      default:
                        evaluation = "아주 나쁨";
                    }

                    return score + "점 (" + evaluation + ")";
                  })()
                : "매우 좋음"}
            </h2>
          </div>

          <div className="simple-person">
            <img src={image2} alt={name2} />
            <p>{name2}</p>
          </div>
        </div>

        <div className="simple-chart">
          <canvas id="myChart"></canvas>
        </div>

        <div className="analysis-container">
          <div className="analysis-card">
            <h3>{name1} 분석</h3>
            <p>{person1Analysis}</p>
          </div>

          <div className="analysis-card">
            <h3>{name2} 분석</h3>
            <p>{person2Analysis}</p>
          </div>

          <div className="analysis-card compatibility">
            <h3>궁합 분석</h3>
            <p>{compatibilityAnalysis}</p>
          </div>
        </div>
      </div>

      <button className="restart-button" onClick={() => navigate("/")}>
        다시하기
      </button>
    </div>
  );
}

export default ResultPage;
