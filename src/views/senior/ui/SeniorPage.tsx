"use client";
import { useState } from "react";
import { CommonLayout } from "@/widgets/CommonLayout";
import { Header } from "@/widgets/Header";
import { BottomNavigation } from "@/widgets/BottomNavigation";
import { ChevronDown, ChevronUp } from "lucide-react";

type Article = {
  id: number;
  category: string;
  title: string;
  summary: string;
  content: string;
  emoji: string;
};

const ARTICLES: Article[] = [
  {
    id: 1,
    category: "심장병",
    emoji: "🫀",
    title: "심장병, 호흡 관리부터 생활 습관까지",
    summary:
      "무리하지 않는 안정적인 생활 관리가 가장 중요합니다. 일상 관리가 예후에 큰 영향을 미칩니다.",
    content: `심장병을 가진 강아지는 "무리하지 않는 안정적인 생활 관리"가 가장 중요합니다. 단순히 약을 먹는 것보다 일상 관리가 예후에 큰 영향을 미칩니다.

1) 호흡 상태 매일 체크
• 잠든 상태에서 분당 호흡수 30회 이하 유지
• 호흡이 빨라지거나, 배까지 크게 움직이면 즉시 병원 방문
→ 호흡수는 심장 상태 악화의 가장 빠른 신호입니다.

2) 운동은 "짧고 가볍게"
• 격한 산책 X
• 짧고 천천히 걷기 O
• 더위/추위 극단 환경 피하기
→ 과부하는 심장에 직접적인 부담을 줍니다.

3) 체중 관리 필수
• 과체중 = 심장 부담 증가
• 적정 체중 유지가 치료의 일부

4) 저염 식단 유지
• 나트륨 섭취 줄이기
• 처방식 사료 또는 심장 전용 사료 권장

5) 약 복용 루틴 철저 관리
• 시간 지켜서 정확히 투약
• 임의 중단 절대 금지
→ 심장약은 "꾸준함"이 생명입니다.

6) 정기 검진
• 심장 초음파 및 엑스레이 주기적 검사
• 상태에 따라 약 조절 필요`,
  },
  {
    id: 2,
    category: "신장질환",
    emoji: "🫘",
    title: "신장질환, 수분과 식단이 핵심입니다",
    summary:
      "탈수는 신장에 치명적입니다. 수분 섭취와 식단 관리로 신장 기능을 지켜주세요.",
    content: `1) 수분 섭취 최우선
• 항상 깨끗한 물 제공
• 물을 잘 안 마시면 습식 사료 활용
→ 탈수는 신장에 치명적입니다.

2) 신장 전용 식단 유지
• 저단백, 저인 식단 필수
• 간식도 신장용으로 제한

3) 소변 상태 체크
• 소변량/색 변화 관찰
• 갑작스러운 변화 시 병원 방문

4) 스트레스 최소화
• 환경 변화 최소화
• 안정적인 생활 유지

5) 정기 혈액검사
• 크레아티닌, BUN 수치 체크
→ 수치 변화로 진행 속도를 판단합니다.`,
  },
  {
    id: 3,
    category: "암",
    emoji: "🔬",
    title: "암, 삶의 질을 지키는 관리법",
    summary: "식욕 유지와 통증 관리로 삶의 질을 최대한 높여주세요.",
    content: `1) 식욕 유지가 가장 중요
• 먹는 양 줄면 바로 대응
• 기호성 높은 음식 활용

2) 체중 꾸준히 체크
• 급격한 체중 감소는 위험 신호

3) 통증 관리
• 통증 징후 (숨기기, 움직임 감소) 체크
• 필요 시 진통 관리

4) 면역력 관리
• 스트레스 최소화
• 충분한 휴식 제공

5) 치료 일정 철저 관리
• 항암/수술 일정 체크
• 부작용 발생 시 즉시 상담`,
  },
  {
    id: 4,
    category: "안과질환",
    emoji: "👁️",
    title: "안과질환, 눈 관리와 환경이 중요합니다",
    summary: "하루 1~2회 눈 청결 유지와 처방된 점안 루틴이 핵심입니다.",
    content: `1) 눈 청결 유지
• 하루 1~2회 눈물, 눈곱 제거
• 전용 클리너 사용

2) 눈 자극 최소화
• 먼지, 바람 강한 환경 피하기
• 산책 시 눈 보호

3) 약 점안 정확히
• 처방된 시간/횟수 지키기
• 임의 중단 금지

4) 행동 변화 관찰
• 부딪힘, 방향 감각 저하 체크

5) 실내 환경 고정
• 가구 위치 변경 최소화
→ 시력 저하 시 안정감 유지 중요`,
  },
  {
    id: 5,
    category: "쿠싱",
    emoji: "🧬",
    title: "쿠싱, 호르몬 관리와 생활 균형",
    summary: "정해진 시간 약 복용과 피부 관리, 위생 관리가 중요합니다.",
    content: `1) 약 복용 철저 관리
• 정해진 시간 엄수
• 혈액검사로 용량 조절

2) 물 섭취 증가 대응
• 물 충분히 제공
• 배뇨 환경 편하게 유지

3) 피부 관리
• 얇아진 피부 보호
• 상처 방지

4) 체중 및 식욕 관리
• 과식 방지
• 균형 잡힌 식단 유지

5) 감염 예방
• 면역 저하 상태 → 위생 관리 중요`,
  },
  {
    id: 6,
    category: "관절염",
    emoji: "🦴",
    title: "관절염, 통증을 줄이고 움직임을 돕는 방법",
    summary: "체중 관리와 미끄럼 방지 환경, 짧고 꾸준한 운동이 핵심입니다.",
    content: `1) 체중 관리
• 관절 부담 줄이기 위해 필수

2) 미끄럼 방지 환경
• 매트/러그 설치
• 미끄러운 바닥 제거

3) 적절한 운동
• 짧고 꾸준한 산책
• 무리한 운동 금지

4) 관절 보조
• 계단 대신 경사로 사용
• 침대/소파 접근 쉽게

5) 온열 관리
• 따뜻한 환경 유지
→ 관절 통증 완화에 도움`,
  },
];

