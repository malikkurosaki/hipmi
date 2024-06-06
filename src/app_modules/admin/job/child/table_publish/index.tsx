"use client";

import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/component_global/header_tamplate";
import { MODEL_JOB } from "@/app_modules/job/model/interface";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Divider,
  Grid,
  Group,
  Image,
  Modal,
  Paper,
  ScrollArea,
  Spoiler,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBan, IconEyeCheck, IconEyeShare } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminJob_TablePublish({
  dataVote,
}: {
  dataVote?: any;
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Job Vacancy: Table Publish" />
        <TableStatus listReview={dataVote} />
      </Stack>
    </>
  );
}

function TableStatus({ listReview }: { listReview: MODEL_JOB[] }) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState(listReview);
  const [img, setImg] = useState("");

  const TableRows = data?.map((e, i) => (
    <tr key={i}>
      <td>
        <Spoiler
          w={200}
          maxHeight={50}
          hideLabel="sembunyikan"
          showLabel="tampilkan"
        >
          {e.title}
        </Spoiler>
      </td>
      <td>
        <Center w={150}>
          {e.imagesId ? (
            <Button
              color="green"
              radius={"xl"}
              leftIcon={<IconEyeCheck />}
              onClick={() => {
                setImg(e.imagesId);
                open();
              }}
            >
              Lihat
            </Button>
          ) : (
            <Center w={150}>
              <Text fw={"bold"} fz={"xs"} fs={"italic"}>
                Tidak ada poster
              </Text>
            </Center>
          )}
        </Center>
      </td>
      <td>
        <Spoiler
          hideLabel="sembunyikan"
          w={400}
          maxHeight={50}
          showLabel="tampilkan"
        >
          <div dangerouslySetInnerHTML={{ __html: e.content }} />
        </Spoiler>
      </td>
      <td>
        <Spoiler
          hideLabel="sembunyikan"
          w={400}
          maxHeight={50}
          showLabel="tampilkan"
        >
          <div dangerouslySetInnerHTML={{ __html: e.deskripsi }} />
        </Spoiler>
      </td>
    </tr>
  ));

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        <Center>
          <Image
            alt="Foto"
            src={RouterJob.api_gambar + img}
            mah={500}
            maw={300}
          />
        </Center>
      </Modal>

      <Box>
        <Box bg={"green.1"} p={"xs"}>
          <Title order={6} c={"green"}>
            PUBLISH
          </Title>
        </Box>
        <ScrollArea w={"100%"}>
          <Table
            withBorder
            verticalSpacing={"md"}
            horizontalSpacing={"xl"}
            p={"md"}
            striped
            highlightOnHover
          >
            <thead>
              <tr>
                <th>
                  <Center>Judul</Center>
                </th>
                <th>
                  <Center>Poster</Center>
                </th>
                <th>
                  <Center>Syarat Ketentuan</Center>
                </th>
                <th>
                  <Center>Deskripsi</Center>
                </th>
              </tr>
            </thead>
            <tbody>{TableRows}</tbody>
          </Table>
        </ScrollArea>
        <Center>
          {_.isEmpty(TableRows) ? (
            <Center h={"50vh"}>
              <Title order={6}>Tidak Ada Data</Title>
            </Center>
          ) : (
            ""
          )}
        </Center>
      </Box>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  );
}
