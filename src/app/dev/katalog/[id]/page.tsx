import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { Katalog_MainView, ViewKatalogNew } from "@/app_modules/katalog";
import { funGetListPortofolio } from "@/app_modules/katalog/portofolio/fun/get/get_list_portofolio";
import { Profile_getOneProfileAndUserById } from "@/app_modules/katalog/profile/fun/get/get_one_user_profile";

export default async function Page({ params }: { params: { id: string } }) {
  let profileId = params.id;
  const userLoginId = await funGetUserIdByToken();

  const listPorto = await funGetListPortofolio(profileId);
  const dataProfile = await Profile_getOneProfileAndUserById(profileId);

  return (
    <>
      {/* <Katalog_MainView
        profile={dataProfile as any}
        listPorto={listPorto as any}
        userLoginId={userLoginId as any}
      /> */}

      <ViewKatalogNew />
    </>
  );
}
