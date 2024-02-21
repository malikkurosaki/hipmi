"use client";

import { useRouter } from "next/navigation";
import ComponentJob_DetailData from "../../component/detail/detail_data";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { Stack, Button, Center } from "@mantine/core";
import { useAtom } from "jotai";
import { gs_job_status, gs_job_hot_menu } from "../../global_state";
import Link from "next/link";
import { IconBrandWhatsapp } from "@tabler/icons-react";

export default function Job_MainDetail() {
  return (
    <>
      <Stack>
        <ComponentJob_DetailData />
        <ButtonAction />
      </Stack>
    </>
  );
}

function ButtonAction() {
  const router = useRouter();
  const [status, setStatus] = useAtom(gs_job_status);
  const [hotMenu, setHotMenu] = useAtom(gs_job_hot_menu);

  async function onAction() {
    // router.push(RouterJob.arsip);
    // setStatus("Publish");
    // setHotMenu(3);
    // ComponentGlobal_NotifikasiBerhasil("Berhasil Diarsipkan");
  }

  return (
    <>
      <Center>
        <Button
          radius={"xl"}
          color="teal"
          mb={30}
          leftIcon={<IconBrandWhatsapp />}
          onClick={() => {
            onAction();
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "white" }}
            href={`whatsapp://send?text=Job Vacancy HIPMI BADUNG : http://localhost:3000/dev/job/non_user_view`}
            // href={`https://t.me/share/url?url={${"http://localhost:3000/dev/job/non_user_view"}}&text={Lowongan Kerja Ini}`}
          >
            Bagikan ke WhatsApp
          </Link>
        </Button>
      </Center>
    </>
  );
}
