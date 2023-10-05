import { getProfile } from "@/app_modules/katalog/profile";
import { getFotoProfile } from "@/app_modules/katalog/profile/fun/api-get-foto-profile";
import { KatalogView } from "@/app_modules/katalog/view";

export default async function Page() {
  const data = await getProfile();
  
  return (
    <>
      {/* {JSON.stringify(data?.imagesId)} */}
      <KatalogView data={data} />
    </>
  );
}
