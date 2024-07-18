import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/_global/author_name_on_header";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_CardLoadingOverlay from "@/app_modules/_global/loading_card";
import { Avatar, Box, Card, Grid, Group, Stack, Text, Title } from "@mantine/core";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_EVENT_PESERTA } from "../../model/interface";

export function ComponentEvent_CardKontributor({data}: {data: MODEL_EVENT_PESERTA}) {
    const router = useRouter();
    const [eventId, setEventId] = useState("");
    const [visible, setVisible] = useState(false);
    
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
              profileId={data?.Event.Author.Profile.id}
              imagesId={data?.Event.Author.Profile.imagesId}
              authorName={data?.Event.Author.Profile.name}
              isPembatas
            />
          </Card.Section>
          <Card.Section
            p={"sm"}
            onClick={() => {
              setEventId(data?.id), setVisible(true);
              router.push(RouterEvent.detail_kontribusi + data.Event.id);
            }}
          >
            <Stack>
              <Title align="center" order={5} lineClamp={1}>
                {data?.Event.title}
              </Title>

              {/* <Text fz={"sm"} lineClamp={2}>
                {data?.Event.deskripsi}
              </Text> */}

              <Group position="center">
                {data?.Event.Event_Peserta.map((val, i) => (
                  <Box key={i}>
                    <Avatar
                      size={"lg"}
                      radius={"xl"}
                      sx={{ borderStyle: "solid", borderWidth: "0.5px" }}
                      src={
                        RouterProfile.api_foto_profile +
                        val?.User?.Profile.imagesId
                      }
                    />
                  </Box>
                ))}
              </Group>
            </Stack>
          </Card.Section>
          {visible && eventId === data?.id ? (
            <ComponentGlobal_CardLoadingOverlay />
          ) : (
            ""
          )}
        </Card>
      </>
    );
}