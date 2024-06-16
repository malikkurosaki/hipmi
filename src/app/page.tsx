import { SplashScreen } from "@/app_modules/auth";
import { redirect } from "next/navigation";
import PageSplash from "./dev/auth/splash/page";

export default async function Page() {
  return <PageSplash/>
}
