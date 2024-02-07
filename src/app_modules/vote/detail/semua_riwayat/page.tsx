"use client";

import { Stack } from "@mantine/core";
import ComponentVote_DetailDataTanpaVote from "../../component/detail/detail_data_tanpa_vote";
import ComponentVote_HasilVoting from "../../component/detail/hasil_voting";
import ComponentVote_DaftarVoter from "../../component/detail/daftar_voter";

export default function Vote_DetailSemuaRiwayat() {
  return (
    <>
      <Stack>
        <ComponentVote_DetailDataTanpaVote />
        <ComponentVote_HasilVoting/>
        <ComponentVote_DaftarVoter/>
      </Stack>
    </>
  );
}
