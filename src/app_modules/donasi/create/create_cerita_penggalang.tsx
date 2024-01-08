"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  AspectRatio,
  Button,
  Center,
  FileButton,
  Image,
  Paper,
  Stack,
  Textarea,
} from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { gs_donasi_tabs_posting } from "../global_state";
import ComponentDonasi_NotedBox from "../component/noted_box";
import { MODEL_DONASI_TEMPORARY } from "../model/interface";
import _ from "lodash";
import toast from "react-simple-toasts";
import { Donasi_funCreate } from "../fun/create/fun_create_donasi";
import { notifications } from "@mantine/notifications";
import { NotifPeringatan } from "../component/notifikasi/notif_peringatan";

export default function CreateCeritaPenggalangDonasi({
  dataTemporary,
  userId,
}: {
  dataTemporary: MODEL_DONASI_TEMPORARY;
  userId: string;
}) {
  const router = useRouter();
  const [tabsPostingDonasi, setTabsPostingDonasi] = useAtom(
    gs_donasi_tabs_posting
  );
  const [create, setCreate] = useState({
    pembukaan: "",
    cerita: "",
  });
  const [temporary, setTemporary] = useState(dataTemporary);
  const [file, setFile] = useState<File | null>(null);
  const [imageCerita, setImageCerita] = useState<any | null>();

  async function onCreate() {
    if (_.values(create).includes("")) return NotifPeringatan("Lengkapin Data");
    if (!file) return NotifPeringatan("Lengkapi Gambar");

    const gambar = new FormData();
    gambar.append("file", file as any);

    const body = {
      id: temporary.id,
      title: temporary.title,
      target: temporary.target,
      imagesId: temporary.imagesId,
      donasiMaster_KategoriId: temporary.donasiMaster_KategoriId,
      donasiMaster_DurasiId: temporary.donasiMaster_DurasiId,
      authorId: userId,
      CeritaDonasi: {
        pembukaan: create.pembukaan,
        cerita: create.cerita,
      },
    };

    await Donasi_funCreate(body as any, gambar).then((res) => {
      if (res.status === 201) {
        router.push(RouterDonasi.page_pop_up_create);
        setTabsPostingDonasi("Review");
      } else {
        toast(res.message);
      }
    });
  }
  return (
    <>
      <Stack spacing={"md"} px={"md"}>
        {/* <pre>{JSON.stringify(dataTempo, null, 2)}</pre> */}
        <ComponentDonasi_NotedBox informasi="Ceritakan dengan jujur & benar mengapa Penggalanagn Dana ini harus diadakan!" />
        <Textarea
          autosize
          minRows={2}
          maxRows={4}
          withAsterisk
          label="Pembukaan"
          placeholder="Pembuka dari isi cerita"
          onChange={(val) =>
            setCreate({
              ...create,
              pembukaan: val.target.value,
            })
          }
        />
        <Stack spacing={"xs"}>
          <AspectRatio ratio={16 / 9}>
            <Paper radius={"md"}>
              <Image
                alt="Foto"
                src={imageCerita ? imageCerita : "/aset/no-img.png"}
              />
            </Paper>
          </AspectRatio>

          <Center>
            <FileButton
              onChange={async (files: any | null) => {
                try {
                  const buffer = URL.createObjectURL(
                    new Blob([new Uint8Array(await files.arrayBuffer())])
                  );
                  // console.log(buffer, "ini buffer");
                  // console.log(files, " ini file");
                  setImageCerita(buffer);
                  setFile(files);
                } catch (error) {
                  console.log(error);
                }
              }}
              accept="image/png,image/jpeg"
            >
              {(props) => (
                <Button
                  {...props}
                  radius={"xl"}
                  variant="outline"
                  w={150}
                  leftIcon={<IconCamera />}
                >
                  Upload
                </Button>
              )}
            </FileButton>
          </Center>
        </Stack>
        <Textarea
          autosize
          minRows={2}
          maxRows={10}
          withAsterisk
          label="Cerita"
          placeholder="Ceritakan alasan mengapa harus membuat Penggalangan Dana"
          onChange={(val) =>
            setCreate({
              ...create,
              cerita: val.target.value,
            })
          }
        />

        <Button w={"100%"} radius={"xl"} onClick={() => onCreate()}>
          Simpan
        </Button>
      </Stack>
      {/* <pre> {JSON.stringify(value.pembukaan, null, 2)}</pre> */}
    </>
  );
}
