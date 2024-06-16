"use client";

import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/component_global/author_name_on_header";
import ComponentGlobal_HeaderTamplate from "@/app_modules/component_global/header_tamplate";
import {
  ActionIcon,
  Affix,
  Card,
  Center,
  Grid,
  Image,
  Loader,
  Overlay,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { IconCirclePlus, IconPencilPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { MODEL_JOB } from "../model/interface";
import ComponentJob_DetailData from "../component/detail/detail_data";
import ComponentJob_CardViewStatus from "../component/card_view_status";
import _ from "lodash";
import ComponentJob_IsEmptyData from "../component/is_empty_data";
import { useState } from "react";
import { useShallowEffect, useWindowScroll } from "@mantine/hooks";
import ComponentGlobal_CardLoadingOverlay from "@/app_modules/component_global/loading_card";
import { Job_getAllListPublish } from "../fun/get/get_list_all_publish";

export default function Job_Beranda({ listJob }: { listJob: MODEL_JOB[] }) {
  const router = useRouter();

  const [data, setData] = useState(listJob);
  const [isLoading, setLoading] = useState(false);
  const [scroll, scrollTo] = useWindowScroll();
  const [visible, setVisible] = useState(false);
  const [jobId, setJobId] = useState("");

  useShallowEffect(() => {
    onLoad({
      setData(val) {
        setData(val);
      },
    });
  }, [setData]);

  async function onLoad({ setData }: { setData: (val: any) => void }) {
    const loadData = await Job_getAllListPublish();
    setData(loadData);
  }

  return (
    <>
      <Affix position={{ bottom: rem(150), right: rem(30) }}>
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
            router.push(RouterJob.create);
          }}
        >
          <IconPencilPlus color="white" />
        </ActionIcon>
      </Affix>

      {_.isEmpty(data) ? (
        <ComponentJob_IsEmptyData text="Data tidak ada" />
      ) : (
        <Stack>
          {data.map((e, i) => (
            <Card key={i} shadow="lg" withBorder p={30} radius={"md"}>
              <Card.Section style={{ zIndex: 99 }}>
                <ComponentGlobal_AuthorNameOnHeader
                  authorName={e.Author.Profile.name}
                  imagesId={e.Author.Profile.imagesId}
                  profileId={e.Author.Profile.id}
                  isPembatas={true}
                />
              </Card.Section>
              <Card.Section
                onClick={() => {
                  visible ? "" : setJobId(e.id),
                    setVisible(true),
                    router.push(RouterJob.main_detail + e.id);
                }}
                mt={"lg"}
              >
                <Grid>
                  <Grid.Col span={"auto"}>
                    <Center h={"100%"}>
                      <Text fw={"bold"} fz={"xl"} lineClamp={1}>
                        {e.title}
                      </Text>
                    </Center>
                  </Grid.Col>
                </Grid>
              </Card.Section>
              {visible && e.id === jobId ? (
                <ComponentGlobal_CardLoadingOverlay />
              ) : (
                ""
              )}
            </Card>
          ))}
        </Stack>
      )}
    </>
  );
}
