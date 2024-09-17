import { SplashScreen } from "@/app_modules/auth";
import { user_funGetOneUserId } from "@/app_modules/fun_global";

export default async function PageSplash() {
  const userLoginId = await user_funGetOneUserId();

  return (
    <>
      <SplashScreen userLoginId={userLoginId} />
    </>
  );
}
