import { AdminVote_TableReject } from "@/app_modules/admin/vote";
import { adminVote_funGetListReject } from "@/app_modules/admin/vote/fun";

export default async function Page() {
  const dataVote = await adminVote_funGetListReject({ page: 1 });
  return (
    <>
      <AdminVote_TableReject dataVote={dataVote as any} />
    </>
  );
}
