"use client";

import {
  Avatar,
  Box,
  Card,
  Center,
  Flex,
  Grid,
  Group,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { useState } from "react";
import Event_KontribusiPanitia from "./panitia";
import Event_KontribusiPeserta from "./peserta";
import moment from "moment";
import { useRouter } from "next/navigation";
import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import { MODEL_EVENT_PESERTA } from "../../model/interface";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/component_global/author_name_on_header";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import _ from "lodash";
import ComponentGlobal_CardLoadingOverlay from "@/app_modules/component_global/loading_card";

export default function Event_Kontribusi({
  listKontribusi,
}: {
  listKontribusi: MODEL_EVENT_PESERTA[];
}) {
  const router = useRouter();
  const [eventId, setEventId] = useState("");
  const [visible, setVisible] = useState(false);

  if (_.isEmpty(listKontribusi))
    return (
      <Center h={"80vh"}>
        <Text fw={"bold"} fz={"sm"}>
          Tidak Ada Kontribusi
        </Text>
      </Center>
    );

  return (
    <>
      {/* <pre>{JSON.stringify(listKontribusi, null,2)}</pre> */}
      {listKontribusi.map((e, i) => (
        <Card key={e.id} shadow="lg" radius={"md"} withBorder mb={"sm"}>
          <Card.Section px={"sm"} pt={"sm"}>
            <ComponentGlobal_AuthorNameOnHeader
              profileId={e.Event.Author.Profile.id}
              imagesId={e.Event.Author.Profile.imagesId}
              authorName={e.Event.Author.Profile.name}
            />
          </Card.Section>
          <Card.Section
            p={"sm"}
            onClick={() => {
              setEventId(e?.id), setVisible(true);
              router.push(RouterEvent.detail_kontribusi + e.Event.id);
            }}
          >
            <Stack>
              <Grid>
                <Grid.Col span={8}>
                  <Title order={6} truncate>
                    {e.Event.title}
                  </Title>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text fz={"sm"} truncate>
                    {moment(e.Event.tanggal).format("ll")}
                  </Text>
                </Grid.Col>
              </Grid>

              {/* <Text fz={"sm"} lineClamp={2}>
                {e.Event.deskripsi}
              </Text> */}

              <Group position="center">
                {e.Event.Event_Peserta.map((val, i) => (
                  <Box key={i}>
                    <Avatar
                      size={"lg"}
                      radius={"xl"}
                      sx={{ borderStyle: "solid", borderWidth: "0.5px" }}
                      src={
                        RouterProfile.api_foto_profile +
                        val?.User?.Profile?.imagesId
                      }
                    />
                  </Box>
                ))}
              </Group>
            </Stack>
          </Card.Section>
          {visible && eventId === e?.id ? (
            <ComponentGlobal_CardLoadingOverlay />
          ) : (
            ""
          )}
        </Card>
      ))}
    </>
  );
}
