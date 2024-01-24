"use client";

import { Avatar, Box, Card, Group, Stack, Tabs, Text } from "@mantine/core";
import { useState } from "react";
import Event_KontribusiPanitia from "./panitia";
import Event_KontribusiPeserta from "./peserta";
import moment from "moment";
import { useRouter } from "next/navigation";
import { RouterEvent } from "@/app/lib/router_hipmi/router_event";

export default function Event_Kontribusi() {
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
      {Array(5)
        .fill(0)
        .map((e, i) => (
          <Card
            key={i}
            shadow="sm"
            padding="md"
            radius="md"
            withBorder
            mb={"md"}
            onClick={() => router.push(RouterEvent.detail_kontribusi)}
          >
            {/* <Card.Section p={"xs"}>
                  <Skeleton visible={loading} h={200}></Skeleton>
                </Card.Section> */}

            <Stack>
              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>Nama Event</Text>
                <Text fz={"sm"}>{moment(new Date()).format("ll")}</Text>
              </Group>

              {/* <Text size="sm" color="dimmed" lineClamp={2}>
              Deskripsi: Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Nisi non ducimus voluptatibus vel, officiis assumenda
              explicabo reiciendis consequatur consequuntur expedita maiores
              fugit natus est rem sapiente iusto earum dicta labore.
            </Text> */}

              <Group position="apart">
                {Array(6)
                  .fill(0)
                  .map((e, i) => (
                    <Avatar key={i} bg="blue" radius={"xl"} />
                  ))}
              </Group>
            </Stack>
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
