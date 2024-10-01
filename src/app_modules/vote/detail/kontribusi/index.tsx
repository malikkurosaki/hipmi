"use client";

import {
  Stack
} from "@mantine/core";
import ComponentVote_DetailDataSetelahPublish from "../../component/detail/detail_data_setelah_publish";
import ComponentVote_HasilVoting from "../../component/detail/detail_hasil_voting";
import { MODEL_VOTING } from "../../model/interface";

export default function Vote_DetailKontribusi({
  dataVote,
}: {
  dataVote: MODEL_VOTING;
}) {
  return (
    <>
      <Stack py={"md"}>
        <ComponentVote_DetailDataSetelahPublish
          data={dataVote}
          authorName={true}
        />
        <ComponentVote_HasilVoting data={dataVote.Voting_DaftarNamaVote} />
      </Stack>
    </>
  );
}
