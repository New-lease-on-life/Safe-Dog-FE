"use client";
import { useRouter } from "next/navigation";
import { CommonLayout } from "@/widgets/CommonLayout";
import { Button } from "@/shared/ui/button";
import { X } from "lucide-react";
import { Invitation } from "@/shared/types";

const MOCK_INVITER = {
  nickname: "진희",
  profileImageUrl: "",
  role: "관리자",
};

interface Props {
  invitation: Invitation;
  isLoggedIn: boolean;
}

export const InvitationPage = ({ invitation, isLoggedIn }: Props) => {
  const router = useRouter();

  const handleJoin = () => {
    if (isLoggedIn) {
    } else {
      router.push(`/signup?inviteCode=${invitation.code}`);
    }
  };

  return (
    <CommonLayout>
      <div className="flex items-center justify-between px-4 py-4">
        <h1 className="text-lg font-bold mx-auto">공동보호자 합류</h1>
        <button onClick={() => router.back()} className="absolute right-4">
          <X size={20} />
        </button>
      </div>

      <div className="flex flex-col items-center gap-6 flex-1 px-6 pt-8">
        <p className="text-2xl font-bold">초대가 도착했어요!</p>

        <div className="text-6xl">💌</div>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            {MOCK_INVITER.profileImageUrl && (
              <img
                src={MOCK_INVITER.profileImageUrl}
                alt={MOCK_INVITER.nickname}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <span className="font-semibold">{MOCK_INVITER.nickname}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-white">
            {MOCK_INVITER.role}
          </span>
        </div>

        <p className="text-gray-500 text-sm">공동보호자로 합류 하시겠습니까?</p>

        <div className="w-full border-b border-gray-200 pb-3 text-center">
          <p className="text-xs text-gray-400 mb-1">초대받은 공동양육코드</p>
          <p className="text-xl font-bold tracking-widest">{invitation.code}</p>
        </div>
      </div>

      <div className="p-4 mt-auto">
        <Button
          className="w-full h-14 rounded-full  bg-gray-800 text-white text-base font-semibold"
          onClick={handleJoin}
        >
          공동양육 합류하기
        </Button>
      </div>
    </CommonLayout>
  );
};
