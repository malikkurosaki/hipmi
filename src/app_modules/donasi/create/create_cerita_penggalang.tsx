"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  AspectRatio,
  Button,
  Center,
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
import BoxInformasiDonasi from "../component/box_informasi";

export default function CreateCeritaPenggalangDonasi() {
  const router = useRouter();
  const [tabsPostingDonasi, setTabsPostingDonasi] = useAtom(
    gs_donasi_tabs_posting
  );
  const [value, setValue] = useState({
    pembukaan: "",
    cerita: "",
  });
  async function onCreate() {
    router.push(RouterDonasi.page_pop_up_create)
setTabsPostingDonasi("Review")
  }
  return (
    <>
      <Stack spacing={"md"} px={"md"}>
        <BoxInformasiDonasi informasi="Ceritakan dengan jujur & benar mengapa Penggalanagn Dana ini harus diadakan!"/>
        <Textarea
          autosize
          minRows={2}
          maxRows={4}
          withAsterisk
          label="Pembukaan"
          placeholder="Pembuka dari isi cerita"
          onChange={(val) =>
            setValue({
              ...value,
              pembukaan: val.target.value,
            })
          }
        />
        <Textarea
          autosize
          minRows={2}
          maxRows={10}
          withAsterisk
          label="Cerita"
          placeholder="Ceritakan alasan mengapa harus membuat Penggalangan Dana"
          onChange={(val) =>
            setValue({
              ...value,
              cerita: val.target.value,
            })
          }
        />

        <Stack spacing={"xs"}>
          <Center>
            <Button
              radius={"xl"}
              variant="outline"
              w={150}
              leftIcon={<IconCamera />}
            >
              Upload
            </Button>
          </Center>
          <AspectRatio ratio={16 / 9}>
            <Paper radius={"md"}>
              <Image alt="Foto" src={"/aset/no-img.png"} />
            </Paper>
          </AspectRatio>
        </Stack>
        <Button w={"100%"} radius={"xl"} onClick={() => onCreate()}>
          Simpan
        </Button>
      </Stack>
      {/* <pre> {JSON.stringify(value.pembukaan, null, 2)}</pre> */}
    </>
  );
}
