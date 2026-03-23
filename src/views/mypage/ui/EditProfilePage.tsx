"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CommonLayout } from "@/widgets/CommonLayout";
import { Header } from "@/widgets/Header";
import { ChevronLeft, Camera, Pencil } from "lucide-react";
import { User } from "@/shared/types";
import { Button } from "@/shared/ui/button";

const PROVIDER_ICONS: Record<string, { label: string; color: string }> = {
  NAVER: { label: "네이버 계정 연결", color: "bg-green-500" },
};

type Props = {
  profile: User;
};

export const EditProfilePage = ({ profile }: Props) => {
  const router = useRouter();
  const [nickname, setNickname] = useState(profile.nickname);
  const [isEditingNickname, setIsEditingNickname] = useState(false);

  const provider = PROVIDER_ICONS[profile.providerType] ?? PROVIDER_ICONS.LOCAL;

  return (
    <CommonLayout>
      <Header
        left={
          <button onClick={() => router.back()}>
            <ChevronLeft />
          </button>
        }
        title="내 정보 수정"
      />

      <div className="flex flex-col px-6 pt-6 gap-8">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
              {profile.profileImageUrl && (
                <img
                  src={profile.profileImageUrl}
                  alt={profile.nickname}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-gray-600 rounded-full flex items-center justify-center">
              <Camera size={14} className="text-white" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">이름</label>
          <div className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
            <span className="text-gray-400">{profile.name}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">닉네임</label>
          <div className="flex items-center px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 gap-2">
            {isEditingNickname ? (
              <input
                autoFocus
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                onBlur={() => setIsEditingNickname(false)}
                className="flex-1 bg-transparent outline-none text-gray-700"
              />
            ) : (
              <span className="flex-1 text-gray-700">{nickname}</span>
            )}
            <button onClick={() => setIsEditingNickname(true)}>
              <Pencil size={16} className="text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">계정 연결</label>
          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-3">
              <div
                className={`w-7 h-7 rounded-full ${provider.color} flex items-center justify-center`}
              >
                <span className="text-white text-xs font-bold">
                  {profile.providerType[0]}
                </span>
              </div>
              <span className="text-sm text-gray-700">{provider.label}</span>
            </div>
            <span className="text-xs text-gray-400">연결됨</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => {}}
        className="mt-3 mx-6 mb-8 text-sm text-gray-400 text-left"
      >
        탈퇴하기
      </button>
      <Button
        onClick={() => {
          router.push("/mypage");
        }}
        className="mt-auto mx-6 mb-8 rounded-full h-14 text-sm "
      >
        저장하기
      </Button>
    </CommonLayout>
  );
};
