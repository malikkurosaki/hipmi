import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { SplashScreen } from "@/app_modules/auth";

export default async function PageSplash() {
  const userLoginId = await funGetUserIdByToken();

  return (
    <>
      <SplashScreen userLoginId={userLoginId} />
    </>
  );
}
