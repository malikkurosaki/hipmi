"use client";

import ComponentGlobal_ErrorInput from "@/app_modules/_global/component/error_input";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Grid,
  Group,
  Stack,
  Text,
  TextInput,
  Textarea
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useAtom } from "jotai";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Vote_funEditById } from "../fun/edit/fun_edit_by_id";
import { gs_vote_hotMenu, gs_vote_status } from "../global_state";
import {
  MODEL_VOTING,
  MODEL_VOTING_DAFTAR_NAMA_VOTE,
} from "../model/interface";

export default function Vote_Edit({
  dataVote,
  listDaftarVote,
}: {
  dataVote: MODEL_VOTING;
  listDaftarVote: MODEL_VOTING_DAFTAR_NAMA_VOTE[];
}) {
  const [data, setData] = useState(dataVote);
  const [pilihanNama, setPilihanNama] = useState(listDaftarVote);

  return (
    <>
      <Stack px={"sm"}>
        <TextInput
          label="Judul"
          withAsterisk
          placeholder="Judul"
          value={data.title}
          maxLength={100}
          error={
            data.title === "" ? (
              <ComponentGlobal_ErrorInput text="Masukan judul" />
            ) : (
              ""
            )
          }
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
            placeholder="Deskripsi"
            value={data.deskripsi}
            maxLength={300}
            error={
              data.deskripsi === "" ? (
                <ComponentGlobal_ErrorInput text="Masukan deskripsi" />
              ) : (
                ""
              )
            }
            onChange={(val) => {
              setData({
                ...data,
                deskripsi: val.target.value,
              });
            }}
          />
          <ComponentGlobal_InputCountDown
            lengthInput={data.deskripsi.length}
            maxInput={300}
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
          value={[data.awalVote, data.akhirVote]}
          error={
            data.awalVote === null || data.akhirVote === null ? (
              <ComponentGlobal_ErrorInput text="Invalid Date" />
            ) : (
              ""
            )
          }
          onChange={(val: any) => {
            setData({
              ...data,
              awalVote: val[0],
              akhirVote: val[1],
            });
          }}
        />

        <Stack spacing={0}>
          <Center>
            <Text fw={"bold"} fz={"sm"}>
              Daftar Pilihan
            </Text>
          </Center>

          <Stack>
            <Stack>
              {pilihanNama.map((e, index) => (
                <Grid key={index} h="100%" align="center">
                  <Grid.Col span={10}>
                    <Box>
                      <TextInput
                        label={"Nama Pilihan"}
                        withAsterisk
                        placeholder="Nama pilihan"
                        value={e.value}
                        maxLength={100}
                        error={
                          e.value === "" ? (
                            <ComponentGlobal_ErrorInput text="Masukan nama pilihan" />
                          ) : (
                            ""
                          )
                        }
                        onChange={(v) => {
                          const cloneData = _.clone(pilihanNama);
                          cloneData[index].value = v.currentTarget.value;
                          setPilihanNama([...pilihanNama]);
                        }}
                      />
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={2} mt={"md"}>
                    <ActionIcon
                      variant="transparent"
                      radius={"xl"}
                      disabled={pilihanNama.length < 3 ? true : false}
                      onClick={() => {
                        pilihanNama.splice(index, 1);
                        setPilihanNama([...pilihanNama]);
                      }}
                    >
                      <IconTrash
                        style={{
                          transition: "0.5s",
                        }}
                        color={pilihanNama.length < 3 ? "gray" : "red"}
                      />
                    </ActionIcon>
                  </Grid.Col>
                </Grid>
              ))}
            </Stack>

            <Group position="center">
              <Button
                disabled={pilihanNama.length >= 4 ? true : false}
                compact
                w={100}
                radius={"xl"}
                leftIcon={<IconPlus size={15} />}
                variant="outline"
                onClick={() => {
                  setPilihanNama([...(pilihanNama as any), { value: "" }]);
                }}
              >
                <Text fz={8}>Tambah List</Text>
              </Button>
            </Group>
          </Stack>
        </Stack>

        <ButtonAction data={data} listVoting={pilihanNama} />

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
  const [isLoading, setIsLoading] = useState(false);
  const [hotMenu, setHotMenu] = useAtom(gs_vote_hotMenu);
  const [tabsStatus, setTabsStatus] = useAtom(gs_vote_status);

  async function onUpdate() {
    // console.log(listVoting);

    await Vote_funEditById(data, listVoting).then((res) => {
      if (res.status === 200) {
        ComponentGlobal_NotifikasiBerhasil("Berhasil Update");
        // setHotMenu(1);
        // setTabsStatus("Draft");
        router.back();
        setIsLoading(true);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }

  return (
    <>
      <Button
        loaderPosition="center"
        loading={isLoading ? true : false}
        mt={"lg"}
        radius={"xl"}
        color="green"
        onClick={() => onUpdate()}
      >
        Update
      </Button>
    </>
  );
}
