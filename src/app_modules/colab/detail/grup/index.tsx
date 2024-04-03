"use client";

import {
  ActionIcon,
  Affix,
  Box,
  Button,
  Grid,
  ScrollArea,
  Stack,
  TextInput,
  Textarea,
  Transition,
  rem,
} from "@mantine/core";
import { useShallowEffect, useWindowScroll } from "@mantine/hooks";
import { useAtom } from "jotai";
import { useState } from "react";
import { gs_colab_pesan } from "../../global_state";
import { IconArrowUp, IconSend } from "@tabler/icons-react";

export default function Colab_DetailGrupDiskusi() {
  const [pesan, setPesan] = useState("");
  const [obrolan, setObrolan] = useState<string[]>([]);
  const [scroll, scrollTo] = useWindowScroll();

  async function onSend() {
    // setObrolan(pesan); 
    setPesan("")
  }

  return (
    <>
      <ScrollArea>{obrolan}</ScrollArea>

      <Affix position={{ bottom: rem(10) }} w={"100%"}>
        <Stack justify="center" h={"100%"} px={"sm"}>
          <Grid align="center">
            <Grid.Col span={"auto"}>
              <Textarea
                minRows={1}
                radius={"md"}
                placeholder="Pesan..."
                value={pesan}
                onChange={(val) => setPesan(val.currentTarget.value)}
              />
            </Grid.Col>
            <Grid.Col span={"content"}>
              <ActionIcon
                variant="outline"
                radius={"xl"}
                size={"lg"}
                onClick={() => {
                  onSend();
                }}
              >
                <IconSend size={20} />
              </ActionIcon>
            </Grid.Col>
          </Grid>
        </Stack>
      </Affix>
    </>
  );
}
