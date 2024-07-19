"use client";

import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";
import { Box, Paper, Stack, Text, Title } from "@mantine/core";
import ComponentColab_HeaderTamplate from "../../component/header_tamplate";
import { MODEL_COLLABORATION_ROOM_CHAT } from "../../model/interface";
import ComponentColab_DetailData from "../../component/detail/detail_data";
import ComponentColab_AuthorNameOnListPartisipan from "../../component/detail/header_author_list_partisipan";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";

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
        {<InfoGroup dataRoom={dataRoom} />}
      </UIGlobal_LayoutTamplate>
    </>
  );
}

function InfoGroup({ dataRoom }: { dataRoom: MODEL_COLLABORATION_ROOM_CHAT }) {
  return (
    <>
      <Stack
        px={"xs"}
        style={{
          border: `2px solid ${AccentColor.blue}`,
          backgroundColor: AccentColor.darkblue,
          color: "white",
          borderRadius: "10px",
          marginBottom: "20px",
          padding: "15px",
        }}
      >
        <ComponentColab_DetailData data={dataRoom.ProjectCollaboration} />
        <Paper

          style={{
            border: `2px solid ${AccentColor.softblue}`,
            backgroundColor: AccentColor.blue,
            color: "white",
            borderRadius: "10px",
            marginBottom: "20px",
            padding: "15px",
          }}
        >
          <Stack>
            <Title order={6}>Anggota Grup</Title>
            {dataRoom.ProjectCollaboration_AnggotaRoomChat.map((e, i) => (
              <Box key={i}>
                <ComponentColab_AuthorNameOnListPartisipan
                  author={e.User}
                  // isPembatas={true}
                />
              </Box>
            ))}
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}
