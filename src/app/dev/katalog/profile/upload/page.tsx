import { UploadFotoProfile, getProfile } from "@/app_modules/katalog/profile";
import { getFotoProfile } from "@/app_modules/katalog/profile/fun/api-get-foto-profile";

export default async function Page() {
  const data = await getProfile();
  const gmbr = await getFotoProfile(data?.imagesId)
  return (
    <>
      <UploadFotoProfile data={data} gmbr={gmbr?.url} />
    </>
  );
}
