import { UserSearch_MainView } from "@/app_modules/user_search";
import { UserSearch_getListUser } from "@/app_modules/user_search/fun/get/get_list_user";

export default async function Page() {
  const listUser = await UserSearch_getListUser({ name: "" });

  return <UserSearch_MainView listUser={listUser as any} />;
}
