import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";
import { Katalog_MainView } from "@/app_modules/katalog";
import { funGetListPortofolio } from "@/app_modules/katalog/portofolio/fun/get/get_list_portofolio";
import { Profile_getOneProfileAndUserById } from "@/app_modules/katalog/profile/fun/get/get_one_user_profile";


export default async function Page({ params }: { params: { id: string } }) {
  let profileId = params.id;
  const userLoginId = await user_getOneUserId();
  const listPorto = await funGetListPortofolio(profileId);
  const dataProfile = await Profile_getOneProfileAndUserById(profileId);

  return (
    <>
      <Katalog_MainView
        profile={dataProfile as any}
        listPorto={listPorto as any}
        userLoginId={userLoginId}
      />
    </>
  );
}
