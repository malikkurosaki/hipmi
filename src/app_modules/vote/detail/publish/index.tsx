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
import ComponentVote_DetailDataSebelumPublish from "../../component/detail/detail_data_sebelum_publish";
import ComponentVote_DaftarKontributorVoter from "../../component/detail/detail_daftar_kontributor";
import ComponentVote_HasilVoting from "../../component/detail/detail_hasil_voting";
import moment from "moment";
import { MODEL_VOTE_KONTRIBUTOR, MODEL_VOTING } from "../../model/interface";
import ComponentVote_DetailDataSetelahPublish from "../../component/detail/detail_data_setelah_publish";

export default function Vote_DetailPublish({
  dataVote,
  listKontributor,
}: {
  dataVote: MODEL_VOTING;
  listKontributor: MODEL_VOTE_KONTRIBUTOR;
}) {
  return (
    <>
      <Stack py={"md"}>
        {/* <ComponentVote_DetailStatus /> */}
        <ComponentVote_DetailDataSetelahPublish data={dataVote} />
        <ComponentVote_HasilVoting data={dataVote.Voting_DaftarNamaVote} />
        <ComponentVote_DaftarKontributorVoter
          listKontributor={listKontributor as any}
        />
      </Stack>
    </>
  );
}

function TampilanDataVoting({ data }: { data: MODEL_VOTING }) {
  return (
    <>
      <Card shadow="lg" withBorder p={30}>
        <Card.Section px={"xs"}>
          <Stack spacing={"lg"}>
            <Center>
              <Title order={5}>{data.title}</Title>
            </Center>
            <Text>{data.deskripsi}</Text>
          </Stack>
        </Card.Section>
        <Card.Section py={"lg"}>
          <Stack spacing={0}>
            <Center>
              <Text fz={10} fw={"bold"}>
                Batas Voting
              </Text>
            </Center>
            <Badge>
              <Group>
                <Text>
                  {data.awalVote.toLocaleDateString(["id-ID"], {
                    dateStyle: "long",
                  })}
                </Text>
                <Text>-</Text>
                <Text>
                  {data.akhirVote.toLocaleDateString(["id-ID"], {
                    dateStyle: "long",
                  })}
                </Text>
              </Group>
            </Badge>
          </Stack>
        </Card.Section>
      </Card>
    </>
  );
}
