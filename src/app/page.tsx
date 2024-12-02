import { SplashScreen } from "@/app_modules/auth";
import { useShallowEffect } from "@mantine/hooks";

export default function Page() {
  // useShallowEffect(() => {
  //   setTimeout(() => {
  //     window.location.replace("/dev/home");
  //   }, 100);
  // }, []);

  // return <Login  version={version} />;
  // return <div>spash</div>;
  return <SplashScreen />;
}
