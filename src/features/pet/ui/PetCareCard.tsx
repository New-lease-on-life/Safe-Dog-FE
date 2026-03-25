"use client";
import { useState } from "react";
import { Check, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { RequestDialog } from "@/features/care/ui/RequestDialog";
import { CareLog, Guardian } from "@/shared/types";
import { DiseaseCareType } from "@/views/pet-note/model/type";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Calendar } from "@/shared/ui/calendar";
import { CalendarDays } from "lucide-react";

const DISEASE_TYPES: DiseaseCareType[] = [
  "heart",
  "kidney",
  "cancer",
  "eye",
  "cushing",
  "arthritis",
  "other",
];

const CARE_TYPE_LABELS: Record<string, string> = {
  ALL: "전체",
  meal: "식사",
  snack: "간식",
  supplement: "영양제",
  walk: "산책",
  grooming: "그루밍",
  medicine: "투약",
  water: "음수",
  pad: "배변",
  weight: "체중",
  vaccination: "예방접종",
  etc: "기타",
  heart: "심장",
  kidney: "신장",
  cancer: "암",
  eye: "안과",
  cushing: "쿠싱증후군",
  arthritis: "관절염",
  other: "기타질병",
};

type LocalCompletion = {
  profileImageUrl: string;
  nickname: string;
  completedAt: string;
};

// ─── MemoDialog ───────────────────────────────────────────────────────────────

const MemoDialog = ({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (content: string) => void;
}) => {
  const [content, setContent] = useState("");

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[24px] px-5 pt-4 pb-10 flex flex-col gap-5 shadow-2xl">
        <div className="w-10 h-1 bg-[#E0E0E0] rounded-full mx-auto" />
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] font-semibold text-[#1F1F1F]">
            메모 등록
          </h3>
          <button onClick={onClose}>
            <X size={22} className="text-[#9E9E9E]" />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-medium text-[#6B6B6B]">
            메모 내용
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="오늘의 케어 관련 메모를 입력해주세요"
            rows={5}
            className="rounded-[12px] border border-[#E0E0E0] px-4 py-3 text-[15px] text-[#1F1F1F] placeholder:text-[#C4C4C4] outline-none focus:border-[#9F7248] resize-none"
          />
        </div>
        <button
          onClick={() => {
            if (!content.trim()) return;
            onSave(content.trim());
            onClose();
          }}
          disabled={!content.trim()}
          className="h-[54px] rounded-[30px] bg-primary-500 text-white text-[16px] font-medium disabled:opacity-40 transition-opacity"
        >
          등록하기
        </button>
      </div>
    </>
  );
};

// ─── CareList ────────────────────────────────────────────────────────────────

