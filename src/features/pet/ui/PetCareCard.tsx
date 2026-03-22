"use client";
import { useState } from "react";
import { Card, CardContent } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { CareLog } from "@/shared/actions/pet";
import { Check } from "lucide-react";

const tabs = ["기본 케어", "질병 케어"];
type Tab = (typeof tabs)[number];
interface PetCareCardProps {
  careLogs: CareLog[];
}
export default function PetCareCard({ careLogs }: PetCareCardProps) {
  const [activeTab, setActiveTab] = useState("기본 케어");
  const basicLogs = careLogs.filter((log) => log.careType !== "DISEASE");
  const diseaseLogs = careLogs.filter((log) => log.careType === "DISEASE");
  const currentLogs = activeTab === "기본 케어" ? basicLogs : diseaseLogs;

  const completedCount = currentLogs.filter((log) => log.completed).length;
  const totalCount = currentLogs.length;
  return (
    <div className="w-full p-8 bg-white rounded-t-3xl">
      <div className="mb-4 text-xl font-bold">오늘의 체크리스트</div>
      <div className="flex ">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-lg font-bold rounded-t-2xl text-white ${
                isActive ? "bg-[#959596] z-10" : "bg-[#D9D9D9]"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <Card className="flex flex-col rounded-t-none rounded-b-2xl bg-[#959596] border-none shadow-none">
        <CardContent className="h-full flex flex-col pt-6 pb-6 px-5">
          {currentLogs.length === 0 ? (
            <>
              <p className="text-xl text-white whitespace-break-spaces">
                체크리스트를 추가하여{"\n"}
                <span className="font-bold">반려견을 케어해보세요!</span>
              </p>
              <Button
                variant="outline"
                className="mt-6 w-full h-16 rounded-full bg-[#D9D9D9] border-none text-lg font-semibold"
              >
                체크리스트 추가하기
              </Button>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <span className="text-white font-semibold">
                  {completedCount}/{totalCount} 완료
                </span>
              </div>
              <ul className="flex flex-col gap-3">
                {currentLogs.map((log) => (
                  <li
                    key={log.id}
                    className="flex items-center gap-3 bg-white/20 rounded-xl px-4 py-3"
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        log.completed ? "bg-white" : "bg-white/30"
                      }`}
                    >
                      {log.completed && (
                        <Check size={14} className="text-[#959596]" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span
                        className={`font-semibold text-white ${
                          log.completed ? "line-through opacity-60" : ""
                        }`}
                      >
                        {log.title}
                      </span>
                      <span className="text-sm text-white/70">
                        {log.content}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                className="mt-4 w-full h-16 rounded-full bg-[#D9D9D9] border-none text-lg font-semibold"
              >
                체크리스트 추가하기
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
