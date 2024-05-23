"use client";

import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import {
  Box,
  Button,
  Center,
  FileButton,
  Group,
  Image,
  Loader,
  Modal,
  Paper,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { IconCamera, IconUpload, IconXboxX } from "@tabler/icons-react";
import { useAtom } from "jotai";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { gs_job_hot_menu, gs_job_status } from "../global_state";
import { MODEL_JOB } from "../model/interface";
import {
  useDisclosure,
  useShallowEffect,
  useWindowScroll,
} from "@mantine/hooks";

import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";
import { Job_EditById } from "../fun/edit/fun_edit_by_id";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import dynamic from "next/dynamic";
import ComponentGlobal_InputCountDown from "@/app_modules/component_global/input_countdown";
const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);

export default function Job_Edit({ dataJob }: { dataJob: MODEL_JOB }) {
  const [value, setValue] = useState(dataJob);

  const [reload, setReload] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<any | null>();
  const [maxFile, setMaxFile] = useState(false);

  useShallowEffect(() => {
    if (window && window.document) setReload(true);
  }, []);

  if (!reload)
    return (
      <>
        <Center h={"50vh"}>
          <Loader />
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
          <Stack align="center">
            {images ? (
              <Image alt="" src={images} mah={500} maw={200} />
            ) : value.imagesId ? (
              <Image
                height={300}
                width={200}
                alt="Foto"
                src={RouterJob.api_gambar + value.imagesId}
              />
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
                    // setMaxFile(true);
                    ComponentGlobal_NotifikasiPeringatan(
                      "Maaf, Ukuran file terlalu besar, maksimal 2mb",
                      3000
                    );
                  } else {
                    // console.log(buffer, "ini buffer");
                    // console.log(files, " ini file");

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

          <Stack spacing={"lg"}>
            <TextInput
              withAsterisk
              label="Judul"
              placeholder="Masukan judul lowongan kerja"
              value={value.title}
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
                  value={value.content}
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
                  value={value.deskripsi}
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
  const [opened, { open, close }] = useDisclosure(false);
  const [scroll, scrollTo] = useWindowScroll();

  async function onUpdate() {
    const gambar = new FormData();
    gambar.append("file", file as any);

    await Job_EditById(value, gambar).then((res) => {
      if (res.status === 200) {
        setHotMenu(2);
        setStatus("Draft");
        ComponentGlobal_NotifikasiBerhasil(res.message);
        setIsLoading(true);
        router.back();
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }

  return (
    <>
      <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        <Stack>
          <Title order={6}>Anda yakin menyimpan data ini ?</Title>
          <Group position="center">
            <Button radius={"xl"} onClick={() => close()}>
              Batal
            </Button>
            <Button
              loaderPosition="center"
              loading={isLoading ? true : false}
              color="teal"
              radius={"xl"}
              onClick={() => onUpdate()}
            >
              Simpan
            </Button>
          </Group>
        </Stack>
      </Modal>
      <Button
        style={{
          transition: "0.5s",
        }}
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
        color="teal"
        radius={"xl"}
        mt={"lg"}
        mb={70}
        onClick={() => {
          open();
          scrollTo({ y: 0 });
        }}
      >
        Update
      </Button>
    </>
  );
}