const CATEGORIES = [
  "전체",
  "심장병",
  "신장질환",
  "암",
  "안과질환",
  "쿠싱",
  "관절염",
];

const ArticleCard = ({ article }: { article: Article }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mx-5 border border-[#E0E0E0] rounded-[12px] overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-3 p-4 text-left"
      >
        <span className="text-3xl flex-shrink-0">{article.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-medium text-[#9F7248] bg-[#FDF7F2] px-2 py-0.5 rounded-full">
              {article.category}
            </span>
          </div>
          <p className="text-[15px] font-bold text-[#1F1F1F] leading-snug">
            {article.title}
          </p>
          {!expanded && (
            <p className="text-[13px] text-[#9E9E9E] mt-1 line-clamp-2">
              {article.summary}
            </p>
          )}
        </div>
        <div className="flex-shrink-0 mt-1">
          {expanded ? (
            <ChevronUp size={18} className="text-[#9E9E9E]" />
          ) : (
            <ChevronDown size={18} className="text-[#9E9E9E]" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-[#F7F7F7]">
          <div className="pt-3 text-[14px] text-[#3D3D3D] leading-relaxed whitespace-pre-line">
            {article.content}
          </div>
        </div>
      )}
    </div>
  );
};

export const SeniorPage = () => {
  const [activeCategory, setActiveCategory] = useState("심장병");

  const filtered =
    activeCategory === "전체"
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === activeCategory);

  return (
    <CommonLayout backgroundColor="bg-white">
      <Header title="시니어 상식" />

      <div className="flex flex-col flex-1 overflow-y-auto pb-6">
        {/* Hero */}
        <div className="mx-5 mt-4 bg-[#FDF7F2] rounded-[12px] p-5 flex items-center gap-4">
          <span className="text-5xl">🐾</span>
          <div>
            <p className="text-[16px] font-bold text-[#1F1F1F]">
              시니어 반려동물 질병 케어 가이드
            </p>
            <p className="text-[13px] text-[#9E9E9E] mt-1">
              질병별 올바른 관리법을 확인해보세요
            </p>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 px-5 mt-5 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 h-9 px-4 rounded-full text-[13px] font-medium border transition-colors ${
                activeCategory === cat
                  ? "bg-[#9F7248] text-white border-[#9F7248]"
                  : "bg-white text-[#6B6B6B] border-[#E0E0E0]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles */}
        <div className="flex flex-col gap-3 mt-4">
          {filtered.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>

      <BottomNavigation />
    </CommonLayout>
  );
};
