"use client";

import {
  ActionIcon,
  AppShell,
  Center,
  Footer,
  Grid,
  Group,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import React, { useState } from "react";
import ComponentColab_HeaderTamplate from "../../component/header_tamplate";
import { IconPlane, IconSend } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { gs_colab_pesan } from "../../global_state";

export default function LayoutColab_DetailGrupDiskusi({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pesan, setPesan] = useState("");

  async function onSend() {
    console.log(pesan);
  }
  return (
    <>
      <AppShell
        header={<ComponentColab_HeaderTamplate title="Nama Grup Diskusi" />}
        // footer={
        //   <Footer height={60}>
        //     <Stack justify="center" h={"100%"} px={"sm"}>
        //       <Grid align="center">
        //         <Grid.Col span={"auto"}>
        //           <Textarea
        //             minRows={1}
        //             radius={"md"}
        //             placeholder="Pesan..."
        //             onChange={(val) => setPesan(val.currentTarget.value)}
        //           />
        //         </Grid.Col>
        //         <Grid.Col span={"content"}>
        //           <ActionIcon
        //             variant="outline"
        //             radius={"xl"}
        //             size={"lg"}
        //             onClick={() => onSend()}
        //           >
        //             <IconSend size={20} />
        //           </ActionIcon>
        //         </Grid.Col>
        //       </Grid>
        //     </Stack>
        //   </Footer>
        // }
      >
        {children}
      </AppShell>
    </>
  );
}
