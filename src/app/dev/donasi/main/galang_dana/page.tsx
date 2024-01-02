import { PostingDonasi } from "@/app_modules/donasi";
import Donasi_getByStatus from "@/app_modules/donasi/fun/get/get_donasi_by_status";
import { getToken_UserId } from "@/app_modules/fun/get_user_token";

export default async function Page() {
  const authorId = await getToken_UserId();
  const listReview = await Donasi_getByStatus(authorId, "2");
  const listDraft = await Donasi_getByStatus(authorId, "3");

//   console.log(listReview)

  return (
    <>
      <PostingDonasi listReview={listReview} listDraft={listDraft} />
    </>
  );
}
