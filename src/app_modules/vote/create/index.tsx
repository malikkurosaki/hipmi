"use client";

import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import {
  Button,
  Center,
  Grid,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useCounter } from "@mantine/hooks";
import { IconHome } from "@tabler/icons-react";
import { useAtom } from "jotai";
import moment from "moment";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { gs_vote_hotMenu, gs_vote_status } from "../global_state";
import { RouterVote } from "@/app/lib/router_hipmi/router_vote";

export default function Vote_Create() {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_vote_hotMenu);
  const [tabsStatus, setTabsStatus] = useAtom(gs_vote_status);

  const [data, setData] = useState({
    title: "",
    deskripsi: "",
  });
  return (
    <>
      <Stack px={"sm"}>
        <TextInput
          label="Judul"
          withAsterisk
          placeholder="Masukan judul"
          onChange={() => {}}
        />
        <TextInput
          label="Deskripsi"
          withAsterisk
          placeholder="Masukan deskripsi"
          onChange={() => {}}
        />

        <DatePickerInput
          label="Jangka Waktu"
          placeholder="Masukan jangka waktu voting"
          withAsterisk
          dropdownType="modal"
          type="range"
          excludeDate={(date) => {
            return moment(date).diff(Date.now(), "days") < 0;
          }}
          onChange={(val) => console.log(val)}
        />

        <Stack>
          <Text fw={"bold"} fz={"sm"}>
            Daftar Voting
          </Text>

          <Stack>
            <Grid>
              <Grid.Col span={"content"}>
                <Stack h={"100%"} justify="center">
                  <Title order={3}>-</Title>
                </Stack>
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <TextInput
                  label="Pilihan 1"
                  placeholder="Masukan pilihan 1"
                  withAsterisk
                  onChange={() => {}}
                />
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={"content"}>
                <Stack h={"100%"} justify="center">
                  <Title order={3}>-</Title>
                </Stack>
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <TextInput
                  label="Pilihan 2"
                  placeholder="Masukan pilihan 2"
                  withAsterisk
                  onChange={() => {}}
                />
              </Grid.Col>
            </Grid>
          </Stack>
        </Stack>

        <Button
          mt={"lg"}
          radius={"xl"}
          onClick={() => onSave(router, setHotMenu, setTabsStatus)}
        >
          Simpan
        </Button>
      </Stack>
    </>
  );
}

async function onSave(
  router: AppRouterInstance,
  setHotMenu: any,
  setTabsStatus: any
) {
  ComponentGlobal_NotifikasiBerhasil("Berhasil Disimpan");
  setHotMenu(1);
  setTabsStatus("Review")

  router.replace(RouterVote.status);
}
