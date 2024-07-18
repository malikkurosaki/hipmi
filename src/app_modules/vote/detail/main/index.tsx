"use client";

import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/_global/author_name_on_header";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import {
  Avatar,
  Badge,
  Box,
  Button,
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
import _ from "lodash";
import { useState } from "react";
import ComponentVote_DaftarKontributorVoter from "../../component/detail/detail_daftar_kontributor";
import ComponentVote_HasilVoting from "../../component/detail/detail_hasil_voting";
import { Vote_funCreateHasil } from "../../fun/create/create_hasil";
import { Vote_getOnebyId } from "../../fun/get/get_one_by_id";
import {
  MODEL_VOTE_KONTRIBUTOR,
  MODEL_VOTING,
  MODEL_VOTING_DAFTAR_NAMA_VOTE,
} from "../../model/interface";
import { AccentColor, MainColor } from "@/app_modules/_global/color/color_pallet";

export default function Vote_MainDetail({
  dataVote,
  hasilVoting,
  isKontributor,
  pilihanKontributor,
  listKontributor,
}: {
  dataVote: MODEL_VOTING;
  hasilVoting: any;
  isKontributor: boolean;
  pilihanKontributor: string;
  listKontributor: any[];
}) {
  const [data, setData] = useState(dataVote);
  return (
    <>
      <Stack py={"md"}>
        <TampilanDataVoting
          dataVote={data}
          setData={setData}
          isKontributor={isKontributor}
          pilihanKontributor={pilihanKontributor}
        />
        <ComponentVote_HasilVoting data={data.Voting_DaftarNamaVote} />
        <ComponentVote_DaftarKontributorVoter
          listKontributor={listKontributor}
        />
      </Stack>
    </>
  );
}

function TampilanDataVoting({
  dataVote,
  setData,
  isKontributor,
  pilihanKontributor,
}: {
  dataVote?: MODEL_VOTING;
  setData: any;
  isKontributor: boolean;
  pilihanKontributor: any;
}) {
  const [votingNameId, setVotingNameId] = useState("");
  return (
    <>
      <Card
        p={30}
        style={{
          backgroundColor: AccentColor.darkblue,
          borderRadius: "10px",
          border: `2px solid ${AccentColor.blue}`,
          color: "white",
        }}
      >
        <Card.Section mb={"md"}>
          <ComponentGlobal_AuthorNameOnHeader
            authorName={dataVote?.Author.Profile.name}
            imagesId={dataVote?.Author.Profile.imagesId}
            profileId={dataVote?.Author.Profile.id}
          />
        </Card.Section>
        <Card.Section px={"xs"} py={"sm"}>
          <Stack spacing={"lg"}>
            <Center>
              <Title order={5} align="center">
                {dataVote?.title}
              </Title>
            </Center>
            <Text>{dataVote?.deskripsi}</Text>

            <Stack spacing={0}>
              <Stack align="center" spacing={"xs"}>
                <Text fz={10} fw={"bold"}>
                  Batas Voting
                </Text>

                <Badge
                  styles={{
                    root: {
                      backgroundColor: AccentColor.blue,
                      border: `1px solid ${AccentColor.skyblue}`,
                      color: "white",
                      width: "80%",
                    },
                  }}
                >
                  <Group>
                    <Text>
                      {dataVote?.awalVote.toLocaleDateString(["id-ID"], {
                        dateStyle: "medium",
                      })}
                    </Text>
                    <Text>-</Text>
                    <Text>
                      {dataVote?.akhirVote.toLocaleDateString(["id-ID"], {
                        dateStyle: "medium",
                      })}
                    </Text>
                  </Group>
                </Badge>
              </Stack>
            </Stack>
          </Stack>
        </Card.Section>

        {/* Voting View */}
        <Card.Section py={"xl"}>
          {isKontributor ? (
            <Stack
              align="center"
              spacing={0}
              style={{
                color: "white",
              }}
            >
              <Text mb={"sm"} fw={"bold"} fz={"xs"}>
                Pilihan anda:
              </Text>
              <Badge size="lg">
                {pilihanKontributor.Voting_DaftarNamaVote.value}
              </Badge>
            </Stack>
          ) : (
            <Stack
              spacing={"xl"}
              style={{
                color: "white",
              }}
            >
              <Radio.Group
                styles={{
                  label: {
                    color: "white",
                  },
                }}
                value={votingNameId}
                onChange={(val) => {
                  setVotingNameId(val);
                }}
                label={
                  <Text mb={"sm"} fw={"bold"} fz={"xs"}>
                    Pilihan :
                  </Text>
                }
              >
                <Stack px={"md"}>
                  {dataVote?.Voting_DaftarNamaVote.map((v) => (
                    <Box key={v.id}>
                      <Radio
                      color="yellow"
                        styles={{ label: { color: "white" } }}
                        label={v.value}
                        value={v.id}
                      />
                    </Box>
                  ))}
                </Stack>
              </Radio.Group>
              <Center>
                {_.isEmpty(votingNameId) ? (
                  <Button radius={"xl"} disabled>
                    Vote
                  </Button>
                ) : (
                  <Button
                    radius={"xl"}
                    onClick={() =>
                      onVote(votingNameId, dataVote?.id as any, setData)
                    }
                    bg={MainColor.yellow}
                    color="yellow"
                    c={"black"}
                  >
                    Vote
                  </Button>
                )}
              </Center>
            </Stack>
          )}
        </Card.Section>
      </Card>
    </>
  );
}

