import { getProfile } from "@/app_modules/katalog/profile";
import { KatalogView } from "@/app_modules/katalog/view";

export default async function Page() {
  const data = await getProfile();
  return (
    <>
      {/* {JSON.stringify(data)} */}
      <KatalogView data={data} />
    </>
  );
}
