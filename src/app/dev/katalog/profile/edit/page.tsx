import { getProfile } from "@/app_modules/katalog/profile";
import EditProfile from "@/app_modules/katalog/profile/edit/view";

export default async function Page() {
  const data = await getProfile();

  return (
    <>
      {/* {JSON.stringify(data)} */}
      <EditProfile data={data} />
    </>
  );
}
