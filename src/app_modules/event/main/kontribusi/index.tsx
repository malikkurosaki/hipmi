"use client";

import {
  Avatar,
  Box,
  Card,
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

export default function Event_Kontribusi({
  listKontribusi,
}: {
  listKontribusi: MODEL_EVENT_PESERTA[];
}) {
  const router = useRouter();
  const [tabsKontribusi, setTabsKontribusi] = useState<string | any>("Panitia");
  const listTabs = [
    {
      id: 1,
      path: <Event_KontribusiPanitia />,
      value: "Panitia",
    },
    {
      id: 2,
      path: <Event_KontribusiPeserta />,
      value: "Peserta",
    },
  ];

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
            onClick={() => router.push(RouterEvent.detail_kontribusi + e.Event.id)}
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
              {e.Event.Event_Peserta.map((val) => (
               <Box key={val.id}>
                 <Avatar
                 size={"lg"}
                 radius={"xl"}
                 sx={{ borderStyle: "solid", borderWidth: "0.5px" }}
                 src={
                   RouterProfile.api_foto_profile + val.User.Profile.imagesId
                 }
               />
               </Box>
              ))}
              </Group>
            </Stack>
          </Card.Section>
        </Card>
      ))}
    </>
  );

  // return (
  //   <>
  //     <Tabs
  //       color="blue"
  //       variant="pills"
  //       radius="xl"
  //       defaultValue="Panitia"
  //       value={tabsKontribusi}
  //       onTabChange={setTabsKontribusi}
  //     >
  //       <Stack>
  //         <Tabs.List grow>
  //           {listTabs.map((e) => (
  //             <Tabs.Tab
  //               key={e.id}
  //               value={e.value}
  //               bg={tabsKontribusi === e.value ? "blue" : "gray.1"}
  //             >
  //               Sebagai {e.value}
  //             </Tabs.Tab>
  //           ))}
  //         </Tabs.List>
  //         {listTabs.map((e) => (
  //           <Tabs.Panel key={e.id} value={e.value}>
  //             {e.path}
  //           </Tabs.Panel>
  //         ))}
  //       </Stack>
  //     </Tabs>
  //   </>
  // );
}
