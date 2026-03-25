// ─── 시연용 전역 케어 로그 스토어 ─────────────────────────────────────────────
// 서버 액션 없이 모듈 레벨 변수로 두 페이지 간 상태를 공유합니다.
// 실제 서비스에서는 이 파일을 삭제하고 서버 데이터로 교체하세요.

export type DemoCareLog = {
  id: number;
  careType: string;
  title: string;
  content: string;
  completed: boolean;
  completedAt?: string;
  completedByNickname?: string;
  completedByProfileImageUrl?: string;
};

export type DateLogs = {
  basic: DemoCareLog[];
  disease: DemoCareLog[];
};

const store: Record<string, DateLogs> = {};

let _nextId = 200;

export function getDateLogs(date: string): DateLogs {
  return store[date] ?? { basic: [], disease: [] };
}

export function addCareLog(
  date: string,
  kind: "basic" | "disease",
  log: Omit<DemoCareLog, "id" | "completed">,
): DemoCareLog {
  const existing = store[date] ?? { basic: [], disease: [] };
  const newLog: DemoCareLog = { ...log, id: _nextId++, completed: false };
  store[date] = { ...existing, [kind]: [...existing[kind], newLog] };
  return newLog;
}

export function applyTemplates(
  date: string,
  basicTypes: string[], // BasicCareType[]
  diseaseTypes: string[], // DiseaseCareType[]
) {
  const BASIC_LABELS: Record<string, { title: string; content: string }> = {
    meal: { title: "식사", content: "" },
    snack: { title: "간식", content: "" },
    supplement: { title: "영양제", content: "" },
    medicine: { title: "투약", content: "" },
    pad: { title: "패드 교체", content: "" },
    water: { title: "음수", content: "" },
    walk: { title: "산책", content: "" },
    weight: { title: "체중 측정", content: "" },
  };
  const DISEASE_LABELS: Record<string, { title: string; content: string }> = {
    heart: { title: "심장 케어", content: "청진 및 이상 여부 확인" },
    kidney: { title: "신장 케어", content: "음수량 및 배뇨 확인" },
    cancer: { title: "암 케어", content: "종양 상태 확인" },
    eye: { title: "안과 케어", content: "분비물 및 충혈 확인" },
    cushing: { title: "쿠싱 케어", content: "음수·배뇨·피부 확인" },
    arthritis: { title: "관절 케어", content: "보행 상태 확인" },
    other: { title: "기타 케어", content: "" },
  };

  const existing = store[date] ?? { basic: [], disease: [] };

  const newBasic = basicTypes
    .filter((t) => !existing.basic.some((l) => l.careType === t))
    .map((t) => ({
      id: _nextId++,
      careType: t,
      ...(BASIC_LABELS[t] ?? { title: t, content: "" }),
      completed: false,
    }));

  const newDisease = diseaseTypes
    .filter((t) => !existing.disease.some((l) => l.careType === t))
    .map((t) => ({
      id: _nextId++,
      careType: t,
      ...(DISEASE_LABELS[t] ?? { title: t, content: "" }),
      completed: false,
    }));

  store[date] = {
    basic: [...existing.basic, ...newBasic],
    disease: [...existing.disease, ...newDisease],
  };
}
