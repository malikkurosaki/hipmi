import { funGetUserProfile } from "@/app_modules/fun_global/get_user_profile";
import { EditProfileLayout } from "@/app_modules/katalog/profile";

export default async function Layout({
  children,
  params,
}: {
  children: any;
  params: { id: string };
}) {
  let profileId = params.id;

  return (
    <>
      <EditProfileLayout>{children}</EditProfileLayout>
    </>
  );
}
