export type GuardianRole = "OWNER" | "";

export interface Guardian {
  id: number;
  userId: number;
  role: GuardianRole;

  // api 미반영
  nickname: string;
  profile: File | null;
}
