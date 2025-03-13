import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import "../styles/resultPage.css";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { image1, image2, name1, name2, analysisResult } = location.state || {};

  // 이미지가 없으면 홈으로 리다이렉트
  useEffect(() => {
    if (!image1 || !image2) {
      navigate("/");
    }
  }, [image1, image2, navigate]);

  // 차트 초기화
  useEffect(() => {
    if (image1 && image2) {
      const canvas = document.getElementById("myChart");
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      const data1 = Array.from({ length: 5 }, () =>
        Math.floor(Math.random() * 5)
      );
      const data2 = Array.from({ length: 5 }, () =>
        Math.floor(Math.random() * 5)
      );

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
  }, [image1, image2, name1, name2]);

  // API 응답에서 궁합 결과 가져오기
  const person1Analysis =
    analysisResult?.compatibility_result?.person1_analysis || "";
  const person2Analysis =
    analysisResult?.compatibility_result?.person2_analysis || "";
  const compatibilityAnalysis =
    analysisResult?.compatibility_result?.compatibility_analysis || "";

  return (
    <div className="simple-result-container">
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
                ? compatibilityAnalysis
                    .split("총점으로는")[1]
                    .split("점")[0]
                    .trim() + "점"
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
