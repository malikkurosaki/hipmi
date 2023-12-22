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
import { gs_donasi_tabs_posting } from "../../global_state";
import toast from "react-simple-toasts";

export default function EditCeritaPenggalangDonasi() {
  const router = useRouter();
  const [tabsPostingDonasi, setTabsPostingDonasi] = useAtom(
    gs_donasi_tabs_posting
  );
  const [value, setValue] = useState({
    pembukaan: "",
    cerita: "",
  });
  async function onUpdate() {
    router.back();
    toast("Berhasil update cerita")

  }
  return (
    <>
      <Stack spacing={"md"} px={"md"}>
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
        <Button w={"100%"} radius={"xl"} onClick={() => onUpdate()}>
          Simpan
        </Button>
      </Stack>
      {/* <pre> {JSON.stringify(value.pembukaan, null, 2)}</pre> */}
    </>
  );
}
