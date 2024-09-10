import { Voting_UiDetailKontributorVoting } from "@/app_modules/vote/_ui";
import { Vote_getListKontributorById } from "@/app_modules/vote/fun/get/get_list_kontributor_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  const votingId = params.id;
  const listKontributor = await Vote_getListKontributorById(votingId);

  return (
    <>
      <Voting_UiDetailKontributorVoting listKontributor={listKontributor} />
    </>
  );
}
