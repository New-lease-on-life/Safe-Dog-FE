"use client";
import { useState, useEffect } from "react";
import { CommonLayout } from "@/widgets/CommonLayout";
import { Header } from "@/widgets/Header";
import { Bell, X } from "lucide-react";
import { BottomNavigation } from "@/widgets/BottomNavigation";
import { PetSelect } from "@/features/pet/ui/PetSelect";
import { ManageGuardians } from "@/features/guardian/ui/manageGuardians";
import PetCareCard from "@/features/pet/ui/PetCareCard";
import { Pet, CareLog, Guardian, Memo } from "@/shared/types";
import { getCareLogsByDate } from "@/shared/actions/pet";
import { DateSelector } from "@/features/pet/ui/DateSelector";
import { MemoCard } from "@/features/pet/ui/MemoCard";
import { useRouter } from "next/navigation";

type Notification = {
  id: number;
  type: "request" | "complete" | "memo";
  title: string;
  body: string;
  time: string;
};

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: "request",
    title: "케어 요청",
    body: "박진희님이 돌돌이의 심장약 복용을 요청했어요.",
    time: "10분 전",
  },
  {
    id: 2,
    type: "complete",
    title: "케어 완료",
    body: "박진수님이 돌돌이의 아침 산책을 완료했어요.",
    time: "32분 전",
  },
  {
    id: 3,
    type: "memo",
    title: "메모 등록",
    body: "이경욱님이 새 메모를 남겼어요: 오늘 식욕이 조금 떨어진 것 같아요.",
    time: "1시간 전",
  },
  {
    id: 4,
    type: "request",
    title: "케어 요청",
    body: "박호준님이 돌돌이의 저녁 식사를 요청했어요.",
    time: "2시간 전",
  },
];

const TYPE_ICON: Record<Notification["type"], string> = {
  request: "🔔",
  complete: "✅",
  memo: "📝",
};

// ─── 알림 다이얼로그 ──────────────────────────────────────────────────────────

const NotificationDialog = ({ onClose }: { onClose: () => void }) => (
  <>
    <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[24px] px-5 pt-4 pb-10 flex flex-col gap-4 shadow-2xl max-h-[70vh]">
      <div className="w-10 h-1 bg-[#E0E0E0] rounded-full mx-auto" />
      <div className="flex items-center justify-between">
        <h3 className="text-[18px] font-semibold text-[#1F1F1F]">알림</h3>
        <button onClick={onClose}>
          <X size={22} className="text-[#9E9E9E]" />
        </button>
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto">
        {MOCK_NOTIFICATIONS.map((n) => (
          <div
            key={n.id}
            className="flex items-start gap-3 bg-[#F7F7F7] rounded-[16px] px-4 py-3"
          >
            <span className="text-[22px] mt-0.5 flex-shrink-0">
              {TYPE_ICON[n.type]}
            </span>
            <div className="flex flex-col flex-1 min-w-0 gap-0.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[14px] font-semibold text-[#1F1F1F]">
                  {n.title}
                </span>
                <span className="text-[12px] text-[#9E9E9E] flex-shrink-0">
                  {n.time}
                </span>
              </div>
              <p className="text-[13px] text-[#6B6B6B] leading-relaxed">
                {n.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);

// ─── 알림 벨 버튼 ─────────────────────────────────────────────────────────────

const Notice = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="relative w-8 h-8 flex items-center justify-center"
  >
    <Bell size={22} className="text-[#3D3D3D]" />
    {/* 빨간 알림 점 */}
    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
  </button>
);

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
  pets: Pet[];
  guardians: Guardian[];
  careLogs: CareLog[];
  initialDate: string;
};

const NoPetRegistered = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-5 gap-6">
      <p className="text-center text-[16px] font-medium text-[#6B6B6B] leading-relaxed">
        먼저 반려동물 등록을 완료해야{"\n"}체크리스트를 설정 할 수 있어요
      </p>
      <button
        onClick={() => router.push("/pet/register")}
        className="w-[310px] h-[54px] rounded-[30px] bg-primary-500 text-white text-[16px] font-medium"
      >
        반려동물 등록하러 가기
      </button>
    </div>
  );
};

// ─── PetNotePage ──────────────────────────────────────────────────────────────

export const PetNotePage = ({
  pets,
  guardians,
  careLogs: initialCareLogs,
  initialDate,
}: Props) => {
  const [selectedPetId, setSelectedPetId] = useState(pets[0]?.id);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [careLogs, setCareLogs] = useState(initialCareLogs);
  const [memo, setMemo] = useState<Memo | null>(null);
  const [notiOpen, setNotiOpen] = useState(false);

  useEffect(() => {
    if (!selectedPetId) return;
    getCareLogsByDate(selectedPetId, selectedDate).then(setCareLogs);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMemo(null);
  }, [selectedPetId, selectedDate]);

  const handleMemoSave = (content: string) => {
    setMemo({
      id: Date.now(),
      petId: selectedPetId,
      targetDate: selectedDate,
      content,
      authorNickname: "나",
      authorRole: "보호자",
      authorProfileImageUrl: "",
    });
  };

  return (
    <CommonLayout backgroundColor="bg-white">
      <Header
        title="반려노트"
        left={
          <PetSelect
            pets={pets}
            selectedPetId={selectedPetId}
            onSelect={setSelectedPetId}
          />
        }
        right={<Notice onClick={() => setNotiOpen(true)} />}
      />
      {pets.length === 0 ? (
        <NoPetRegistered />
      ) : (
        <>
          <ManageGuardians guardians={guardians} />
          <DateSelector
            selectedDate={selectedDate}
            onSelect={setSelectedDate}
          />
          <MemoCard memo={memo} />
          <PetCareCard
            careLogs={careLogs}
            guardians={guardians}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            onMemoSave={handleMemoSave}
          />
        </>
      )}
      <BottomNavigation />

      {notiOpen && <NotificationDialog onClose={() => setNotiOpen(false)} />}
    </CommonLayout>
  );
};
