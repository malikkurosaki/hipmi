"use client";

import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/component_global/author_name_on_header";
import { Stack, Card, Grid, Image, Text } from "@mantine/core";
import ComponentJob_CardViewStatus from "../../component/card_view_status";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import ComponentJob_CardPreview from "../../component/card_preview";
import { Job_getListStatusByStatusId } from "../../fun/get/get_list_status_by_status_id";

export default function Job_Publish({ listPublish }: { listPublish : any}) {
  return (
    <>
      <ComponentJob_CardViewStatus
        listData={listPublish}
        path={RouterJob.detail_publish}
      />
      {/* <Stack>
        {Array(2)
          .fill(0)
          .map((e, i) => (
            <Card key={i} shadow="lg" withBorder radius={"md"}>
              <Card.Section>
                <Grid>
                  <Grid.Col span={6}>
                    <Image alt="foto" src={"/aset/no-file.png"} />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Stack justify="center" h={"100%"}>
                      <Text fw={"bold"} fz={20} truncate>
                        Judul Lowongan Kerja
                      </Text>
                      <Text lineClamp={3}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Laboriosam est id neque iste voluptatem
                        consequuntur veritatis dolorem illo et, repellat
                        praesentium maiores amet omnis voluptas aliquid tenetur
                        nam sint obcaecati.
                      </Text>
                    </Stack>
                  </Grid.Col>
                </Grid>
              </Card.Section>
            </Card>
          ))}
      </Stack> */}
    </>
  );
}
