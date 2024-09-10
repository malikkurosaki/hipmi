"use client";

import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/_global/author_name_on_header";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import notifikasiToUser_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_user";
import {
  Badge,
  Box,
  Button,
  Card,
  Center,
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
import { voting_funGetOneVotingbyId } from "../../fun/get/fun_get_one_by_id";
import { MODEL_VOTING } from "../../model/interface";
import mqtt_client from "@/util/mqtt_client";
import moment from "moment";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";

export default function Vote_MainDetail({
  dataVote,
  hasilVoting,
  isKontributor,
  pilihanKontributor,
  listKontributor,
  userLoginId,
}: {
  dataVote: MODEL_VOTING;
  hasilVoting: any;
  isKontributor: boolean;
  pilihanKontributor: string;
  listKontributor: any[];
  userLoginId: string;
}) {
  const [data, setData] = useState(dataVote);
  const today = new Date();

  return (
    <>
      <Stack py={"md"}>
        {moment(dataVote?.awalVote).diff(today, "hours") < 0 ? (
          ""
        ) : (
          <ComponentGlobal_BoxInformation informasi="Untuk sementara voting ini belum di buka. Voting akan dimulai sesuai dengan tanggal awal pemilihan, dan akan ditutup sesuai dengan tanggal akhir pemilihan." />
        )}
        <TampilanDataVoting
          dataVote={data}
          setData={setData}
          isKontributor={isKontributor}
          pilihanKontributor={pilihanKontributor}
          userLoginId={userLoginId}
        />
        <ComponentVote_HasilVoting data={data.Voting_DaftarNamaVote} />
      </Stack>
    </>
  );
}

function TampilanDataVoting({
  dataVote,
  setData,
  isKontributor,
  pilihanKontributor,
  userLoginId,
}: {
  dataVote?: MODEL_VOTING;
  setData: any;
  isKontributor: boolean;
  pilihanKontributor: any;
  userLoginId: string;
}) {
  const [votingNameId, setVotingNameId] = useState("");
  const today = new Date();

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
                        disabled={
                          moment(dataVote?.awalVote).diff(today, "hours") < 0
                            ? false
                            : true
                        }
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
                      onVote(
                        votingNameId,
                        dataVote?.id as any,
                        setData,
                        userLoginId
                      )
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

async function onVote(
  pilihanVotingId: string,
  voteId: string,
  setData: any,
  userLoginId: string
) {
  const res = await Vote_funCreateHasil(pilihanVotingId, voteId);
  if (res.status === 201) {
    await voting_funGetOneVotingbyId(voteId).then((val) => {
      setData(val);
      ComponentGlobal_NotifikasiBerhasil(res.message);
    });

    if (userLoginId !== res?.data?.Voting?.authorId) {
      const dataNotif = {
        appId: res?.data?.Voting?.id,
        userId: res?.data?.Voting?.authorId,
        pesan: res?.pilihan,
        status: "Voting Masuk",
        kategoriApp: "VOTING",
        title: "User lain telah melakukan voting !",
      };

      const createNotifikasi = await notifikasiToUser_funCreate({
        data: dataNotif as any,
      });

      if (createNotifikasi.status === 201) {
        mqtt_client.publish(
          "USER",
          JSON.stringify({
            userId: dataNotif.userId,
            count: 1,
          })
        );
      }
    }
  } else {
    ComponentGlobal_NotifikasiPeringatan(res.message);
  }
}
