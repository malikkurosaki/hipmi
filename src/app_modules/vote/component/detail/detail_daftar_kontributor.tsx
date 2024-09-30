"use client";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import {
  Avatar,
  Badge,
  Card,
  Center,
  Divider,
  Grid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { MODEL_VOTE_KONTRIBUTOR } from "../../model/interface";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";

export default function ComponentVote_DaftarKontributorVoter({
  listKontributor,
}: {
  listKontributor?: MODEL_VOTE_KONTRIBUTOR[];
}) {
  const router = useRouter();
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
        <Card.Section>
          <Stack>
            <Center>
              <Title order={5}>Daftar Kontributor</Title>
            </Center>

            {_.isEmpty(listKontributor) ? (
              <ComponentGlobal_IsEmptyData
                height={20}
                text="Tidak ada kontributor"
              />
            ) : (
              <Stack>
                {listKontributor?.map((e, i) => (
                  <Stack spacing={"xs"} key={i}>
                    <Grid>
                      <Grid.Col
                        span={2}
                        onClick={() =>
                          router.push(
                            RouterProfile.katalogOLD + e.Author.Profile.id
                          )
                        }
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