const CareList = ({
  logs,
  guardians,
  isDisease,
  onMemoAdd,
}: {
  logs: CareLog[];
  guardians: Guardian[];
  isDisease: boolean;
  onMemoAdd: () => void;
}) => {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [completions, setCompletions] = useState<Map<number, LocalCompletion>>(
    new Map(),
  );
  const [requested, setRequested] = useState<Set<number>>(new Set());
  const [selectedLog, setSelectedLog] = useState<CareLog | null>(null);

  const availableTypes = [
    "ALL",
    ...Array.from(new Set(logs.map((l) => l.careType))),
  ];
  const currentLogs =
    activeFilter === "ALL"
      ? logs
      : logs.filter((l) => l.careType === activeFilter);

  const getRelTime = (iso: string) => {
    // eslint-disable-next-line react-hooks/purity
    const m = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
    if (m < 1) return "방금 전";
    if (m < 60) return `${m}분 전`;
    return `${Math.floor(m / 60)}시간 전`;
  };

  return (
    <>
      <div className="flex gap-1 overflow-x-auto pb-3 scrollbar-hide px-[10px]">
        {availableTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveFilter(type)}
            className={`flex-shrink-0 h-10 px-4 rounded-full text-[14px] font-medium transition-colors border ${
              activeFilter === type
                ? "bg-white text-[#3D3D3D] border-[#9F948A] border-[1.5px]"
                : "bg-white text-[#6B6B6B] border-[#E0E0E0]"
            }`}
          >
            {CARE_TYPE_LABELS[type] ?? type}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-0.5 px-[10px]">
        {currentLogs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-[16px] text-[#3D3D3D] whitespace-pre-line text-center">
              체크리스트를 추가하여{"\n"}
              <span className="font-bold">반려견을 케어해보세요!</span>
            </p>
          </div>
        )}

        {currentLogs.map((log) => {
          const local = completions.get(log.id);
          const done = log.completed || !!local;
          const doneAt = log.completedAt ?? local?.completedAt;
          const imgUrl =
            log.completedByProfileImageUrl || local?.profileImageUrl || "";
          const nickname = log.completedByNickname || local?.nickname || "";
          const isRequested = requested.has(log.id);

          return (
            <div
              key={log.id}
              className="flex items-center gap-[14px] bg-[#F7F7F7] rounded-[16px] px-[20px] h-[64px]"
            >
              <button
                onClick={() => {
                  if (done) return;
                  setCompletions(
                    (p) =>
                      new Map([
                        ...p,
                        [
                          log.id,
                          {
                            profileImageUrl: "",
                            nickname: "나",
                            completedAt: new Date().toISOString(),
                          },
                        ],
                      ]),
                  );
                }}
                className={`w-[26px] h-[26px] rounded-sm flex items-center justify-center flex-shrink-0 transition-colors ${
                  done
                    ? "bg-primary-500"
                    : "border-2 border-[#E0E0E0] hover:border-[#9F7248]"
                }`}
              >
                {done && <Check size={14} className="text-white" />}
              </button>

              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[16px] font-medium text-[#3D3D3D] flex items-center gap-1.5">
                  {log.title}
                  {log.content && (
                    <span className="text-[15px] text-[#6B6B6B] font-normal">
                      · {log.content}
                    </span>
                  )}
                </span>
                {done && doneAt && (
                  <span className="text-[14px] text-[#444444] mt-0.5">
                    {nickname ? `${nickname} · ` : ""}
                    {getRelTime(doneAt)}
                  </span>
                )}
              </div>

              {done ? (
                imgUrl ? (
                  <img
                    src={imgUrl}
                    alt={nickname}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#E0E0E0] flex items-center justify-center flex-shrink-0">
                    <span className="text-[12px] font-bold text-[#9E9E9E]">
                      {nickname[0]}
                    </span>
                  </div>
                )
              ) : isRequested ? (
                // 요청 완료 상태 — disabled
                <button
                  disabled
                  className="flex-shrink-0 px-3 h-8 rounded-full text-[12px] font-medium bg-[#E0E0E0] text-[#9E9E9E] cursor-default"
                >
                  요청완료
                </button>
              ) : (
                // 요청하기 — 클릭 시 dialog 오픈
                <button
                  onClick={() => setSelectedLog(log)}
                  className="flex-shrink-0 px-3 h-8 rounded-full text-white text-[12px] font-medium bg-[#FFB84C]"
                >
                  요청하기
                </button>
              )}
            </div>
          );
        })}

        <button
          onClick={onMemoAdd}
          className="mt-2 h-12 rounded-full border border-dashed border-[#C4C4C4] text-[#919191] text-[14px] font-medium"
        >
          + 메모 추가하기
        </button>
      </div>

      {/* RequestDialog — 요청 완료 시 해당 log id를 requested에 추가 */}
      {selectedLog && (
        <RequestDialog
          open={!!selectedLog}
          onClose={() => setSelectedLog(null)}
          onRequestSent={() => {
            setRequested((p) => new Set([...p, selectedLog.id]));
            setSelectedLog(null);
          }}
          careLog={selectedLog}
          guardians={guardians}
        />
      )}
    </>
  );
};

// ─── PetCareCard ──────────────────────────────────────────────────────────────

interface PetCareCardProps {
  careLogs: CareLog[];
  guardians: Guardian[];
  selectedDate: string;
  onDateSelect?: (date: string) => void;
  onMemoSave?: (content: string) => void;
}

export default function PetCareCard({
  careLogs,
  guardians,
  selectedDate,
  onDateSelect,
  onMemoSave,
}: PetCareCardProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [memoDialogOpen, setMemoDialogOpen] = useState(false);

  const basicLogs = careLogs.filter(
    (l) => !DISEASE_TYPES.includes(l.careType as DiseaseCareType),
  );
  const diseaseLogs = careLogs.filter((l) =>
    DISEASE_TYPES.includes(l.careType as DiseaseCareType),
  );

  const handleCalendarSelect = (date: Date | undefined) => {
    if (!date || !onDateSelect) return;
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    onDateSelect(`${yyyy}-${mm}-${dd}`);
    setCalendarOpen(false);
  };

  const calendarValue = selectedDate
    ? new Date(selectedDate + "T00:00:00")
    : undefined;

  return (
    <div className="w-full bg-white rounded-t-[20px] pb-6 flex-1">
      <div className="flex items-center justify-between px-[21px] pt-[18px] pb-[14px]">
        <div className="flex items-center gap-1.5">
          <Image
            src="/images/icon_medical_note.png"
            alt="노트"
            width={28}
            height={28}
            unoptimized
          />
          <h2 className="text-[18px] font-semibold text-[#1F1F1F] tracking-[-0.04em]">
            오늘의 체크리스트
          </h2>
        </div>
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <button
              className="w-[24px] h-[24px] flex items-center justify-center text-[#3D3D3D] hover:text-[#9F7248] transition-colors"
              aria-label="날짜 선택"
            >
              <CalendarDays size={24} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end" sideOffset={8}>
            <Calendar
              mode="single"
              selected={calendarValue}
              onSelect={handleCalendarSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <Tabs defaultValue="disease">
        <div className="mx-5 bg-[#F7F7F7] rounded-[16px_16px_6px_6px] p-1">
          <TabsList className="w-full h-[42px] bg-transparent gap-0 p-0">
            <TabsTrigger
              value="disease"
              className="flex-1 h-full text-[16px] data-[state=active]:bg-white data-[state=active]:text-[#3D3D3D] data-[state=active]:font-bold data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#9E9E9E] data-[state=inactive]:font-medium rounded-[12px_12px_4px_4px] shadow-none"
            >
              질병 케어
            </TabsTrigger>
            <TabsTrigger
              value="basic"
              className="flex-1 h-full text-[16px] data-[state=active]:bg-white data-[state=active]:text-[#3D3D3D] data-[state=active]:font-bold data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#9E9E9E] data-[state=inactive]:font-medium rounded-[12px_12px_4px_4px] shadow-none"
            >
              기본 케어
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="disease" className="mt-1 mx-3">
          <CareList
            key={`disease-${selectedDate}`}
            logs={diseaseLogs}
            guardians={guardians}
            isDisease={true}
            onMemoAdd={() => setMemoDialogOpen(true)}
          />
        </TabsContent>
        <TabsContent value="basic" className="mt-1 mx-3">
          <CareList
            key={`basic-${selectedDate}`}
            logs={basicLogs}
            guardians={guardians}
            isDisease={false}
            onMemoAdd={() => setMemoDialogOpen(true)}
          />
        </TabsContent>
      </Tabs>

      {memoDialogOpen && (
        <MemoDialog
          onClose={() => setMemoDialogOpen(false)}
          onSave={(content) => {
            onMemoSave?.(content);
            setMemoDialogOpen(false);
          }}
        />
      )}
    </div>
  );
}
