import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";
import { CreateProfile } from "@/app_modules/katalog/profile";

export default async function Page() {
  const userId = await user_funGetOneUserId();

  return (
    <>
      <CreateProfile userId={userId} />
    </>
  );
}
