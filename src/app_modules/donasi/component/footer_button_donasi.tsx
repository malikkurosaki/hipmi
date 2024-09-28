"use client";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { Footer, Center, Button } from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { gs_proses_donasi } from "../global_state";
import { useState } from "react";

export default function ButtonDonasi({ donasiId }: { donasiId: string }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [prosesDonasi, setProsesDonasi] = useAtom(gs_proses_donasi);

  async function onClick() {
    setProsesDonasi({
      ...prosesDonasi,
      bank: "",
      nominal: "",
      norek: "",
    });
    setLoading(true);
    router.push(RouterDonasi.masukan_donasi + `${donasiId}`);
  }

  return (
    <>
      <Footer height={70} px={"md"} sx={{ borderStyle: "none" }}>
        <Center h={70}>
          <Button
            loaderPosition="center"
            loading={isLoading ? true : false}
            w={"100%"}
            radius={"xl"}
            onClick={() => onClick()}
          >
            Donasi
          </Button>
        </Center>
      </Footer>
    </>
  );
}
