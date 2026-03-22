"use client";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";
import { Button } from "@/shared/ui/button";
import { ChevronDown, Pencil } from "lucide-react";
import { Pet } from "@/shared/actions/pet";

const TABS = [
  { key: "my", label: "내가 등록한 반려동물" },
  { key: "shared", label: "공유받은 반려동물" },
] as const;
type TabKey = (typeof TABS)[number]["key"];

interface PetSelectProps {
  pets: Pet[];
}

const calculateAge = (birthDate: string, birthDateUnknown: boolean) => {
  if (birthDateUnknown) return "나이 미상";
  const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
  return `${age}살`;
};

interface PetSelectProps {
  pets: Pet[];
  selectedPetId: number;
  onSelect: (petId: number) => void;
}
export const PetSelect = ({
  pets,
  selectedPetId,
  onSelect,
}: PetSelectProps) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("my");
  const selectedPet = pets.find((p) => p.id === selectedPetId);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="flex items-center gap-1 font-semibold text-base">
          {selectedPet?.name ?? "반려동물"}
          <ChevronDown size={16} />
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-2xl">
        <SheetHeader>
          <SheetTitle>반려동물 선택</SheetTitle>
        </SheetHeader>

        <div className="flex w-full h-16 px-4 text-center items-center">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 h-16 flex items-center justify-center border-b-2 transition-colors ${
                activeTab === key
                  ? "border-black font-semibold"
                  : "border-gray-300 font-normal opacity-70"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === "my" && (
          <div className="flex flex-col py-2">
            {pets.length === 0 ? (
              <div className="py-8 text-center text-gray-400">
                등록된 반려동물이 없습니다
              </div>
            ) : (
              <ul className="flex flex-col gap-2">
                {pets.map((pet) => (
                  <li
                    key={pet.id}
                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer ${
                      pet.id === selectedPetId ? "bg-primary/10" : ""
                    }`}
                    onClick={() => {
                      onSelect(pet.id);
                      setOpen(false);
                    }}
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold">{pet.name}</span>
                      <span className="text-sm text-gray-400">
                        {calculateAge(pet.birthDate, pet.birthDateUnknown)}
                      </span>
                    </div>
                    <button
                      className="p-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Pencil size={16} className="text-gray-400" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button className="w-full mt-4 py-3 border border-dashed border-gray-300 rounded-xl text-gray-400 bg-transparent text-sm">
              + 반려동물 추가하기
            </button>
          </div>
        )}

        {activeTab === "shared" && (
          <div className="py-8 text-center text-gray-400">
            공유받은 반려동물이 없습니다
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
