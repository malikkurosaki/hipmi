"use client";

import { Skeleton, Stack, Text, Title } from "@mantine/core";
import { Suspense, useState } from "react";
import { MODEL_MAP } from "../lib/interface";
import { useShallowEffect } from "@mantine/hooks";
import { map_funGetOneById } from "../fun/get/fun_get_one_by_id";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/_global/author_name_on_header";

export function ComponentMap_DetailData({ mapId }: { mapId: string }) {
  const [data, setData] = useState<MODEL_MAP>();

  useShallowEffect(() => {
    onLoadData(mapId);
  }, [mapId]);

  async function onLoadData(mapId: string) {
    const res: any = await map_funGetOneById({ mapId: mapId });
    setData(res);
  }

  return (
    <>
      <Stack>
        <Stack spacing={0}>
          <Text>
            latitude:{"  "}
            <Text fw={"bold"} span inherit>
              {data?.latitude}
            </Text>
          </Text>
          <Text>
            longitude:{"  "}
            <Text fw={"bold"} span inherit>
              {data?.longitude}
            </Text>
          </Text>
        </Stack>

        <Title order={4}>{data?.namePin}</Title>
        {/* <Text>{data?.Author?.username}</Text> */}

        <ComponentGlobal_AuthorNameOnHeader
          authorName={data?.Author?.username}
          imagesId={data?.Author?.Profile?.imagesId}
          profileId={data?.Author?.Profile?.id}
        />

        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </Stack>
    </>
  );
}
