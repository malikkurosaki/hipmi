import { Event_Kontribusi } from "@/app_modules/event";
import { Event_getListKontibusiByUserId } from "@/app_modules/event/fun/get/get_list_kontribusi_by_user_id";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function Page() {
  const userLoginId = await user_getOneUserId();
  const listKontribusi = await Event_getListKontibusiByUserId(userLoginId)

  return (
    <>
      <Event_Kontribusi listKontribusi={listKontribusi as any}/>
    </>
  );
}
