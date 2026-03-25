import { BasicCareType, DiseaseCareType } from "./type";

export const BASIC_CARE_ITEMS: {
  key: BasicCareType;
  label: string;
  emoji: string;
}[] = [
  { key: "meal", label: "식사", emoji: "🍚" },
  { key: "snack", label: "간식", emoji: "🦴" },
  { key: "supplement", label: "영양제", emoji: "💊" },
  { key: "water", label: "급수", emoji: "💧" },
  { key: "pad", label: "배변", emoji: "🧻" },
  { key: "walk", label: "산책", emoji: "🐾" },
  { key: "weight", label: "체중", emoji: "⚖️" },
  { key: "grooming", label: "미용", emoji: "✂️" },
  { key: "medicine", label: "복약", emoji: "💉" },
  { key: "vaccination", label: "예방/접종", emoji: "🩺" },
  { key: "etc", label: "기타", emoji: "📋" },
];

export const DISEASE_CARE_ITEMS: { key: DiseaseCareType; label: string }[] = [
  { key: "heart", label: "심장병" },
  { key: "kidney", label: "신장질환" },
  { key: "cancer", label: "암" },
  { key: "eye", label: "안과질환" },
  { key: "cushing", label: "쿠싱" },
  { key: "arthritis", label: "관절염" },
  { key: "other", label: "기타 질병" },
];
