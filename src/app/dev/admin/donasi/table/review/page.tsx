import { AdminDonasi_TableReview } from "@/app_modules/admin/donasi";
import { AdminDonasi_getByStatus } from "@/app_modules/admin/donasi/fun/get/get_donasi_by_status";
import { getToken_UserId } from "@/app_modules/fun/get_user_token";

export default async function Page() {
  const listReview = await AdminDonasi_getByStatus("2");
  // console.log(listReview);
  return <AdminDonasi_TableReview listReview={listReview as any} />;
}
