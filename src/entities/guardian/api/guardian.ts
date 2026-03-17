import { Guardian } from "../model/types";
// mock data
export async function getGuardians(): Promise<Guardian[]> {
  return [
    {
      id: 1,
      userId: 1414,
      role: "OWNER",
      nickname: "엄마",
      profile: null,
    },
    {
      id: 2,
      userId: 2334,
      role: "",
      nickname: "아빠",
      profile: null,
    },
    {
      id: 3,
      userId: 7176,
      role: "",
      nickname: "형",
      profile: null,
    },
  ];
}
