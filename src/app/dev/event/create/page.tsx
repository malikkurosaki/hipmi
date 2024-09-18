import { CheckCookies_UiView } from "@/app_modules/check_cookies";
import { Event_Create } from "@/app_modules/event";
import { Event_getMasterTipeAcara } from "@/app_modules/event/fun/master/get_tipe_acara";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";
import _ from "lodash";

export default async function Page() {
  const userLoginId = await user_funGetOneUserId();
  if (!userLoginId) return <CheckCookies_UiView />;

  const listTipeAcara = await Event_getMasterTipeAcara();

  return (
    <Event_Create listTipeAcara={listTipeAcara as any} authorId={userLoginId} />
  );
}
