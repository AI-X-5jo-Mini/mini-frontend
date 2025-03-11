import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { image1, image2, name1, name2 } = location.state || {};

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

      // 캔버스 요소가 존재하는지 확인
      if (!canvas) return;

      const ctx = canvas.getContext("2d");

      // 랜덤 데이터 생성 (실제로는 분석 결과에 따라 데이터가 달라질 수 있음)
      const data1 = Array.from({ length: 5 }, () =>
        Math.floor(Math.random() * 5)
      );
      const data2 = Array.from({ length: 5 }, () =>
        Math.floor(Math.random() * 5)
      );

      // 이전 차트 인스턴스 제거
      if (window.myChartInstance) {
        window.myChartInstance.destroy();
      }

      // 새 차트 인스턴스 생성 및 저장
      window.myChartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["외모", "성격", "취향", "가치관", "미래"],
          datasets: [
            {
              label: name1,
              data: data1,
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              fill: false,
            },
            {
              label: name2,
              data: data2,
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 5,
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });

      // 컴포넌트 언마운트 시 차트 정리
      return () => {
        if (window.myChartInstance) {
          window.myChartInstance.destroy();
        }
      };
    }
  }, [image1, image2, name1, name2]);

  // 궁합 결과 생성 (실제로는 분석 결과에 따라 달라질 수 있음)
  const getCompatibilityResult = () => {
    const results = ["매우 좋음", "좋음", "보통", "나쁘지 않음", "아쉬움"];
    return results[Math.floor(Math.random() * results.length)];
  };

  // 궁합 설명 생성 (실제로는 분석 결과에 따라 달라질 수 있음)
  const getCompatibilityDescription = () => {
    const descriptions = [
      "사진을 보니 서로 궁합이 매우 좋아보입니다. 두 사람의 미소가 서로를 향하고 있으며, 눈빛에서 따뜻함이 느껴집니다. 이러한 모습은 서로에 대한 깊은 이해와 존중을 나타내며, 함께하는 시간이 즐겁고 행복할 것임을 암시합니다.",
      "두 사람의 궁합이 좋아 보입니다. 서로의 장점을 잘 살려가며, 앞으로도 좋은 관계를 유지할 수 있을 것입니다. 이러한 긍정적인 에너지가 주변 사람들에게도 좋은 영향을 미칠 것입니다.",
      "두 사람의 궁합은 보통입니다. 서로 다른 점이 있지만, 그것이 오히려 서로를 보완해줄 수 있습니다. 소통과 이해를 통해 더 좋은 관계로 발전할 수 있을 것입니다.",
      "두 사람의 궁합은 나쁘지 않습니다. 서로의 차이점을 인정하고 존중한다면, 좋은 관계를 유지할 수 있을 것입니다.",
      "두 사람의 궁합은 조금 아쉬운 부분이 있습니다. 하지만 서로의 다름을 이해하고 존중한다면, 더 나은 관계로 발전할 수 있을 것입니다.",
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  };

  const compatibilityResult = getCompatibilityResult();
  const compatibilityDescription = getCompatibilityDescription();

  // 이미지 클릭 핸들러 추가
  const handleImageClick = (image, name, id) => {
    navigate(`/face/${id}`, {
      state: {
        image,
        name,
        faceId: id,
        resultState: location.state, // 결과 페이지 상태를 저장하여 돌아올 때 사용
      },
    });
  };

  return (
    <div className="container">
      <h1>결과 페이지</h1>
      <div className="image-frame">
        <div className="image-container">
          <div>
            <img
              src={image1}
              alt={name1}
              onClick={() => handleImageClick(image1, name1, 1)}
              style={{ cursor: "pointer" }}
            />
            <p>{name1}</p>
          </div>
          <div>
            <img
              src={image2}
              alt={name2}
              onClick={() => handleImageClick(image2, name2, 2)}
              style={{ cursor: "pointer" }}
            />
            <p>{name2}</p>
          </div>
        </div>
      </div>
      <div className="result-frame">
        <h2>궁합 결과 : {compatibilityResult}</h2>
        <p>{compatibilityDescription}</p>
      </div>
      <div className="graph-description">
        <canvas id="myChart" width="400" height="200"></canvas>
      </div>
      <div className="buttons">
        <button className="retry-button" onClick={() => navigate("/")}>
          다시하기
        </button>
        <div className="share-frame">
          <a href="#" target="_blank" rel="noopener noreferrer">
            Twitter 공유
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            Instagram 공유
          </a>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
