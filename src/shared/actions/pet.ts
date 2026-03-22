"use server";
import { serverApi } from "./api";
import { MOCK_PETS, MOCK_USER, getMockCareLogs } from "../mock/data";
import { string } from "zod";

export type Pet = {
  id: number;
  userId: number;
  name: string;
  species: string;
  breed: string;
  birthDate: string;
  gender: "MALE" | "FEMALE";
  weight: number;
  registrationNumber: string;
  hasAllergy: boolean;
  allergyDescription: string;
  profileImageUrl: string;
  diseases: string[];
  createdAt: string;
  updatedAt: string;
  birthDateUnknown: boolean;
  neutered: boolean;
  weightUnknown: boolean;
};

export type CareLog = {
  id: number;
  petId: number;
  careTemplateId: number;
  targetDate: string;
  careType: string;
  careTypeDescription: string;
  title: string;
  content: string;
  completedByUserId: number;
  completedByNickname: string;
  completedByProfileImageUrl: string;
  version: number;
  updatedAt: string;
  completed: boolean;
  completedAt?: string;
};

export type User = {
  id: number;
  email: string;
  nickname: string;
  name: string;
  birthDate: string;
  providerType: string;
  profileImageUrl: string;
  role: string;
  lastSelectedPetId: number;
  onboardingCompleted: boolean;
};

const USE_MOCK = true;

export const getMyPets = async (): Promise<Pet[]> => {
  if (USE_MOCK) return MOCK_PETS;
  return serverApi.get<Pet[]>("/api/pets");
};
export const getMyInfo = async (): Promise<User> => {
  if (USE_MOCK) return MOCK_USER;
  return serverApi.get<User>("/api/users/me");
};
export const registerPet = async () => {
  const data = serverApi.post("/api/pets", {
    name: "돌돌이",
    species: "진돗개",
    breed: "",
    birthDate: "2023-03-01",
    gender: "MALE",
    isNeutered: true,
    weight: 7,
    registrationNumber: "2",
    hasAllergy: true,
    allergyDescription: "",
    profileImageUrl: "",
    diseases: ["HEART_DISEASE"],
    birthDateUnknown: true,
    weightUnknown: true,
  });
  console.log(data);
  return data;
};
export const getCareLogsByDate = async (
  petId: number,
  date: string,
): Promise<CareLog[]> => {
  if (USE_MOCK) return getMockCareLogs(petId, date);
  return serverApi.get<CareLog[]>(`/api/care-logs?petId=${petId}&date=${date}`);
};
