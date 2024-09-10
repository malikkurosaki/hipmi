import { AdminDonasi_TableReview } from "@/app_modules/admin/donasi";
import adminDonasi_getListReview from "@/app_modules/admin/donasi/fun/get/get_list_review";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function Page() {
  const listReview = await adminDonasi_getListReview({page: 1});
  // console.log(listReview);
  return <AdminDonasi_TableReview listReview={listReview as any} />;
}
