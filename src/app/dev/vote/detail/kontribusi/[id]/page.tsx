import { Vote_DetailKontribusi } from "@/app_modules/vote";
import { Vote_getListKontributorById } from "@/app_modules/vote/fun/get/get_list_kontributor_by_id";
import { Vote_getOnebyId } from "@/app_modules/vote/fun/get/get_one_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  let voteId = params.id;
  const dataVote = await Vote_getOnebyId(voteId)
  const listKontributor = await Vote_getListKontributorById(voteId)


  return (
    <>
      <Vote_DetailKontribusi
        dataVote={dataVote as any}
        listKontributor={listKontributor as any}
      />
    </>
  );
}
