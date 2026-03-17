"use client";
import { CommonLayout } from "@/widgets/CommonLayout";
import { Header } from "@/widgets/Header";
import { useTabState } from "../model/useTabState";
import { TabType } from "../model/useTabState";

const TABS: { key: TabType; label: string }[] = [
  { key: "basic", label: "기본케어" },
  { key: "disease", label: "질병케어" },
];
export const CreatePetNotePage = () => {
  const { activeTab, setActiveTab } = useTabState();
  return (
    <CommonLayout>
      <Header title={"체크리스트 입력"} />
      <div className="flex w-full h-12 px-4 text-center items-center">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 h-full flex items-center justify-center border-b-2 transition colors ${
              activeTab === key
                ? "border-black font-semibold"
                : "border-gray-300 font-normal opacity-70"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </CommonLayout>
  );
};
