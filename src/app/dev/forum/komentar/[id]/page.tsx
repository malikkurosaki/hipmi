import { Forum_Komentar } from "@/app_modules/forum";
import { forum_getOnePostingById } from "@/app_modules/forum/fun/get/get_one_posting_by_id";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function Page({ params }: { params: { id: string } }) {
  let postingId = params.id;
  const dataPosting = await forum_getOnePostingById(postingId);
  const userLoginId = await user_funGetOneUserId()

  return (
    <>
      <Forum_Komentar
        dataPosting={dataPosting as any}
        userLoginId={userLoginId}
      />
    </>
  );
}
