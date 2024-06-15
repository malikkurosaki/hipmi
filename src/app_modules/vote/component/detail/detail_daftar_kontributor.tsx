"use client";
import {
  Card,
  Stack,
  Center,
  Title,
  Badge,
  Group,
  Radio,
  Grid,
  Text,
  Avatar,
  Divider,
  Box,
} from "@mantine/core";
import moment from "moment";
import { MODEL_VOTE_KONTRIBUTOR } from "../../model/interface";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import _ from "lodash";
import { useRouter } from "next/navigation";

export default function ComponentVote_DaftarKontributorVoter({
  listKontributor,
}: {
  listKontributor?: MODEL_VOTE_KONTRIBUTOR[];
}) {
  const router = useRouter()
  return (
    <>
      <Card shadow="lg" withBorder p={30}>
        <Card.Section>
          <Stack>
            <Center>
              <Title order={5}>Daftar Voting</Title>
            </Center>

            {_.isEmpty(listKontributor) ? (
              <Center>
                <Text fz={"xs"} fw={"bold"}>- Tidak ada voting -</Text>
              </Center>
            ) : (
              <Stack>
                {listKontributor?.map((e, i) => (
                  <Stack spacing={"xs"} key={i}>
                    <Grid>
                      <Grid.Col span={2}
                      onClick={() => router.push(RouterProfile.katalog + e.Author.Profile.id)}
                      >
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
                      <Grid.Col span={5}>
                        <Stack justify="center" h={"100%"}>
                          <Text truncate fz={"sm"} fw={"bold"}>
                            {e ? e.Author.Profile.name : "Nama author"}
                          </Text>
                        </Stack>
                      </Grid.Col>
                      <Grid.Col span={5}>
                        <Badge w={130}>
                          <Text
                            truncate
                            fz={
                              e.Voting_DaftarNamaVote.value.length > 10 ? 8 : 10
                            }
                          >
                            {e.Voting_DaftarNamaVote.value}
                          </Text>
                        </Badge>
                      </Grid.Col>
                    </Grid>
                    <Divider />
                  </Stack>
                ))}
              </Stack>
            )}
          </Stack>
        </Card.Section>
      </Card>
    </>
  );
}
