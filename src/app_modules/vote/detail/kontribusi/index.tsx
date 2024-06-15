"use client";

import {
  Badge,
  Card,
  Center,
  Grid,
  Group,
  Radio,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import moment from "moment";
import ComponentVote_HasilVoting from "../../component/detail/detail_hasil_voting";
import ComponentVote_DaftarKontributorVoter from "../../component/detail/detail_daftar_kontributor";
import { MODEL_VOTING } from "../../model/interface";
import ComponentVote_DetailDataSetelahPublish from "../../component/detail/detail_data_setelah_publish";

export default function Vote_DetailKontribusi({
  dataVote,
  listKontributor,
}: {
  dataVote: MODEL_VOTING;
  listKontributor: any
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


