import { CreatePetNotePage } from "@/views/pet-note/ui/createPetNotePage";
import { CheckListPage } from "@/views/checklist/ui/checklistPage";

interface Props {
  searchParams: Promise<{ petId?: string }>;
}

export default async function page({ searchParams }: Props) {
  const { petId } = await searchParams;

  if (petId) {
    return <CreatePetNotePage petId={Number(petId)} />;
  }
  return <CheckListPage />;
}
