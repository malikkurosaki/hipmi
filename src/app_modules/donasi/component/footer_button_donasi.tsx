"use client";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { Footer, Center, Button } from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { gs_proses_donasi } from "../global_state";

export default function ButtonDonasi({ donasiId }: { donasiId: string }) {
  const router = useRouter();
  const [prosesDonasi, setProsesDonasi] = useAtom(gs_proses_donasi);

  async function onClick() {
    setProsesDonasi({
      ...prosesDonasi,
      bank: "",
      nominal: "",
      norek: "",
    });
    router.push(RouterDonasi.masukan_donasi + `${donasiId}`);
  }

  return (
    <>
      <Footer height={70} px={"md"} sx={{ borderStyle: "none" }}>
        <Center h={70}>
          <Button w={"100%"} radius={"xl"} onClick={() => onClick()}>
            Donasi
          </Button>
        </Center>
      </Footer>
    </>
  );
}
