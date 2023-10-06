import { loadListPortofolio } from "@/app_modules/katalog/portofolio/fun/fun_get_all_portofolio";
import { getProfile } from "@/app_modules/katalog/profile";
import { KatalogView } from "@/app_modules/katalog/view";

export default async function Page() {
  const data = await getProfile();
  const listPorto = await loadListPortofolio(data?.id as string)
  return (
    <>
      {/* {JSON.stringify(data)} */}
      <KatalogView data={data} porto={listPorto} />
    </>
  );
}
