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
import { useWindowScroll } from "@mantine/hooks";

export default function Job_Beranda({ listJob }: { listJob: MODEL_JOB[] }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [scroll, scrollTo] = useWindowScroll();
  const [visible, setVisible] = useState(false);
  const [jobId, setJobId] = useState("");

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

      {_.isEmpty(listJob) ? (
        <ComponentJob_IsEmptyData text="Data tidak ada" />
      ) : (
        <Stack>
          {listJob.map((e, i) => (
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
                  setVisible(true);
                  setJobId(e.id);
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
                <Overlay h={"100%"} opacity={0.1}>
                  <Center h={"100%"}>
                    <Loader color="gray" />
                  </Center>
                </Overlay>
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
