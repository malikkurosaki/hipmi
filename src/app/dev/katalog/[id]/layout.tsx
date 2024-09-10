import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";
import { KatalogLayout } from "@/app_modules/katalog/main";
import { Profile_getOneProfileAndUserById } from "@/app_modules/katalog/profile/fun/get/get_one_user_profile";

export default async function Layout({
  children,
  params,
}: {
  children: any;
  params: { id: string };
}) {
  const profileId = params.id;
  const dataProfile = await Profile_getOneProfileAndUserById(profileId)
  const authorId = dataProfile?.userId;
  const userLoginId = await user_funGetOneUserId();


  return (
    <>
      <KatalogLayout
        profileId={profileId}
        userLoginId={userLoginId}
        authorId={authorId as any}
      >
        {children}
      </KatalogLayout>
    </>
  );
}
