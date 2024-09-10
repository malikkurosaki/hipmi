import { AdminVote_TableReview } from "@/app_modules/admin/vote";
import { adminVote_funGetListReview } from "@/app_modules/admin/vote/fun";

export default async function Page() {
  const listVote = await adminVote_funGetListReview({ page: 1 });

  return (
    <>
      <AdminVote_TableReview listVote={listVote as any} />
    </>
  );
}
