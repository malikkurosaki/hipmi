import { funGetUserProfile } from "@/app_modules/fun_global/get_user_profile";
import EditProfile from "@/app_modules/katalog/profile/edit/view";
import { Profile_getOneProfileAndUserById } from "@/app_modules/katalog/profile/fun/get/get_one_user_profile";

export default async function Page({ params }: { params: { id: string } }) {
  let profileId = params.id
  const data = await funGetUserProfile(params.id);
  const dataProfile = await Profile_getOneProfileAndUserById(profileId)

  return (
    <>
      {/* {JSON.stringify(data)} */}
      <EditProfile data={dataProfile as any} />
    </>
  );
}
