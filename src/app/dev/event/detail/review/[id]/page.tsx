import { Event_DetailReview } from "@/app_modules/event";
import { event_getOneById } from "@/app_modules/event/fun/get/get_one_by_id";


export default async function Page({params}: {params: {id: string}}) {
  let eventId = params.id
  const dataEvent = await event_getOneById(eventId)

  return <Event_DetailReview dataEvent={dataEvent as any}/>;
}