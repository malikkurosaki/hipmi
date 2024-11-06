import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { CobaRealtime } from "@/app_modules/zCoba/coba_realtime";

export default async function Page() {
  await new Promise((a, b) => {
    setTimeout(a, 3000);
  });

  const userLoginId = await funGetUserIdByToken();

  return (
    <>
      <CobaRealtime userLoginId={userLoginId} />
      {/* <Coba_TestLoading userLoginId={userLoginId} /> */}
      {/* <ComponentGlobal_UI_LayoutTamplate /> */}
    </>
  );
}
