import { funGetUserProfile } from "@/app_modules/fun/get_user_profile";
import { getProfile } from "@/app_modules/katalog/profile";
import EditProfile from "@/app_modules/katalog/profile/edit/view";

export default async function Page({ params }: { params: { id: string } }) {
  const data = await funGetUserProfile(params.id);

  return (
    <>
      {/* {JSON.stringify(data)} */}
      <EditProfile data={data as any} />
    </>
  );
}
