import { EditProfilePage } from "@/views/mypage/ui/EditProfilePage";
import { getMyProfile } from "@/shared/actions/mypage";

export default async function page() {
  const profile = await getMyProfile();
  return <EditProfilePage profile={profile} />;
}
