"use client";

import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  FileButton,
  Flex,
  Group,
  Image,
  Loader,
  Paper,
  Stack,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { IconCamera, IconUpload } from "@tabler/icons-react";
import { useAtom } from "jotai";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { gs_job_hot_menu, gs_job_status } from "../global_state";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";

import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useShallowEffect, useToggle } from "@mantine/hooks";
import { Job_funCreate } from "../fun/create/fun_create";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import { MODEL_JOB } from "../model/interface";
import toast from "react-simple-toasts";
import ComponentJob_NotedBox from "../component/detail/noted_box";
const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);

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
                  if (files.size > 20000) {
                    ComponentGlobal_NotifikasiPeringatan(
                      "Maaf, Ukuran file terlalu besar, maximum 20Mb",
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
              <ReactQuill
                defaultValue={`
          <p><strong>Syarat &amp; Ketentuan :</strong></p>
          <ol>
          <li>Minimal pendidika SMA / Sederajat</li>
          <li>Pasif berbahasa inggris </li>
          <li>Dll,.</li>
          </ol>
          <p></br></p>
          `}
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
            </Stack>
            <Stack spacing={3}>
              <Text fz={"sm"}>
                Deskripsi
                <Text inherit span c={"red"}>
                  {" "}
                  *
                </Text>
              </Text>
              <ReactQuill
                defaultValue={`
            <p>
            <strong>Deskripsi :</strong>
          </p>
          <p>Jika berminat dapat menghubungi WA berikut</p>
          <p>+6281 xxx xxx xx</p>
          <p>Kirim CV anda melalui email berikut</p>
          <p>test-email@gmail.com</p>
          <p>Atau kunjungi website kami:</p>
          <p>
            <a
              href="https://test-hipmi.wibudev.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              https://test-hipmi.wibudev.com/
            </a>
          </p>
          `}
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
  const [hotMenu, setHotMenu] = useAtom(gs_job_hot_menu);
  const [status, setStatus] = useAtom(gs_job_status);
  const [preview, setPreview] = useToggle();

  async function onAction() {
    const gambar = new FormData();
    gambar.append("file", file as any);

    // console.log(value)

    await Job_funCreate(value as any, gambar).then((res) => {
      if (res.status === 201) {
        setHotMenu(2);
        setStatus("Review");
        router.replace(RouterJob.status);
        ComponentGlobal_NotifikasiBerhasil("Tambah Lowongan Berhasil");
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }

  return (
    <>
      <Stack>
        <Group grow mt={"lg"} mb={70}>
          <Button
            w={"100%"}
            radius={"xl"}
            onClick={() => {
              onAction();
            }}
          >
            Simpan
          </Button>
        </Group>
      </Stack>
    </>
  );
}
