import { Event_Create } from "@/app_modules/event";
import { Event_getListUser } from "@/app_modules/event/fun/get/get_list_user";
import _ from "lodash";

export default async function Page() {
  const listUser = await Event_getListUser();

  return <Event_Create listUser={listUser as any} />;
}
