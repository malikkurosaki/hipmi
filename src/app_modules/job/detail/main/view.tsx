"use client";

import { Button, Center, Stack } from "@mantine/core";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ComponentJob_DetailData from "../../component/detail/detail_data";
import { MODEL_JOB } from "../../model/interface";

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
          my={"lg"}
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
