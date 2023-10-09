import { myConsole } from "@/app/fun/my_console";
import { CreatePortofolio } from "@/app_modules/katalog/portofolio";
import { getBidangBisnis } from "@/app_modules/katalog/portofolio/fun/get_list_bidang_bisnis";
import { getProfile } from "@/app_modules/katalog/profile";

export default async function Page() {
  const bidangBisnis = await getBidangBisnis();
  const id = await getProfile();
  const profileId = id?.id;

  return (
    <>
      <CreatePortofolio data={bidangBisnis} profileId={profileId} />
    </>
  );
}
