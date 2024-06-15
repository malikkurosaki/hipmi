import { Vote_DetailDraft } from "@/app_modules/vote";
import { Vote_getOnebyId } from "@/app_modules/vote/fun/get/get_one_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  const voteId = params.id;
  const dataVote = await Vote_getOnebyId(voteId);

  return (
    <>
      <Vote_DetailDraft dataVote={dataVote as any} />
    </>
  );
}
