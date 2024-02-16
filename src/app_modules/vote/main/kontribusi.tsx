"use client";

import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import {
  Avatar,
  Badge,
  Box,
  Card,
  Center,
  Divider,
  Grid,
  Group,
  Radio,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import moment from "moment";
import { useRouter } from "next/navigation";
import ComponentVote_CardViewPublish from "../component/card_view_publish";
import { MODEL_VOTE_KONTRIBUTOR } from "../model/interface";

export default function Vote_Kontribusi({
  dataKontribusi,
}: {
  dataKontribusi: MODEL_VOTE_KONTRIBUTOR[];
}) {
  const router = useRouter();
  return (
    <>
      <Stack>
        {dataKontribusi.map((e, i) => (
          <Box key={i}>
            <ComponentVote_CardViewPublish
              path={RouterVote.detail_kontribusi}
              pilihanSaya={true}
              data={e.Voting}
              authorName={true}
              namaPilihan={e.Voting_DaftarNamaVote.value}
            />
          </Box>
        ))}
      </Stack>
      {/* <pre>{JSON.stringify(dataKontribusi, null, 2)}</pre> */}
    </>
  );
}
