"use client";

import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import {
  Box,
  Button,
  Center,
  Group,
  Stack,
  Text,
  TextInput,
  Textarea
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useAtom } from "jotai";
import _ from "lodash";
import moment from "moment";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Vote_funCreate } from "../fun/create/create_vote";
import { gs_vote_hotMenu, gs_vote_status } from "../global_state";
import { MODEL_VOTING } from "../model/interface";

export default function Vote_Create() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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
      name: "Nama Pilihan",
      value: "",
    },
    {
      name: "Nama Pilihan",
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
            maxLength={100}
            onChange={(val) => {
              setData({
                ...data,
                title: val.target.value,
              });
            }}
          />
          <Stack spacing={5}>
            <Textarea
              label="Deskripsi"
              autosize
              minRows={2}
              maxRows={5}
              withAsterisk
              maxLength={300}
              placeholder="Masukan deskripsi"
              onChange={(val) => {
                setData({
                  ...data,
                  deskripsi: val.target.value,
                });
              }}
            />
            <ComponentGlobal_InputCountDown
              maxInput={300}
              lengthInput={data.deskripsi.length}
            />
          </Stack>

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
              Daftar Pilihan
            </Text>
          </Center>

          <Stack>
            <Stack>
              {listVote.map((e, index) => (
                <Box key={index}>
                  <TextInput
                    label={e.name}
                    withAsterisk
                    maxLength={100}
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
              <Button
                disabled={listVote.length >= 4 ? true : false}
                compact
                w={100}
                radius={"xl"}
                leftIcon={<IconPlus size={15} />}
                variant="outline"
                onClick={() => {
                  setListVote([
                    ...listVote,
                    { name: "Nama Voting", value: "" },
                  ]);
                }}
              >
                <Text fz={8}>Tambah List</Text>
              </Button>

              <Button
                disabled={listVote.length <= 2 ? true : false}
                compact
                w={100}
                radius={"xl"}
                leftIcon={<IconMinus size={15} />}
                variant="outline"
                onClick={() => {
                  setListVote([...listVote.slice(0, -1)]);
                }}
              >
                <Text fz={8}>Kurangi List</Text>
              </Button>
            </Group>
          </Stack>
        </Stack>

        <Button
          // disabled
          loaderPosition="center"
          loading={isLoading ? true : false}
          mt={"lg"}
          radius={"xl"}
          onClick={() => {
            onSave(
              router,
              setHotMenu,
              setTabsStatus,
              data as any,
              listVote,
              setIsLoading
            );
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
  listVote: any[],
  setIsLoading: any
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
    return ComponentGlobal_NotifikasiPeringatan("Lengkapi Pilihan Voting");

  // console.log("berhasil");

  await Vote_funCreate(data, listVote).then((res) => {
    if (res.status === 201) {
      setHotMenu(1);
      setTabsStatus("Review");
      router.replace(RouterVote.status);
      ComponentGlobal_NotifikasiBerhasil(res.message);
      setIsLoading(true);
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}
