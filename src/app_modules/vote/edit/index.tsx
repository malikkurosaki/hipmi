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
  Textarea,
  Title,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useCounter } from "@mantine/hooks";
import { IconHome, IconPlus } from "@tabler/icons-react";
import { useAtom } from "jotai";
import moment from "moment";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { gs_vote_hotMenu, gs_vote_status } from "../global_state";
import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import {
  MODEL_VOTING,
  MODEL_VOTING_DAFTAR_NAMA_VOTE,
} from "../model/interface";
import _ from "lodash";
import { Vote_funEditById } from "../fun/edit/fun_edit_by_id";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";

export default function Vote_Edit({
  dataVote,
  listDaftarVote,
}: {
  dataVote: MODEL_VOTING;
  listDaftarVote: MODEL_VOTING_DAFTAR_NAMA_VOTE[];
}) {
  const [data, setData] = useState(dataVote);
  const [listVoting, setListVoting] = useState(listDaftarVote);

  return (
    <>
      <Stack px={"sm"}>
        <TextInput
          label="Judul"
          withAsterisk
          placeholder="Masukan judul"
          value={data.title}
          onChange={(val) => {
            setData({
              ...data,
              title: val.target.value,
            });
          }}
        />
        <Textarea
          label="Deskripsi"
          autosize
          minRows={2}
          maxRows={5}
          withAsterisk
          placeholder="Masukan deskripsi"
          value={data.deskripsi}
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
          value={[data.awalVote, data.akhirVote]}
          onChange={(val: any) =>
            setData({
              ...data,
              awalVote: val[0],
              akhirVote: val[1],
            })
          }
        />

        <Stack spacing={0}>
          <Center>
            <Text fw={"bold"} fz={"sm"}>
              Daftar Voting
            </Text>
          </Center>

          <Stack>
            <Stack>
              {listVoting.map((e, index) => (
                <Box key={index}>
                  <TextInput
                    label={"Nama Voting"}
                    withAsterisk
                    placeholder="Nama pilihan voting"
                    value={e.value}
                    onChange={(v) => {
                      const cloneData = _.clone(listVoting);
                      cloneData[index].value = v.currentTarget.value;

                      setListVoting([...listVoting]);
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Stack>
        </Stack>

        <ButtonAction data={data} listVoting={listVoting} />

        {/* <pre>{JSON.stringify(listDaftarVote, null, 2)}</pre> */}
      </Stack>
    </>
  );
}

function ButtonAction({
  data,
  listVoting,
}: {
  data: MODEL_VOTING;
  listVoting: MODEL_VOTING_DAFTAR_NAMA_VOTE[];
}) {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_vote_hotMenu);
  const [tabsStatus, setTabsStatus] = useAtom(gs_vote_status);

  async function onUpdate() {
    await Vote_funEditById(data, listVoting).then((res) => {
      if (res.status === 200) {
        ComponentGlobal_NotifikasiBerhasil("Berhasil Update");
        // setHotMenu(1);
        // setTabsStatus("Draft");
        router.back();
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }

  return (
    <>
      <Button mt={"lg"} radius={"xl"} color="green" onClick={() => onUpdate()}>
        Update
      </Button>
    </>
  );
}
