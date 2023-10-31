"use client";

import { Warna } from "@/app/lib/warna";
import { gs_investasiFooter } from "@/app_modules/investasi/g_state";
import {
  AspectRatio,
  Button,
  Center,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import toast from "react-simple-toasts";

export default function MainCrowd() {
  const router = useRouter();
  const [changeColor, setChangeColor] = useAtom(gs_investasiFooter);
  return (
    <>
      <Stack>
        
        <Paper bg={"gray"}>
          <AspectRatio ratio={16 / 9}>
            <Image alt="" src={"/aset/logo.png"} />
          </AspectRatio>
        </Paper>
        <Stack align="center">
          <Button
            w={300}
            radius={50}
            bg={Warna.hijau_tua}
            color="green"
            onClick={() => {
              router.push("/dev/investasi/main");
              setChangeColor(false);
            }}
          >
            Investasi
          </Button>
          <Button
            w={300}
            bg={Warna.biru}
            radius={50}
            onClick={() => toast("Cooming Soon Feature...")}
          >
            Donasi
          </Button>
        </Stack>
      </Stack>
     
    </>
  );
}
