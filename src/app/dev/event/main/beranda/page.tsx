import { Event_Beranda } from "@/app_modules/event";
import { event_getListAllPublish } from "@/app_modules/event/fun/get/get_list_all_publish";

export default async function Page() {
  const dataEvent = await event_getListAllPublish({ page: 1 });

  return (
    <>
      <Event_Beranda dataEvent={dataEvent as any} />
    </>
  );
}
