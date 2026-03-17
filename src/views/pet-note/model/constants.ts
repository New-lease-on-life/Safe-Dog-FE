import { BasicCareType, DiseaseCareType } from "./type";

export const BASIC_CARE_ITEMS: { key: BasicCareType; label: string }[] = [
  { key: "meal", label: "식사" },
  { key: "snack", label: "간식" },
  { key: "supplement", label: "영양제" },
  { key: "water", label: "급수" },
  { key: "excretion", label: "배변" },
  { key: "walk", label: "산책" },
  { key: "weight", label: "체중" },
  { key: "grooming", label: "미용" },
  { key: "medicine", label: "복약" },
  { key: "vaccination", label: "예방/접종" },
  { key: "etc", label: "기타" },
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
