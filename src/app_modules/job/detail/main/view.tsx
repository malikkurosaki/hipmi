"use client";

import { useRouter } from "next/navigation";
import ComponentJob_DetailData from "../../component/detail/detail_data";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { Stack, Button, Center, Anchor } from "@mantine/core";
import { useAtom } from "jotai";
import { gs_job_status, gs_job_hot_menu } from "../../global_state";
import Link from "next/link";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { MODEL_JOB } from "../../model/interface";
import { gen_page } from "../../../../../gen_page";

export default function Job_MainDetail({
  dataJob,
  hostName,
}: {
  dataJob: MODEL_JOB;
  hostName: string;
}) {
  return (
    <>
      <Stack>
        {/* <Anchor href={gen_page.devForumMain()}>kesana</Anchor> */}
        <ComponentJob_DetailData data={dataJob} />
        <ButtonAction jobId={dataJob.id} hostName={hostName} />
      </Stack>
    </>
  );
}

function ButtonAction({
  jobId,
  hostName,
}: {
  jobId: string;
  hostName: string;
}) {
  const router = useRouter();

  return (
    <>
      <Center>
        <Button
          radius={"xl"}
          color="teal"
          mb={30}
          leftIcon={<IconBrandWhatsapp />}
        >
          <Link
            style={{ textDecoration: "none", color: "white" }}
            href={`whatsapp://send?text=Job Vacancy HIPMI BADUNG : ${hostName}/dev/job/non_user_view/${jobId}`}
            // href={`https://t.me/share/url?url={${"http://localhost:3000/dev/job/non_user_view"}}&text={Lowongan Kerja Ini}`}
          >
            Bagikan ke WhatsApp
          </Link>
        </Button>
      </Center>
    </>
  );
}
