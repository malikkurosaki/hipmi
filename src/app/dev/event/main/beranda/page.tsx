import { Event_Beranda } from "@/app_modules/event";
import { Event_getListAllPublish } from "@/app_modules/event/fun/get/get_list_all_publish";

export default async function Page() {
  const dataEvent = await Event_getListAllPublish();

  return (
    <>
      <Event_Beranda dataEvent={dataEvent as any} />
    </>
  );
}
