// src/components/FacePage.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function FacePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { image, name, resultState } = location.state || {};

  // 이미지가 없으면 결과 페이지로 리다이렉트
  useEffect(() => {
    if (!image) {
      navigate("/result");
    }
  }, [image, navigate]);

  // 관상 유형 랜덤 생성 (실제로는 분석 결과에 따라 달라질 수 있음)
  const getFaceType = () => {
    const types = ["용의 상", "호랑이 상", "사자 상", "범 상", "고양이 상"];
    return types[Math.floor(Math.random() * types.length)];
  };

  // 관상 점수 생성 (실제로는 분석 결과에 따라 달라질 수 있음)
  const generateFaceScores = (mainType) => {
    const types = ["용상", "호랑이상", "사자상", "범상", "고양이상"];
    const scores = {};

    // 메인 타입에 높은 점수 할당
    const mainTypeIndex = types.findIndex((type) =>
      type.includes(mainType.split(" ")[0])
    );

    types.forEach((type, index) => {
      if (index === mainTypeIndex) {
        scores[type] = Math.floor(Math.random() * 20) + 80; // 80-99%
      } else {
        scores[type] = Math.floor(Math.random() * 20); // 0-19%
      }
    });

    // 합계가 100%가 되도록 조정
    const sum = Object.values(scores).reduce((a, b) => a + b, 0);
    const factor = 100 / sum;

    Object.keys(scores).forEach((key) => {
      scores[key] = Math.round(scores[key] * factor);
    });

    return scores;
  };

  // 관상 설명 생성 (실제로는 분석 결과에 따라 달라질 수 있음)
  const getFaceDescription = (faceType) => {
    const descriptions = {
      "용의 상":
        "이 얼굴은 용의 상으로 평가되었습니다. 용의 상은 강력한 리더십과 카리스마를 나타내며, 주변 사람들에게 깊은 인상을 남깁니다. 이러한 얼굴을 가진 사람은 대개 결단력이 있으며, 목표를 향해 끊임없이 나아가는 성향을 가지고 있습니다. 또한, 용의 상은 지혜와 용기를 상징하며, 어려운 상황에서도 침착함을 유지할 수 있는 능력을 나타냅니다. 이러한 특성은 사회적, 직업적 성공을 이끄는 데 큰 도움이 됩니다.",
      "호랑이 상":
        "이 얼굴은 호랑이 상으로 평가되었습니다. 호랑이 상은 강인함과 용맹함을 나타내며, 도전적인 상황에서 두각을 나타냅니다. 이러한 얼굴을 가진 사람은 대개 자신감이 넘치고, 목표를 향해 과감하게 나아가는 성향을 가지고 있습니다. 또한, 호랑이 상은 독립성과 결단력을 상징하며, 자신의 신념에 따라 행동하는 경향이 있습니다.",
      "사자 상":
        "이 얼굴은 사자 상으로 평가되었습니다. 사자 상은 당당함과 위엄을 나타내며, 자연스러운 리더십을 발휘합니다. 이러한 얼굴을 가진 사람은 대개 책임감이 강하고, 주변 사람들을 이끄는 능력이 뛰어납니다. 또한, 사자 상은 용기와 결단력을 상징하며, 어려운 상황에서도 앞장서서 문제를 해결하는 경향이 있습니다.",
      "범 상":
        "이 얼굴은 범 상으로 평가되었습니다. 범 상은 민첩함과 지혜로움을 나타내며, 상황을 빠르게 파악하고 대응하는 능력이 뛰어납니다. 이러한 얼굴을 가진 사람은 대개 직관력이 뛰어나고, 복잡한 문제를 해결하는 데 탁월한 능력을 보입니다. 또한, 범 상은 신중함과 침착함을 상징하며, 위기 상황에서도 냉정함을 유지하는 경향이 있습니다.",
      "고양이 상":
        "이 얼굴은 고양이 상으로 평가되었습니다. 고양이 상은 섬세함과 우아함을 나타내며, 예술적 감각이 뛰어납니다. 이러한 얼굴을 가진 사람은 대개 감수성이 풍부하고, 주변 환경의 변화를 민감하게 감지합니다. 또한, 고양이 상은 독립성과 자유로움을 상징하며, 자신만의 방식으로 삶을 살아가는 경향이 있습니다.",
    };
    return descriptions[faceType] || "관상 정보를 불러올 수 없습니다.";
  };

  const faceType = getFaceType();
  const faceScores = generateFaceScores(faceType);
  const faceDescription = getFaceDescription(faceType);

  return (
    <div className="container">
      <h1>관상 정보</h1>
      <div className="image-container">
        <img src={image} alt={name} />
        <p>{name}</p>
      </div>
      <div className="evaluation">
        <h2>평가 : {faceType}</h2>
        {Object.entries(faceScores).map(([type, score]) => (
          <p key={type}>
            {type} : {score}%
          </p>
        ))}
      </div>
      <div className="evaluation">
        <p>{faceDescription}</p>
      </div>
      <button
        className="back-button"
        onClick={() =>
          navigate("/result", {
            state: resultState,
          })
        }
      >
        결과 페이지로 돌아가기
      </button>
    </div>
  );
}

export default FacePage;
