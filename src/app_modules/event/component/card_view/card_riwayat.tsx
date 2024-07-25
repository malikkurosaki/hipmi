import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/_global/author_name_on_header";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import { Card, Group, Stack, Text, Title } from "@mantine/core";

import { useRouter } from "next/navigation";
import { MODEL_EVENT } from "../../model/interface";

export function ComponentEvent_CardRiwayat({ data }: { data: MODEL_EVENT }) {
  const router = useRouter();
  return (
    <>
      <Card
        style={{
          border: `2px solid ${AccentColor.blue}`,
          backgroundColor: AccentColor.darkblue,
          color: "white",
          borderRadius: "10px",
          marginBottom: "20px",
          padding: "15px",
        }}
      >
        <Card.Section px={"sm"} pt={"sm"}>
          <ComponentGlobal_AuthorNameOnHeader
            profileId={data.Author?.Profile?.id}
            imagesId={data.Author?.Profile?.imagesId}
            authorName={data.Author?.Profile?.name}
            isPembatas={true}
          />
        </Card.Section>
        <Card.Section
          p={"sm"}
          onClick={() => router.push(RouterEvent.detail_riwayat + data.id)}
        >
          <Stack>
            <Group w={"100%"} position="apart">
              <Title order={5} lineClamp={1} w={"70%"}>
                {data.title}
              </Title>
              <Text align="right" fz={"sm"} lineClamp={1} w={"20%"}>
                {new Intl.DateTimeFormat("id-ID", {
                  dateStyle: "medium",
                }).format(data.tanggal)}
              </Text>
            </Group>

            <Text fz={"sm"} lineClamp={2}>
              {data.deskripsi}
            </Text>
          </Stack>
        </Card.Section>
      </Card>
    </>
  );
}
