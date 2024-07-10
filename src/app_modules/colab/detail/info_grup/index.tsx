"use client";

import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";
import { Box, Paper, Stack, Text, Title } from "@mantine/core";
import ComponentColab_HeaderTamplate from "../../component/header_tamplate";
import { MODEL_COLLABORATION_ROOM_CHAT } from "../../model/interface";
import ComponentColab_DetailData from "../../component/detail/detail_data";
import ComponentColab_AuthorNameOnListPartisipan from "../../component/detail/header_author_list_partisipan";

export default function Colab_DetailInfoGrup({
  dataRoom,
}: {
  dataRoom: MODEL_COLLABORATION_ROOM_CHAT;
}) {
  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={<ComponentColab_HeaderTamplate title="Info Grup" />}
      >
        {<InfoGroup dataRoom={dataRoom} />}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}

function InfoGroup({ dataRoom }: { dataRoom: MODEL_COLLABORATION_ROOM_CHAT }) {
  return (
    <>
      <Stack px={"xs"}>
        <ComponentColab_DetailData data={dataRoom.ProjectCollaboration} />
        <Paper p={"xs"} withBorder>
          <Stack>
            <Title order={6}>Anggota Grup</Title>
            {dataRoom.ProjectCollaboration_AnggotaRoomChat.map((e,i) => (
              <Box key={i}>
                <ComponentColab_AuthorNameOnListPartisipan author={e.User} isPembatas={true} />
              </Box>
            ))}
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}
