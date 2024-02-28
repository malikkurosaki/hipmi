"use client";

import { Stack } from "@mantine/core";
import ComponentVote_DaftarKontributorVoter from "../../component/detail/detail_daftar_kontributor";
import ComponentVote_DetailDataSetelahPublish from "../../component/detail/detail_data_setelah_publish";
import ComponentVote_HasilVoting from "../../component/detail/detail_hasil_voting";
import { MODEL_VOTING } from "../../model/interface";

export default function Vote_DetailRiwayatSaya({
  dataVote,
  listKontributor,
}: {
  dataVote: MODEL_VOTING;
  listKontributor: any[];
}) {
  return (
    <>
      <Stack>
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
