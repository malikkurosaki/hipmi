import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { Forum_Beranda } from "@/app_modules/forum";
import { forum_new_getAllPosting } from "@/app_modules/forum/fun/get/new_get_all_posting";

export default async function Page() {
  const userLoginId = await funGetUserIdByToken();
  const listForum = await forum_new_getAllPosting({ page: 1 });

  return (
    <>
      <Forum_Beranda
        listForum={listForum as any}
        userLoginId={userLoginId as string}
      />
    </>
  );
}
