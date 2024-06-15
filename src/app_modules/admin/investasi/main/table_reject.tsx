"use client";
import { RouterAdminInvestasi_OLD } from "@/app/lib/router_hipmi/router_admin";
import { MODEL_Investasi } from "@/app_modules/investasi/model/model_investasi";
import {
  Badge,
  ActionIcon,
  Box,
  ScrollArea,
  Table,
  Tooltip,
  Stack,
  Center,
  Avatar,
  Group,
  Text,
} from "@mantine/core";
import { IconChevronLeft, IconEdit } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Admin_TableRejectInvestasi({
  dataInvestsi,
}: {
  dataInvestsi: MODEL_Investasi[];
}) {
  const [investasi, setInvestasi] = useState(dataInvestsi);
  const router = useRouter();

  const tableBody = investasi.map((e) =>
    e.MasterStatusInvestasi.id === "4" ? (
      <tr key={e.id}>
        <td>
          <Group position="left">
            <Avatar variant="outline" radius={"xl"} />
            <Text>{e.author.username}</Text>
          </Group>
        </td>
        <td>{_.capitalize(e.title)}</td>
        <td>{e.catatan}</td>
        <td>
          <Center>
            <Tooltip label="Konfirmasi" withArrow position="bottom">
              <ActionIcon
                variant="transparent"
                onClick={() =>
                  router.push(RouterAdminInvestasi_OLD.konfirmasi + `${e.id}`)
                }
              >
                <IconEdit color="green" />
              </ActionIcon>
            </Tooltip>
          </Center>
        </td>
      </tr>
    ) : (
      ""
    )
  );

  return (
    <>
      <Stack>
      <ActionIcon variant="outline" onClick={() => router.push(RouterAdminInvestasi_OLD.main_investasi)}>

          <IconChevronLeft />
        </ActionIcon>
        <Box>
          <ScrollArea w={"100%"}>
            <Badge color="red" variant="light" radius={0} size={"xl"}>
              Reject
            </Badge>
            <Table
              withBorder
              highlightOnHover
              verticalSpacing={"md"}
              horizontalSpacing={"md"}
            >
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Nama Proyek Investasi</th>
                  <th>Catatan</th>
                  <th>
                    <Center>Aksi</Center>
                  </th>
                </tr>
              </thead>
              <tbody>{tableBody}</tbody>
            </Table>
          </ScrollArea>
        </Box>
      </Stack>
    </>
  );
}
