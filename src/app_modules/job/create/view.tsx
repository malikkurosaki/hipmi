"use client";

import {
  Button,
  Center,
  FileButton,
  Group,
  Image,
  Loader,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconCamera, IconUpload } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { gs_job_hot_menu, gs_job_status } from "../global_state";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);

import ComponentGlobal_InputCountDown from "@/app_modules/component_global/input_countdown";
import ComponentGlobal_V2_LoadingPage from "@/app_modules/component_global/loading_page_v2";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";
import mqtt_client from "@/util/mqtt_client";
import { useShallowEffect } from "@mantine/hooks";
import { defaultDeskripsi, defaultSyarat } from "../component/default_value";
import ComponentJob_NotedBox from "../component/detail/noted_box";
import { MODEL_JOB } from "../model/interface";
import { Job_funCreate } from "../fun/create/fun_create";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import { MODEL_NOTIFIKASI } from "@/app_modules/notifikasi/model/interface";

export default function Job_Create() {
  const [value, setValue] = useState({
    title: "",
    content: "",
    deskripsi: "",
  });
  const [reload, setReload] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<any | null>();

  useShallowEffect(() => {
    if (window && window.document) setReload(true);
  }, []);

  if (!reload)
    return (
      <>
        <Center h={"50vh"}>
          <ComponentGlobal_V2_LoadingPage />
        </Center>
      </>
    );

  return (
    <>
      {!reload ? (
        <Center h={"50vh"}>
          <Loader />
        </Center>
      ) : (
        <Stack px={"sm"} spacing={40}>
          <Stack align="center" spacing={"xs"}>
            {images ? (
              <Image alt="" src={images} height={300} width={200} />
            ) : (
              <Paper h={300} w={200} withBorder shadow="lg" bg={"gray.1"}>
                <Stack justify="center" align="center" h={"100%"}>
                  <IconUpload color="gray" />
                  <Text fz={10} fs={"italic"} c={"gray"} fw={"bold"}>
                    Upload Gambar
                  </Text>
                </Stack>
              </Paper>
            )}

            <FileButton
              onChange={async (files: any | null) => {
                try {
                  const buffer = URL.createObjectURL(
                    new Blob([new Uint8Array(await files.arrayBuffer())])
                  );
                  if (files.size > 200000) {
                    ComponentGlobal_NotifikasiPeringatan(
                      "Maaf, Ukuran file terlalu besar, maksimal 2mb",
                      3000
                    );
                  } else {
                    setImages(buffer);
                    setFile(files);
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
              accept="image/png,image/jpeg"
            >
              {(props) => (
                <Button
                  compact
                  {...props}
                  radius={"xl"}
                  variant="outline"
                  w={150}
                >
                  <IconCamera />
                </Button>
              )}
            </FileButton>
          </Stack>

          <ComponentJob_NotedBox informasi="Poster atau Gambar tidak wajib untuk di upload. Upload lah jika dirasa perlu." />

          <Stack spacing={"lg"}>
            <TextInput
              withAsterisk
              label="Judul"
              placeholder="Masukan judul lowongan kerja"
              maxLength={100}
              onChange={(val) => {
                setValue({
                  ...value,
                  title: val.currentTarget.value,
                });
              }}
            />

            <Stack spacing={3}>
              <Text fz={"sm"}>
                Syarat & Ketentuan
                <Text inherit span c={"red"}>
                  {" "}
                  *
                </Text>
              </Text>

              <Stack spacing={5}>
                <ReactQuill
                  defaultValue={defaultSyarat}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, 4, 5, 6, false] }],
                      ["bold", "italic", "underline", "link"],
                      // [{ align: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["clean"],
                    ],
                  }}
                  theme="snow"
                  onChange={(val) => {
                    setValue({
                      ...value,
                      content: val,
                    });
                  }}
                />
                <ComponentGlobal_InputCountDown
                  maxInput={500}
                  lengthInput={value.content.length}
                />
              </Stack>
            </Stack>
            <Stack spacing={3}>
              <Text fz={"sm"}>
                Deskripsi
                <Text inherit span c={"red"}>
                  {" "}
                  *
                </Text>
              </Text>
              <Stack spacing={5}>
                <ReactQuill
                  defaultValue={defaultDeskripsi}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, 4, 5, 6, false] }],
                      ["bold", "italic", "underline", "link"],
                      // [{ align: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["clean"],
                    ],
                  }}
                  theme="snow"
                  onChange={(val) => {
                    setValue({
                      ...value,
                      deskripsi: val,
                    });
                  }}
                />
                <ComponentGlobal_InputCountDown
                  maxInput={500}
                  lengthInput={value.deskripsi.length}
                />
              </Stack>
            </Stack>
          </Stack>

          <ButtonAction value={value as any} file={file as any} />
        </Stack>
      )}
    </>
  );
}

function ButtonAction({ value, file }: { value: MODEL_JOB; file: FormData }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [hotMenu, setHotMenu] = useAtom(gs_job_hot_menu);
  const [status, setStatus] = useAtom(gs_job_status);

  async function onCreate() {
    const gambar = new FormData();
    gambar.append("file", file as any);

    const create = await Job_funCreate(value as any, gambar);
    if (create.status === 201) {
      const dataNotif: any = {
        appId: create.data?.id as any,
        kategoriApp: "JOB",
        status: create.data?.MasterStatus?.name as any,
        userId: create.data?.authorId as any,
        pesan: create.data?.title as any,
        title: "Job baru",
      };
      const notif = await notifikasiToAdmin_funCreate({
        data: dataNotif as any,
      });
      // console.log(notif);

      if (notif.status === 201) {
        mqtt_client.publish(
          "ADMIN",
          JSON.stringify({
            count: 1,
          })
        );

        setHotMenu(2);
        setStatus("Review");
        router.replace(RouterJob.status);
        setIsLoading(true);
        ComponentGlobal_NotifikasiBerhasil(create.message);
      }
    } else {
      ComponentGlobal_NotifikasiGagal(create.message);
    }
  }

  return (
    <>
      <Stack>
        <Group grow mt={"lg"} mb={70}>
          <Button
            disabled={
              value.title === "" ||
              value.content === "" ||
              value.content === "<p><br></p>" ||
              value.content.length > 500 ||
              value.deskripsi === "" ||
              value.deskripsi === "<p><br></p>" ||
              value.deskripsi.length > 500
                ? true
                : false
            }
            style={{
              transition: "0.5s",
            }}
            loaderPosition="center"
            loading={isLoading ? true : false}
            w={"100%"}
            radius={"xl"}
            onClick={() => {
              onCreate();
            }}
          >
            Simpan
          </Button>
        </Group>
      </Stack>
    </>
  );
}
