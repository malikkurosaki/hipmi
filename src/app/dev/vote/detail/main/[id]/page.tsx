import prisma from "@/app/lib/prisma";
import { Vote_MainDetail } from "@/app_modules/vote";
import { Vote_getHasilVoteById } from "@/app_modules/vote/fun/get/get_list_hasil_by_id";
import { Vote_cekKontributorById } from "@/app_modules/vote/fun/get/cek_kontributor_by_id";
import { Vote_getOnebyId } from "@/app_modules/vote/fun/get/get_one_by_id";
import { Vote_getOnePilihanVotingByUserId } from "@/app_modules/vote/fun/get/get_one_pilihan_voting_by_user_id";
import { Vote_getListKontributorById } from "@/app_modules/vote/fun/get/get_list_kontributor_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  const voteId = params.id;
  const dataVote = await Vote_getOnebyId(voteId);
  const hasilVoting = await Vote_getHasilVoteById(voteId as any);
  const isKontributor = await Vote_cekKontributorById(voteId);
  const pilihanKontributor = await Vote_getOnePilihanVotingByUserId(voteId);
  const listKontributor = await Vote_getListKontributorById(voteId);


  return (
    <>
      <Vote_MainDetail
        dataVote={dataVote as any}
        hasilVoting={hasilVoting}
        isKontributor={isKontributor}
        pilihanKontributor={pilihanKontributor as any}
        listKontributor={listKontributor as any}
      />
    </>
  );
}
