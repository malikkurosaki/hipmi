import { Vote_DetailKontribusi } from "@/app_modules/vote";
import { voting_funGetOneVotingbyId } from "@/app_modules/vote/fun/get/fun_get_one_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  let voteId = params.id;
  const dataVote = await voting_funGetOneVotingbyId(voteId);

  return (
    <>
      <Vote_DetailKontribusi dataVote={dataVote as any} />
    </>
  );
}
