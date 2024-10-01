"use client";

import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_AvatarAndUsername, ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { Box, Paper, Stack, Title } from "@mantine/core";
import ComponentColab_DetailData from "../../component/detail/detail_data";
import { MODEL_COLLABORATION_ROOM_CHAT } from "../../model/interface";

export default function Colab_DetailInfoGrup({
  dataRoom,
}: {
  dataRoom: MODEL_COLLABORATION_ROOM_CHAT;
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Info Grup" />}
      >
        <InfoGroup dataRoom={dataRoom} />
      </UIGlobal_LayoutTamplate>
    </>
  );
}

function InfoGroup({ dataRoom }: { dataRoom: MODEL_COLLABORATION_ROOM_CHAT }) {
  return (
    <>
      <ComponentGlobal_CardStyles>
        <Stack>
          <ComponentColab_DetailData data={dataRoom.ProjectCollaboration} />
          <Paper
            style={{
              border: `2px solid ${AccentColor.softblue}`,
              backgroundColor: AccentColor.blue,
              color: "white",
              borderRadius: "10px",
              padding: "15px",
            }}
          >
            <Stack>
              <Title order={6}>Anggota Grup</Title>
              {dataRoom.ProjectCollaboration_AnggotaRoomChat.map((e, i) => (
                <Box key={i}>
               
                  <ComponentGlobal_AvatarAndUsername profile={e.User.Profile as any}/>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
