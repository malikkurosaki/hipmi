"use client";

import { Stack } from "@mantine/core";
import ComponentVote_DetailDataTanpaVote from "../../component/detail/detail_data_tanpa_vote";
import ComponentVote_HasilVoting from "../../component/detail/detail_hasil_voting";
import ComponentVote_DaftarKontributorVoter from "../../component/detail/detail_daftar_kontributor";
import ComponentVote_DetailDataSetelahPublish from "../../component/detail/detail_data_setelah_publish";
import { MODEL_VOTE_KONTRIBUTOR, MODEL_VOTING } from "../../model/interface";

export default function Vote_DetailSemuaRiwayat({
  dataVote,
  listKontributor,
}: {
  dataVote: MODEL_VOTING;
  listKontributor: MODEL_VOTE_KONTRIBUTOR[];
}) {
  return (
    <>
      <Stack pb={"md"}>
        <ComponentVote_DetailDataSetelahPublish
          data={dataVote}
          authorName={true}
        />
        <ComponentVote_HasilVoting data={dataVote.Voting_DaftarNamaVote} />
        <ComponentVote_DaftarKontributorVoter
          listKontributor={listKontributor}
        />
      </Stack>
    </>
  );
}
