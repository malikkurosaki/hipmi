import { Event_Kontribusi } from "@/app_modules/event";
import { event_getListKontibusiByUserId } from "@/app_modules/event/fun/get/get_list_kontribusi_by_user_id";

export default async function Page() {
  const listKontribusi = await event_getListKontibusiByUserId({page: 1})

  return (
    <>
      <Event_Kontribusi listKontribusi={listKontribusi as any}/>
    </>
  );
}
