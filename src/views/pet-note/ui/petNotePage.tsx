import { CommonLayout } from "@/widgets/CommonLayout";
import { Header } from "@/widgets/Header";
import { Bell } from "lucide-react";
import { PetSelect } from "@/features/pet/ui/PetSelect";
import { getPets } from "@/entities/pet/api/pet";
import { getGuardians } from "@/entities/guardian/api/guardian";
import { MessageSquareDot } from "lucide-react";
const Notice = () => <Bell />;
import { ManageGuardians } from "@/features/guardian/ui/manageGuardians";
export const PetNotePage = async () => {
  const pets = await getPets();
  const guardians = await getGuardians();
  return (
    <CommonLayout>
      <Header
        title={"반려노트"}
        left={<PetSelect pets={pets} />}
        right={<Notice />}
      />
      <ManageGuardians guardians={guardians} />
      <div className="relative m-4 text-2xl  h-60">
        <p>오늘의 케어가 충분해,</p>
        <p className="font-semibold">토토가 신이 났어요!</p>
        <div className="absolute top-4 right-2 w-10 h-10 bg-wthie border-none rounded-full flex items-center justify-center border">
          <MessageSquareDot className="text-gray-400" />
        </div>
        <div className="absolute bottom-4 right-4">Image</div>
        <div className="absolute bottom-4 right-4">Image</div>
      </div>
    </CommonLayout>
  );
};
