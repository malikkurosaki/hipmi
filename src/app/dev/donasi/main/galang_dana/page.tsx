import { PostingDonasi } from "@/app_modules/donasi";
import Donasi_getByStatus from "@/app_modules/donasi/fun/get/get_donasi_by_status";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";

export default async function Page() {
  const authorId = await User_getUserId();
  const listPublish = await Donasi_getByStatus(authorId, "1")
  const listReview = await Donasi_getByStatus(authorId, "2");
  const listDraft = await Donasi_getByStatus(authorId, "3");
  const listReject = await Donasi_getByStatus(authorId, "4")



  return (
    <>
      <PostingDonasi listPublish={listPublish} listReview={listReview} listDraft={listDraft} listReject={listReject} />
    </>
  );
}
