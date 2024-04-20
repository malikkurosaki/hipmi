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
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { IconCirclePlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { MODEL_JOB } from "../model/interface";
import ComponentJob_DetailData from "../component/detail/detail_data";
import ComponentJob_CardViewStatus from "../component/card_view_status";
import _ from "lodash";
import ComponentJob_IsEmptyData from "../component/is_empty_data";

export default function Job_Beranda({ listJob }: { listJob: MODEL_JOB[] }) {
  const router = useRouter();
  return (
    <>
      <Affix position={{ bottom: rem(150), right: rem(30) }}>
        <ActionIcon
          size={"xl"}
          radius={"xl"}
          variant="transparent"
          bg={"blue"}
          onClick={() => {
            router.push(RouterJob.create);
          }}
        >
          <IconCirclePlus color="white" size={40} />
        </ActionIcon>
      </Affix>

      {_.isEmpty(listJob) ? (
        <ComponentJob_IsEmptyData text="Data tidak ada" />
      ) : (
        <Stack>
          {listJob.map((e, i) => (
            <Card key={i} shadow="lg" withBorder p={30} radius={"md"}>
              <Card.Section>
                <ComponentGlobal_AuthorNameOnHeader
                  authorName={e.Author.Profile.name}
                  imagesId={e.Author.Profile.imagesId}
                  profileId={e.Author.Profile.id}
                />
              </Card.Section>
              <Card.Section
                onClick={() => router.push(RouterJob.main_detail + e.id)}
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
            </Card>
          ))}
        </Stack>
      )}
    </>
  );
}
