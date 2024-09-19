import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { Forum_Komentar } from "@/app_modules/forum";
import { forum_getOnePostingById } from "@/app_modules/forum/fun/get/get_one_posting_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  let postingId = params.id;
  const dataPosting = await forum_getOnePostingById(postingId);
   const userLoginId = await funGetUserIdByToken();


  return (
    <>
      <Forum_Komentar
        dataPosting={dataPosting as any}
        userLoginId={userLoginId}
      />
    </>
  );
}
