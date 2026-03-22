"use server";
import { Invitation } from "@/shared/types";
import { MOCK_INVITATIONS } from "../mock/data";

export const getInvitation = async (
  code: string,
): Promise<Invitation | null> => {
  return MOCK_INVITATIONS.find((i) => i.code === code) ?? null;
  // return serverApi.post("/api/invitations", { code });
};
