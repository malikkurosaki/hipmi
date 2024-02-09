"use client";

import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import {
  Box,
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
import { IconHome, IconMinus, IconPlus } from "@tabler/icons-react";
import { useAtom } from "jotai";
import moment from "moment";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { gs_vote_hotMenu, gs_vote_status } from "../global_state";
import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import _ from "lodash";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";
import { data } from "autoprefixer";
import { Vote_funCreate } from "../fun/create/create_vote";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import { MODEL_VOTING } from "../model/interface";

export default function Vote_Create() {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_vote_hotMenu);
  const [tabsStatus, setTabsStatus] = useAtom(gs_vote_status);

  const [data, setData] = useState({
    title: "",
    deskripsi: "",
    awalVote: Date,
    akhirVote: Date,
  });

  // const [range, setRange] = useState({
  // });

  const [listVote, setListVote] = useState([
    {
      name: "Nama Voting",
      value: "",
    },
    {
      name: "Nama Voting",
      value: "",
    },
  ]);

  return (
    <>
      <Stack px={"sm"} spacing={"xl"}>
        <Stack>
          <TextInput
            label="Judul"
            withAsterisk
            placeholder="Masukan judul"
            onChange={(val) => {
              setData({
                ...data,
                title: val.target.value,
              });
            }}
          />
          <TextInput
            label="Deskripsi"
            withAsterisk
            placeholder="Masukan deskripsi"
            onChange={(val) => {
              setData({
                ...data,
                deskripsi: val.target.value,
              });
            }}
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
            onChange={(val: any) => {
              setData({
                ...data,
                awalVote: val[0],
                akhirVote: val[1],
              });
            }}
          />
        </Stack>

        <Stack spacing={0}>
          <Center>
            <Text fw={"bold"} fz={"sm"}>
              Daftar Voting
            </Text>
          </Center>

          <Stack>
            <Stack>
              {listVote.map((e, index) => (
                <Box key={index}>
                  <TextInput
                    label={e.name}
                    withAsterisk
                    placeholder="Nama pilihan voting"
                    onChange={(v) => {
                      const val = _.clone(listVote);
                      val[index].value = v.currentTarget.value;
                      setListVote([...val]);
                    }}
                  />
                </Box>
              ))}
            </Stack>

            <Group position="center">
              {listVote.length >= 4 ? (
                ""
              ) : (
                <Button
                  compact
                  w={100}
                  radius={"xl"}
                  leftIcon={<IconPlus size={15} />}
                  variant="outline"
                  onClick={() => {
                    // if (listVote.length >= 4)
                    //   return ComponentGlobal_NotifikasiPeringatan(
                    //     "Daftar Voting Maksimal 4"
                    //   );
                    setListVote([
                      ...listVote,
                      { name: "Nama Voting", value: "" },
                    ]);
                  }}
                >
                  <Text fz={8}>Tambah List</Text>
                </Button>
              )}

              {listVote.length <= 2 ? (
                ""
              ) : (
                <Button
                  compact
                  w={100}
                  radius={"xl"}
                  leftIcon={<IconMinus size={15} />}
                  variant="outline"
                  onClick={() => {
                    if (listVote.length <= 2)
                      return ComponentGlobal_NotifikasiPeringatan(
                        "Daftar Voting Minimal 2"
                      );
                    setListVote([...listVote.slice(0, -1)]);
                  }}
                >
                  <Text fz={8}>Kurangi List</Text>
                </Button>
              )}
            </Group>
          </Stack>
        </Stack>

        <Button
          // disabled
          mt={"lg"}
          radius={"xl"}
          onClick={() => {
            onSave(router, setHotMenu, setTabsStatus, data as any, listVote);
          }}
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
  setTabsStatus: any,
  data: MODEL_VOTING,
  listVote: any[]
) {
  if (_.values(data).includes(""))
    return ComponentGlobal_NotifikasiPeringatan("Lengkapi Data");

  const cekAwalVote = moment(data.awalVote).format();
  if (cekAwalVote === "Invalid date")
    return ComponentGlobal_NotifikasiPeringatan("Lengkapi Tanggal");

  const cekAkhirVote = moment(data.akhirVote).format();
  if (cekAkhirVote === "Invalid date")
    return ComponentGlobal_NotifikasiPeringatan("Lengkapi Tanggal");

  if (_.values(listVote.map((e) => e.value)).includes(""))
    return ComponentGlobal_NotifikasiPeringatan("Isi Semua Nama Voting");

  await Vote_funCreate(data, listVote).then((res) => {
    if (res.status === 201) {
      setHotMenu(1);
      setTabsStatus("Review");
      router.replace(RouterVote.status);
      ComponentGlobal_NotifikasiBerhasil(res.message);
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}
