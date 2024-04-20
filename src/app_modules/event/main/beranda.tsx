"use client";

import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import {
  ActionIcon,
  Affix,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Divider,
  Grid,
  Group,
  Image,
  Paper,
  Skeleton,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_EVENT } from "../model/interface";
import ComponentEvent_BoxListStatus from "../component/box_list_status";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/component_global/author_name_on_header";
import _ from "lodash";
import { IconCirclePlus } from "@tabler/icons-react";

export default function Event_Beranda({
  dataEvent,
}: {
  dataEvent: MODEL_EVENT[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // if (_.isEmpty(dataEvent))
  //   return (
  //     <Center h={"80vh"}>
  //       <Text fw={"bold"} fz={"sm"}>
  //         Tidak Ada Event
  //       </Text>
  //     </Center>
  //   );
  return (
    <>
      <Affix position={{ bottom: rem(150), right: rem(30) }}>
        <ActionIcon
          loading={loading ? true : false}
          size={"xl"}
          radius={"xl"}
          variant="transparent"
          bg={"blue"}
          onClick={() => {
            setLoading(true);
            router.push(RouterEvent.create);
          }}
        >
          <IconCirclePlus color="white" size={40} />
        </ActionIcon>
      </Affix>

      {_.isEmpty(dataEvent) ? (
        <Center h={"80vh"}>
          <Text fw={"bold"} fz={"sm"}>
            Tidak Ada Event
          </Text>
        </Center>
      ) : (
        <Box>
          {dataEvent.map((e, i) => (
            <Card key={e.id} shadow="lg" radius={"md"} withBorder mb={"sm"}>
              <Card.Section px={"sm"} pt={"sm"}>
                <ComponentGlobal_AuthorNameOnHeader
                  profileId={e.Author.Profile.id}
                  imagesId={e.Author.Profile.imagesId}
                  authorName={e.Author.Profile.name}
                />
              </Card.Section>
              <Card.Section
                p={"sm"}
                onClick={() => router.push(RouterEvent.detail_main + e.id)}
              >
                <Stack>
                  <Grid>
                    <Grid.Col span={8}>
                      <Title order={6} truncate>
                        {e.title}
                      </Title>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Text fz={"sm"} truncate>
                        {moment(e.tanggal).format("ll")}
                      </Text>
                    </Grid.Col>
                  </Grid>

                  <Text fz={"sm"} lineClamp={2}>
                    {e.deskripsi}
                  </Text>
                </Stack>
              </Card.Section>
            </Card>
          ))}
        </Box>
      )}
    </>
  );
}
