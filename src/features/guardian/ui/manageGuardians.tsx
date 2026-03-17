import { Guardian } from "@/entities/guardian/model/types";
import { Users } from "lucide-react";
import { Button } from "@/shared/ui/button";
interface GuadianListProps {
  guardians: Guardian[];
}
export const ManageGuardians = ({ guardians }: GuadianListProps) => {
  return (
    <div className="flex items-start p-4">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 bg-[#4c4c4c] rounded-full flex items-center justify-center border border-white">
          <Users className="w-6 h-6 text-white" />
        </div>
        <p className="text-muted-foreground text-xs whitespace-pre-line text-center">
          공동보호자{"\n"} 관리
        </p>
      </div>

      <div className="flex">
        {guardians.map((guardian: Guardian) => (
          <div
            key={guardian.userId}
            className="flex flex-col items-center -ml-2 first:ml-0"
          >
            <div className="w-10 h-10 bg-[#4c4c4c] rounded-full border-1 border-white " />
            {/* <p className="text-muted-foreground text-sm">{guardian.nickname}</p> */}
          </div>
        ))}
      </div>
      <div className="ml-auto">
        <Button className="rounded-full bg-[#888888]">요청하기</Button>
      </div>
    </div>
  );
};
