"use client";

import { useState } from "react";
import { Switch } from "@/shared/ui/switch";
import { Trash2 } from "lucide-react";

export const PadNoteForm = () => {
  const [urineUsed, setUrineUsed] = useState(false);
  const [fecesUsed, setFecesUsed] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col gap-4 bg-white">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-sm">🐾 배변패드</span>
        <button className="text-gray-400">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-sm">소변 기록</span>
          <Switch checked={urineUsed} onCheckedChange={setUrineUsed} />
        </div>
        <p className="text-xs text-muted-foreground">
          소변을 체크할 수 있으며 정상 또는 이상을 선택할 수 있습니다
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-sm">대변 기록</span>
          <Switch checked={fecesUsed} onCheckedChange={setFecesUsed} />
        </div>
        <p className="text-xs text-muted-foreground">
          대변을 체크할 수 있으며 정상 또는 이상을 선택할 수 있습니다
        </p>
      </div>
    </div>
  );
};