async function onVote(pilihanVotingId: string, voteId: string, setData: any) {
  await Vote_funCreateHasil(pilihanVotingId, voteId).then(async (res) => {
    if (res.status === 201) {
      await Vote_getOnebyId(voteId).then((val) => {
        setData(val);
        ComponentGlobal_NotifikasiBerhasil(res.message);
      });
    } else {
      ComponentGlobal_NotifikasiPeringatan(res.message);
    }
  });
}

function TampilanHasil({
  data,
  hasil,
}: {
  data: MODEL_VOTING_DAFTAR_NAMA_VOTE[];
  hasil: any;
}) {
  return (
    <>
      <Card shadow="lg" withBorder p={30}>
        <Card.Section>
          <Stack>
            <Center>
              <Title order={5}>Hasil Voting</Title>
            </Center>

            {/* <pre>{JSON.stringify(data, null,2)}</pre> */}

            <Grid justify="center">
              {data.map((e) => (
                <Grid.Col key={e.id} span={data.length >= 4 ? 6 : 4}>
                  <Stack align="center">
                    <Avatar
                      radius={100}
                      size={70}
                      variant="outline"
                      color="blue"
                    >
                      <Text>
                        {e.jumlah}
                        {/* {hasil.filter((i: any) => i.idDaftarNama == "clsijw6ur0002x5loqsq6g4id")} */}
                      </Text>
                    </Avatar>
                    <Text>{e.value}</Text>
                  </Stack>
                </Grid.Col>
              ))}
            </Grid>
          </Stack>
        </Card.Section>
      </Card>
    </>
  );
}

function TampilanListKontributor({
  lisKontributor,
}: {
  lisKontributor: MODEL_VOTE_KONTRIBUTOR[];
}) {
  return (
    <>
      <Card shadow="lg" withBorder p={30}>
        <Card.Section>
          <Stack>
            <Center>
              <Title order={5}>Daftar Voting</Title>
            </Center>
            {lisKontributor.map((e, i) => (
              <Stack spacing={"xs"} key={i}>
                <Grid>
                  <Grid.Col span={2}>
                    <Avatar
                      size={30}
                      sx={{ borderStyle: "solid", borderWidth: "0.5px" }}
                      radius={"xl"}
                      bg={"gray.1"}
                      src={
                        e
                          ? RouterProfile.api_foto_profile +
                            e.Author.Profile.imagesId
                          : "/aset/global/avatar.png"
                      }
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Stack justify="center" h={"100%"}>
                      <Text truncate fz={"sm"} fw={"bold"}>
                        {e ? e.Author.Profile.name : "Nama author"}
                      </Text>
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Badge w={100}>
                      <Text truncate>{e.Voting_DaftarNamaVote.value}</Text>
                    </Badge>
                  </Grid.Col>
                </Grid>
                <Divider />
              </Stack>
            ))}
            {/* {lisKontributor.map((e) => (
              <Stack key={e.id}>
                <Group position="apart">
                  <Group>
                    <Avatar
                      size={30}
                      sx={{ borderStyle: "solid", borderWidth: "0.5px" }}
                      radius={"xl"}
                      bg={"gray.1"}
                      src={
                        e
                          ? RouterProfile.api_foto_profile +
                            e.Author.Profile.imagesId
                          : "/aset/global/avatar.png"
                      }
                    />
                    <Text truncate fz={"sm"} fw={"bold"}>
                      {e ? e.Author.Profile.name : "Nama author"}
                    </Text>
                  </Group>
                  <Badge>
                    <Text truncate>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum minus libero, ullam ipsum quasi labore iure doloremque sunt et mollitia dolorem laborum quisquam, dolores quis deserunt id. Ipsa, minus temporibus.</Text>
                  </Badge>
                </Group>
                <Divider />
              </Stack>
            ))} */}
          </Stack>
        </Card.Section>
      </Card>
      {/* <pre>{JSON.stringify(lisKontributor, null, 2)}</pre> */}
    </>
  );
}
