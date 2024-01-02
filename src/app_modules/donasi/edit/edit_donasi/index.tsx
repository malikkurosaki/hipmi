"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  Stack,
  Select,
  AspectRatio,
  Paper,
  Center,
  Button,
  TextInput,
  Image,
  FileButton,
  Modal,
  Group,
  Title,
} from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { gs_donasi_tabs_posting } from "../../global_state";
import toast from "react-simple-toasts";
import { MODEL_DONASI, MODEL_DONASI_ALL_MASTER } from "../../model/interface";
import { useState } from "react";
import { Donasi_funUpdateDonasi } from "../../fun/update/fun_update_donasi";
import { useDisclosure } from "@mantine/hooks";
import { NotifBerhasil } from "../../component/notifikasi/notif_berhasil";
import { NotifPeringatan } from "../../component/notifikasi/notif_peringatan";
import _ from "lodash";
import { Donasi_getOneById } from "../../fun/get/get_one_donasi_by_id";

export default function EditDonasi({
  dataDonasi,
  masterKategori,
  masterDurasi,
}: {
  dataDonasi: MODEL_DONASI;
  masterKategori: MODEL_DONASI_ALL_MASTER[];
  masterDurasi: MODEL_DONASI_ALL_MASTER[];
}) {
  const router = useRouter();
  const [tabsPostingDonasi, setTabsPostingDonasi] = useAtom(
    gs_donasi_tabs_posting
  );
  const [value, setValue] = useState(dataDonasi);
  const [kategori, setKategori] = useState(masterKategori);
  const [durasi, setDurasi] = useState(masterDurasi);
  const [file, setFile] = useState<File | null>(null);
  const [updateImage, setUpdateImage] = useState<any | null>();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      {/* <pre>{JSON.stringify(donasi, null, 2)}</pre> */}
      <Stack spacing={"md"} px={"md"}>
        <Select
          label="Kategori"
          placeholder="Pilih kategori penggalangan dana"
          value={value.DonasiMaster_Ketegori.id}
          withAsterisk
          data={kategori.map((e) => ({
            value: e.id,
            label: e.name,
          }))}
          onChange={(val) =>
            setValue({
              ...(value as any),
              DonasiMaster_Ketegori: {
                id: val,
              },
            })
          }
        />
        <Stack>
          <AspectRatio ratio={16 / 9}>
            <Paper radius={"md"}>
              <Image
                alt="Foto"
                src={
                  updateImage
                    ? updateImage
                    : RouterDonasi.api_gambar + `${value.imagesId}`
                }
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
                  setUpdateImage(buffer);
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
        <Stack>
          <TextInput
            withAsterisk
            label="Judul Donasi"
            placeholder="Contoh: Renovasi Masjid pada kampung, dll"
            value={value.title}
            onChange={(val) =>
              setValue({
                ...value,
                title: val.target.value,
              })
            }
          />
          <TextInput
            type="number"
            withAsterisk
            label="Target Dana"
            placeholder="Masukan nominal angka"
            value={+value.target ? +value.target : ""}
            onChange={(val) =>
              setValue({
                ...value,
                target: val.target.value,
              })
            }
          />
          <Select
            label="Durasi"
            placeholder="Jangka waktu penggalangan dana"
            withAsterisk
            value={value.DonasiMaster_Durasi.id}
            data={durasi.map((e) => ({
              value: e.id,
              label: e.name + " " + `hari`,
            }))}
            onChange={(val) =>
              setValue({
                ...(value as any),
                DonasiMaster_Durasi: {
                  id: val,
                },
              })
            }
          />
        </Stack>
        <Button
          my={"lg"}
          radius={"xl"}
          onClick={() => {
            onUpdate(value, file as any, router);
          }}
        >
          Update
        </Button>
        {/* <Modal opened={opened} onClose={close} withCloseButton={false} centered >
          <ModalEdit />
        </Modal> */}
      </Stack>
    </>
  );
}

// function ModalEdit() {
//   return (
//     <>
//     <Stack>
//       <Title order={6}>Anda yakin menyimpan data ini ?</Title>
//     <Group position="center">
//         <Button variant="outline" >Batal</Button>
//         <Button>Simpan</Button>
//       </Group>
//     </Stack>

//     </>
//   );
// }

async function onUpdate(value: MODEL_DONASI, file: FormData, router: any) {
  const body = {
    id: value.id,
    donasiMaster_KategoriId: value.DonasiMaster_Ketegori.id,
    donasiMaster_DurasiId: value.DonasiMaster_Durasi.id,
    title: value.title,
    target: value.target,
    imagesId: value.imagesId,
  };

  const gambar = new FormData();
  gambar.append("file", file as any);

  if (_.values(body).includes("")) return NotifPeringatan("Lengkapi Data");

  await Donasi_funUpdateDonasi(body as any, gambar).then((res) => {
    if (res.status === 200) {
      NotifBerhasil(res.message);
      router.back();
    } else {
      NotifPeringatan(res.message);
    }
  });
}
