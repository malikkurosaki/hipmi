import { Event_Edit } from "@/app_modules/event";
import { Event_getOneById } from "@/app_modules/event/fun/get/get_one_by_id";
import { Event_getMasterTipeAcara } from "@/app_modules/event/fun/master/get_tipe_acara";
import { MODEL_EVENT } from "@/app_modules/event/model/interface";
import _ from "lodash";

export default async function Page({ params }: { params: { id: string } }) {
  let eventId = params.id;
  const data = await Event_getOneById(eventId);
  const dataEvent = _.omit(data, [
    "Author",
    "EventMaster_Status",
    "Event_Peserta",
    "createdAt",
    "updatedAt",
    "active",
  ]);
  //   console.log(dataEvent)

  const listTipeAcara = await Event_getMasterTipeAcara()

  return (
    <>
      <Event_Edit dataEvent={dataEvent as any} listTipeAcara={listTipeAcara as any}/>
    </>
  );
}
