import { UserSearch_MainView } from "@/app_modules/user_search";
import { userSearch_getAllUser } from "@/app_modules/user_search/fun/get/get_all_user";

export default async function Page() {
  const listUser = await userSearch_getAllUser({ page: 1 });

  return <UserSearch_MainView listUser={listUser as any} />;
}
