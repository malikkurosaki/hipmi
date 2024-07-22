"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import {
  ComponentGlobal_WarningMaxUpload,
  maksimalUploadFile,
} from "@/app_modules/_global/component/waring_popup";
import {
  AspectRatio,
  Button,
  Center,
  FileButton,
  Image,
  Paper,
  Stack,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import { useAtom } from "jotai";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-simple-toasts";
import ComponentDonasi_NotedBox from "../component/noted_box";
import { NotifPeringatan } from "../component/notifikasi/notif_peringatan";
import { Donasi_funCreate } from "../fun/create/fun_create_donasi";
import { gs_donasi_hot_menu, gs_donasi_tabs_posting } from "../global_state";
import { MODEL_DONASI_TEMPORARY } from "../model/interface";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
export default function CreateCeritaPenggalangDonasi({
  dataTemporary,
  userId,
}: {
  dataTemporary: MODEL_DONASI_TEMPORARY;
  userId: string;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const [tabsPostingDonasi, setTabsPostingDonasi] = useAtom(
    gs_donasi_tabs_posting
  );
  const [donasiHotMenu, setDonasiHotMenu] = useAtom(gs_donasi_hot_menu);

  const [create, setCreate] = useState({
    pembukaan: "",
    cerita: "",
    namaBank: "",
    rekening: "",
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
      namaBank: create.namaBank,
      rekening: create.rekening,
      CeritaDonasi: {
        pembukaan: create.pembukaan,
        cerita: create.cerita,
      },
    };

    await Donasi_funCreate(body as any, gambar).then((res) => {
      if (res.status === 201) {
        setLoading(true);
        router.push(RouterDonasi.page_pop_up_create, { scroll: false });
        setTabsPostingDonasi("Review");
        setDonasiHotMenu(1);
      } else {
        toast(res.message);
      }
    });
  }
  return (
    <>
      <Stack spacing={50} px={"md"} py={"md"}>
        {/* <pre>{JSON.stringify(dataTempo, null, 2)}</pre> */}
        <Stack spacing={"sm"}>
          <ComponentGlobal_BoxInformation informasi="Ceritakan dengan jujur & benar mengapa Penggalanagn Dana ini harus diadakan!" />

          <Stack spacing={5}>
            <Textarea
              styles={{
                label: {
                  color: "white",
                },
              }}
              autosize
              minRows={2}
              maxRows={4}
              withAsterisk
              label="Pembukaan"
              placeholder="Pembuka cerita"
              maxLength={300}
              onChange={(val) =>
                setCreate({
                  ...create,
                  pembukaan: val.target.value,
                })
              }
            />
            <ComponentGlobal_InputCountDown
              maxInput={300}
              lengthInput={create.pembukaan.length}
            />
          </Stack>

          <Stack spacing={5}>
            <Textarea
              styles={{
                label: {
                  color: "white",
                },
              }}
              autosize
              minRows={2}
              maxRows={10}
              withAsterisk
              label="Cerita"
              placeholder="Ceritakan alasan mengapa harus membuat Penggalangan Dana"
              maxLength={300}
              onChange={(val) =>
                setCreate({
                  ...create,
                  cerita: val.target.value,
                })
              }
            />
            <ComponentGlobal_InputCountDown
              maxInput={300}
              lengthInput={create.cerita.length}
            />
          </Stack>

          <Stack spacing={"xs"}>
            <Center>
              <FileButton
                onChange={async (files: any | null) => {
                  try {
                    const buffer = URL.createObjectURL(
                      new Blob([new Uint8Array(await files.arrayBuffer())])
                    );
                    if (files.size > maksimalUploadFile) {
                      ComponentGlobal_WarningMaxUpload({});
                    } else {
                      setImageCerita(buffer);
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
                    {...props}
                    radius={"xl"}
                    leftIcon={<IconCamera />}
                    bg={MainColor.yellow}
                    color="yellow"
                    c={"black"}
                  >
                    Upload
                  </Button>
                )}
              </FileButton>
            </Center>

            {imageCerita ? (
              <AspectRatio ratio={1 / 1} mah={300}>
                <Paper
                  style={{
                    border: `2px solid ${AccentColor.blue}`,
                    backgroundColor: AccentColor.darkblue,
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <Image
                    alt="Foto"
                    src={imageCerita ? imageCerita : "/aset/no-img.png"}
                    maw={200}
                  />
                </Paper>
              </AspectRatio>
            ) : (
              <Center>
                <Text fs={"italic"} fz={10} c={"white"}>
                  Upload poster atau gambar penggalangan !
                </Text>
              </Center>
            )}
          </Stack>
        </Stack>

        <Stack spacing={"sm"}>
          <ComponentGlobal_BoxInformation informasi="Lengkapi nama bank dan rekening di bawah untuk mempermudah admin jika penggalangan dana ini telah di publish!" />
          <TextInput
            styles={{
              label: {
                color: "white",
              },
            }}
            withAsterisk
            placeholder="Contoh: BNI, BCA, MANDIRI, DLL"
            label="Nama Bank"
            maxLength={50}
            onChange={(val) => {
              setCreate({
                ...create,
                namaBank: _.upperCase(val.target.value),
              });
            }}
          />
          <TextInput
            styles={{
              label: {
                color: "white",
              },
            }}
            withAsterisk
            placeholder="Maskuan nomor rekening"
            label="Nomor rekening"
            maxLength={100}
            onChange={(val) => {
              setCreate({
                ...create,
                rekening: val.target.value,
              });
            }}
          />
        </Stack>
        <Button
          style={{
            transition: "0.5s",
          }}
          disabled={
            _.values(create).includes("") || file === null ? true : false
          }
          loaderPosition="center"
          loading={isLoading ? true : false}
          w={"100%"}
          radius={"xl"}
          onClick={() => onCreate()}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
        >
          Simpan
        </Button>
      </Stack>
      {/* <pre> {JSON.stringify(value.pembukaan, null, 2)}</pre> */}
    </>
  );
}
