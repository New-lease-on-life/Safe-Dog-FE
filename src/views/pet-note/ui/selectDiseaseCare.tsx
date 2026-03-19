"use client";

import { Card } from "@/shared/ui/card";
import { DiseaseCareType } from "../model/type";
import { Info, Check } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { DISEASE_TEMPLATES } from "@/features/diseaseCare/diseaseCareForm";

interface Props {
  selected: DiseaseCareType[];
  toggle: (key: DiseaseCareType) => void;
  onConfirm: () => void;
}

const DISEASE_KEY_MAP: Record<string, DiseaseCareType> = {
  heart: "heart",
  kidney: "kidney",
  cancer: "cancer",
  eye: "eye",
  cushing: "cushing",
  arthritis: "arthritis",
  etc: "other",
};

export const SelectDiseaseCare = ({ selected, toggle, onConfirm }: Props) => {
  const isSelected = (key: DiseaseCareType) => selected.includes(key);

  return (
    <div className="p-6">
      <div className="sticky top-0 flex my-4">
        <div className="flex">
          가이드 보기 <Info width="16" />
        </div>
        <div className="text-muted-foreground text-sm flex ml-auto">
          *중복 선택 가능
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 overflow-y-auto scrollbar-none max-h-[calc(100vh-200px)] pb-30">
        {DISEASE_TEMPLATES.map((t) => {
          const key = DISEASE_KEY_MAP[t.key];
          return (
            <Card
              key={t.key}
              onClick={() => toggle(key)}
              className={`flex flex-col items-center cursor-pointer transition-colors box-border border-2 ${
                isSelected(key) ? "border-black" : "border-gray-100"
              }`}
            >
              <div className="text-2xl">{t.emoji}</div>
              <div className="flex items-center gap-1">
                {isSelected(key) && <Check width={14} />}
                <p>{t.label}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="sticky bottom-6 left-0 right-0 flex justify-center px-6">
        <Button
          onClick={onConfirm}
          disabled={selected.length === 0}
          className="w-full h-12 rounded-full"
        >
          {selected.length > 0
            ? `${selected.length}개 선택됨`
            : "항목을 선택해주세요"}
        </Button>
      </div>
    </div>
  );
};
