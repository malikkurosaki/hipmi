import { RealtimeProvider } from "../lib";
import { newFunGetUserId } from "../lib/new_fun_user_id";
import { ServerEnv } from "../lib/server_env";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RealtimeProvider
        WIBU_REALTIME_TOKEN={
          ServerEnv.value?.NEXT_PUBLIC_WIBU_REALTIME_TOKEN as string
        }
      />

      {children}
    </>
  );
}
