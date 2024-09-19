import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { CreateProfile } from "@/app_modules/katalog/profile";

export default async function Page() {
  const userLoginId = await funGetUserIdByToken();

  return (
    <>
      <CreateProfile userLoginId={userLoginId} />
    </>
  );
}
