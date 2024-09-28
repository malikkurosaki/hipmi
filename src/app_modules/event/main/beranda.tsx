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
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/_global/author_name_on_header";
import _ from "lodash";
import { IconCirclePlus, IconPencilPlus } from "@tabler/icons-react";
import ComponentEvent_IsEmptyData from "../component/is_empty_data";
import { useShallowEffect, useWindowScroll } from "@mantine/hooks";
import ComponentGlobal_CardLoadingOverlay from "@/app_modules/_global/loading_card";
import { Event_getListAllPublish } from "../fun/get/get_list_all_publish";

export default function Event_Beranda({
  dataEvent,
}: {
  dataEvent: MODEL_EVENT[];
}) {
  const router = useRouter();
  const [data, setData] = useState(dataEvent);
  const [isLoading, setLoading] = useState(false);
  const [scroll, scrollTo] = useWindowScroll();
  const [eventId, setEventId] = useState("");
  const [visible, setVisible] = useState(false);

  useShallowEffect(() => {
    onLoad({
      onPublish(val) {
        setData(val);
      },
    });
  }, [setData]);

  async function onLoad({ onPublish }: { onPublish: (val: any) => void }) {
    const loadData = await Event_getListAllPublish();
    onPublish(loadData);
  }

  return (
    <>
      <Affix position={{ bottom: rem(150), right: rem(30) }} zIndex={99}>
        <ActionIcon
          loading={isLoading ? true : false}
          opacity={scroll.y > 0 ? 0.5 : ""}
          style={{
            transition: "0.5s",
          }}
          size={"xl"}
          radius={"xl"}
          variant="transparent"
          bg={"blue"}
          onClick={() => {
            setLoading(true);
            router.push(RouterEvent.create);
          }}
        >
          <IconPencilPlus color="white" />
        </ActionIcon>
      </Affix>
      {_.isEmpty(data) ? (
        <ComponentEvent_IsEmptyData text="Tidak ada data" />
      ) : (
        data.map((e, i) => (
          <Card key={i} shadow="lg" radius={"md"} withBorder mb={"sm"}>
            <Card.Section px={"sm"} pt={"sm"}>
              <ComponentGlobal_AuthorNameOnHeader
                profileId={e?.Author?.Profile?.id}
                imagesId={e?.Author?.Profile?.imagesId}
                authorName={e?.Author?.Profile?.name}
                isPembatas={true}
              />
            </Card.Section>
            <Card.Section
              p={"sm"}
              onClick={() => {
                setEventId(e?.id);
                setVisible(true);
                router.push(RouterEvent.detail_main + e?.id);
              }}
            >
              <Stack>
                <Grid>
                  <Grid.Col span={8}>
                    <Title order={6} truncate>
                      {e?.title}
                    </Title>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Text fz={"sm"} truncate>
                      {moment(e?.tanggal).format("ll")}
                    </Text>
                  </Grid.Col>
                </Grid>

                <Text fz={"sm"} lineClamp={2}>
                  {e?.deskripsi}
                </Text>
              </Stack>
            </Card.Section>
            {visible && e?.id === eventId ? (
              <ComponentGlobal_CardLoadingOverlay />
            ) : (
              ""
            )}
          </Card>
        ))
      )}
    </>
  );
}
