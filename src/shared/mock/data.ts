import {
  Guardian,
  Pet,
  CareLog,
  User,
  Invitation,
  InvitationGroup,
  Memo,
} from "../types";

export const MOCK_USER: User = {
  id: 1,
  email: "test@gmail.com",
  nickname: "집사",
  name: "정유하",
  birthDate: "1990-01-01",
  providerType: "GOOGLE",
  profileImageUrl: "",
  role: "USER",
  lastSelectedPetId: 1,
  onboardingCompleted: true,
};

export const MOCK_PETS: Pet[] = [
  {
    id: 1,
    userId: 1,
    name: "돌돌이",
    species: "개",
    breed: "웰시코기",
    birthDate: "2021-03-15",
    gender: "MALE",
    weight: 7.5,
    registrationNumber: "410281234567890",
    hasAllergy: true,
    allergyDescription: "닭고기 알레르기",
    profileImageUrl: "",
    diseases: ["HEART_DISEASE"],
    createdAt: "2021-04-01T09:00:00.000Z",
    updatedAt: new Date().toISOString(),
    birthDateUnknown: false,
    neutered: true,
    weightUnknown: false,
  },
  // {
  //   id: 2,
  //   userId: 1,
  //   name: "콩이",
  //   species: "고양이",
  //   breed: "러시안블루",
  //   birthDate: "2020-07-20",
  //   gender: "FEMALE",
  //   weight: 3.8,
  //   registrationNumber: "410289876543210",
  //   hasAllergy: false,
  //   allergyDescription: "",
  //   profileImageUrl: "",
  //   diseases: [],
  //   createdAt: "2020-08-01T09:00:00.000Z",
  //   updatedAt: new Date().toISOString(),
  //   birthDateUnknown: false,
  //   neutered: true,
  //   weightUnknown: false,
  // },
];

// 시연용: 하드코딩 더미 제거 — careStore에 저장한 것만 표시
export const getMockCareLogs = (petId: number, date: string): CareLog[] => [];

export const MOCK_GUARDIANS: Guardian[] = [
  {
    id: 1,
    userId: 1,
    nickname: "정유하",
    profileImageUrl: "/mock/profile.svg",
  },
  {
    id: 2,
    userId: 2,
    nickname: "박진수",
    profileImageUrl: "/mock/profile (2).svg",
  },
  {
    id: 3,
    userId: 3,
    nickname: "박호준",
    profileImageUrl: "/mock/profile (3).svg",
  },
  {
    id: 4,
    userId: 4,
    nickname: "이경욱",
    profileImageUrl: "/mock/profile (4).svg",
  },
];

export const MOCK_INVITATIONS: Invitation[] = [
  {
    code: "ZchjTy",
    inviterNickname: "유하",
    inviterProfileImageUrl: "",
    inviterRole: "관리자",
    petName: "돌돌이",
  },
];

export const MOCK_INVITATION_GROUPS: InvitationGroup[] = [
  {
    code: "ZchjTy",
    pet: {
      name: "흰둥이",
      breed: "웰시코기",
      age: "4살",
      gender: "MALE",
      profileImageUrl: "",
    },
    guardians: [
      { id: 1, nickname: "정유하", profileImageUrl: "" },
      { id: 2, nickname: "박진수", profileImageUrl: "" },
      { id: 3, nickname: "박호준", profileImageUrl: "" },
      { id: 4, nickname: "이경욱", profileImageUrl: "" },
    ],
  },
];

export const MOCK_CARE_REPORT_WEEKLY = [
  {
    type: "disease" as const,
    items: [
      { careType: "heart", label: "심장병", completed: 6, total: 9 },
      { careType: "diabetes", label: "당뇨병", completed: 5, total: 9 },
    ],
  },
  {
    type: "basic" as const,
    items: [
      { careType: "meal", label: "식사", completed: 7, total: 9 },
      { careType: "walk", label: "산책", completed: 2, total: 9 },
      { careType: "grooming", label: "그루밍", completed: 6, total: 9 },
      { careType: "supplement", label: "영양제", completed: 3, total: 9 },
      { careType: "medicine", label: "투약", completed: 4, total: 9 },
    ],
  },
];

export const MOCK_CARE_REPORT_MONTHLY = [
  {
    type: "disease" as const,
    items: [
      { careType: "heart", label: "심장병", completed: 22, total: 30 },
      { careType: "diabetes", label: "당뇨병", completed: 18, total: 30 },
    ],
  },
  {
    type: "basic" as const,
    items: [
      { careType: "meal", label: "식사", completed: 28, total: 30 },
      { careType: "walk", label: "산책", completed: 10, total: 30 },
      { careType: "grooming", label: "그루밍", completed: 20, total: 30 },
      { careType: "supplement", label: "영양제", completed: 15, total: 30 },
      { careType: "medicine", label: "투약", completed: 17, total: 30 },
    ],
  },
];

export const getMockMemo = (petId: number, date: string): Memo | null => ({
  id: 1,
  petId,
  targetDate: date,
  content:
    "심장병이 있으니 심장 마사지를 꼭 해주시고, 산책시 무리하지 않도록 주의해주세요.",
  authorNickname: "지은",
  authorRole: "관리자",
  authorProfileImageUrl: "",
});
