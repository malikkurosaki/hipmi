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
import { gs_donasi_tabs_posting } from "../../global_state";
import toast from "react-simple-toasts";
import { MODEL_CERITA_DONASI } from "../../model/interface";
import { NotifPeringatan } from "../../component/notifikasi/notif_peringatan";
import _ from "lodash";
import { Donasi_funUpdateCerita } from "../../fun/update/fun_update_cerita_donasi";
import { NotifBerhasil } from "../../component/notifikasi/notif_berhasil";
import {
  ComponentGlobal_WarningMaxUpload,
  maksimalUploadFile,
} from "@/app_modules/_global/component/waring_popup";
import ComponentGlobal_ErrorInput from "@/app_modules/_global/component/error_input";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";

export default function EditCeritaPenggalangDonasi({
  dataCerita,
}: {
  dataCerita: MODEL_CERITA_DONASI;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const [tabsPostingDonasi, setTabsPostingDonasi] = useAtom(
    gs_donasi_tabs_posting
  );
  const [value, setValue] = useState(dataCerita);
  const [file, setFile] = useState<File | null>(null);
  const [updateImage, setUpdateImage] = useState<any | null>();

  return (
    <>
      {/* <pre>{JSON.stringify(value, null, 2)}</pre> */}
      <Stack
        spacing={"md"}
        style={{
          padding: "15px",
          border: `2px solid ${AccentColor.blue}`,
          backgroundColor: AccentColor.darkblue,
          borderRadius: "10px",
          color: "white",
        }}
      >
        <Stack spacing={5}>
          <Textarea
            styles={{
              label: {
                color: "white",
              },
            }}
            autosize
            minRows={2}
            maxRows={7}
            withAsterisk
            label="Pembukaan"
            placeholder="Pembuka dari isi cerita"
            value={value.pembukaan}
            error={
              value.pembukaan === "" ? (
                <ComponentGlobal_ErrorInput text="Masukan pembukaan cerita" />
              ) : (
                ""
              )
            }
            onChange={(val) =>
              setValue({
                ...value,
                pembukaan: val.target.value,
              })
            }
          />
          <ComponentGlobal_InputCountDown
            lengthInput={value.pembukaan.length}
            maxInput={300}
          />
        </Stack>

        <Stack spacing={"lg"}>
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
                    setUpdateImage(buffer);
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
                src={
                  updateImage
                    ? updateImage
                    : RouterDonasi.api_image_cerita +
                      value.imageCeritaDonasi.url
                }
                maw={200}
              />
            </Paper>
          </AspectRatio>
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
            maxRows={7}
            withAsterisk
            label="Cerita"
            placeholder="Ceritakan alasan mengapa harus membuat Penggalangan Dana"
            value={value.cerita}
            error={
              value.cerita === "" ? (
                <ComponentGlobal_ErrorInput text="Masukan pembukaan cerita" />
              ) : (
                ""
              )
            }
            onChange={(val) =>
              setValue({
                ...value,
                cerita: val.target.value,
              })
            }
          />
          <ComponentGlobal_InputCountDown
            lengthInput={value.cerita.length}
            maxInput={300}
          />
        </Stack>

        <Button
          style={{
            transition: "0.5s",
          }}
          loaderPosition="center"
          loading={isLoading ? true : false}
          disabled={
            value.cerita === "" || value.pembukaan === "" ? true : false
          }
          w={"100%"}
          radius={"xl"}
          onClick={() => onUpdate(router, value, file as any)}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
        >
          Update
        </Button>
      </Stack>
      {/* <pre> {JSON.stringify(value.pembukaan, null, 2)}</pre> */}
    </>
  );
}

async function onUpdate(
  router: any,
  value: MODEL_CERITA_DONASI,
  file: FormData
) {
  // router.back();
  const body = {
    id: value.id,
    pembukaan: value.pembukaan,
    cerita: value.cerita,
    imagesId: value.imageCeritaDonasi.id,
  };

  const gambar = new FormData();
  gambar.append("file", file as any);

  if (_.values(body).includes("")) return NotifPeringatan("Lengkapi Data");
  await Donasi_funUpdateCerita(body as any, gambar).then((res) => {
    if (res.status === 200) {
      NotifBerhasil(res.message);
      router.back();
    } else {
      toast(res.message);
    }
  });
}
