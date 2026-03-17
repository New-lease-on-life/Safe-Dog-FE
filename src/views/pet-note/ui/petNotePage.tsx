import { CommonLayout } from "@/widgets/CommonLayout";
import { Header } from "@/widgets/Header";
import { Bell } from "lucide-react";
import { PetSelect } from "@/features/pet/ui/PetSelect";
import { getPets } from "@/entities/pet/api/pet";
import { getGuardians } from "@/entities/guardian/api/guardian";
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
    </CommonLayout>
  );
};
