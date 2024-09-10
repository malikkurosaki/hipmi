"use client";

import { Badge, Center, Stack } from "@mantine/core";
import ComponentVote_DaftarKontributorVoter from "../../component/detail/detail_daftar_kontributor";
import ComponentVote_DetailDataSetelahPublish from "../../component/detail/detail_data_setelah_publish";
import ComponentVote_HasilVoting from "../../component/detail/detail_hasil_voting";
import { MODEL_VOTE_KONTRIBUTOR, MODEL_VOTING } from "../../model/interface";

export default function Vote_DetailPublish({
  dataVote,
}: {
  dataVote: MODEL_VOTING;
}) {
  return (
    <>
      <Stack py={"md"}>
        <Center >
          <Badge color={dataVote?.isArsip ? "gray" : "green"}>
            {dataVote?.isArsip ? "Arsip" : "Publish"}
          </Badge>
        </Center>
        <ComponentVote_DetailDataSetelahPublish data={dataVote} />
        <ComponentVote_HasilVoting data={dataVote.Voting_DaftarNamaVote} />
      </Stack>
    </>
  );
}
