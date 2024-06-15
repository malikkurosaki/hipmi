import { Vote_Edit } from "@/app_modules/vote";
import { Vote_getListDaftarNamaById } from "@/app_modules/vote/fun/get/get_list_daftar_vote_by_id";
import { Vote_getOnebyId } from "@/app_modules/vote/fun/get/get_one_by_id";
import _ from "lodash";

export default async function Page({ params }: { params: { id: string } }) {
  let voteId = params.id;
  const dataVote = await Vote_getOnebyId(voteId);
  const data = _.omit(dataVote, ["Voting_DaftarNamaVote"]);
  const listDaftarVote = await Vote_getListDaftarNamaById(voteId);

  return (
    <>
      <Vote_Edit
        dataVote={data as any}
        listDaftarVote={listDaftarVote as any}
      />
    </>
  );
}
