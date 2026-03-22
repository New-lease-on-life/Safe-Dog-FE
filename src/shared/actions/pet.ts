"use server";
import { serverApi } from "./api";

export const getMyPets = async () => {
  const data = serverApi.get("/api/pets");
  console.log(data);
  return data;
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
