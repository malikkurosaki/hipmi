"use client";

import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/_global/author_name_on_header";
import {
  MainColor,
  AccentColor,
} from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_CardLoadingOverlay from "@/app_modules/_global/loading_card";
import { Card, Grid, Center, Text } from "@mantine/core";
import { MODEL_JOB } from "../../model/interface";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ComponentJob_BerandaCardView({
  data,
}: {
  data: MODEL_JOB;
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [jobId, setJobId] = useState("");

  return (
    <>
      <Card
        mb={"md"}
        shadow="lg"
        p={30}
        radius={"md"}
        style={{
          backgroundColor: MainColor.darkblue,
          border: `2px solid ${AccentColor.blue}`,
        }}
      >
        <Card.Section style={{ zIndex: 99 }}>
          <ComponentGlobal_AuthorNameOnHeader
            authorName={data.Author.username}
            imagesId={data.Author.Profile.imagesId}
            profileId={data.Author.Profile.id}
            isPembatas={true}
          />
        </Card.Section>
        <Card.Section
          onClick={() => {
            visible ? "" : setJobId(data.id),
              setVisible(true),
              router.push(RouterJob.main_detail + data.id);
          }}
          mt={"lg"}
        >
          <Grid>
            <Grid.Col span={"auto"}>
              <Center h={"100%"}>
                <Text fw={"bold"} fz={"xl"} lineClamp={1} c={"white"}>
                  {data.title}
                </Text>
              </Center>
            </Grid.Col>
          </Grid>
        </Card.Section>
        {visible && data.id === jobId ? (
          <ComponentGlobal_CardLoadingOverlay />
        ) : (
          ""
        )}
      </Card>
    </>
  );
}
