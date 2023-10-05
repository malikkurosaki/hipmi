import { getProfile } from "@/app_modules/katalog/profile";
import EditProfile from "@/app_modules/katalog/profile/edit/view";
import { getFotoProfile } from "@/app_modules/katalog/profile/fun/api-get-foto-profile";

export default async function Page() {
  const data = await getProfile();
  const gmbr = await getFotoProfile(data?.imagesId)

  return (
    <>
      {/* {JSON.stringify(data)} */}
      <EditProfile data={data} />
    </>
  );
}
