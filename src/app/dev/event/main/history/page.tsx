import { Event_History } from "@/app_modules/event";

export default async function Page({ params }: { params: { id: string } }) {
  let eventId = params.id;
  console.log(eventId);
  return <Event_History />;
}
