import { HomePage } from "@/views/home/ui/homePage";
import { getMyPets, getMyInfo, getCareLogsByDate } from "@/shared/actions/pet";
import { getGuardians } from "@/shared/actions/guardians";

export default async function page() {
  const today = new Date().toISOString().split("T")[0];

  const [myInfo, pets, guardians] = await Promise.all([
    getMyInfo(),
    getMyPets(),
    getGuardians(1),
  ]);

  const petId = pets[0]?.id;
  const careLogs = petId ? await getCareLogsByDate(petId, today) : [];

  return (
    <HomePage
      myInfo={myInfo}
      pets={pets}
      guardians={guardians}
      careLogs={careLogs}
    />
  );
}
