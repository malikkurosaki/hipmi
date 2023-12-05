"use client";
import { RouterAdminInvestasi } from "@/app/lib/router_hipmi/router_admin";
import { MODEL_Investasi } from "@/app_modules/investasi/model/model_investasi";
import {
  Badge,
  ActionIcon,
  Box,
  ScrollArea,
  Table,
  Tooltip,
  Stack,
  Group,
  Avatar,
  Text,
  Center,
} from "@mantine/core";
import { IconChevronLeft, IconEdit } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Admin_TableReviewInvestasi({
  dataInvestsi,
}: {
  dataInvestsi: MODEL_Investasi[];
}) {
  const [investasi, setInvestasi] = useState(dataInvestsi);
  const router = useRouter();

  const tableBody = investasi.map((e) =>
    e.MasterStatusInvestasi.id === "2" ? (
      <tr key={e.id}>
        <td>
          <Group position="left">
            <Avatar variant="outline" radius={"xl"} />
            <Text>{e.author.username}</Text>
          </Group>
        </td>
        <td>
          {e.title}
        </td>
        <td>
          <Center>
            {e.ProspektusInvestasi === null ? (
              <Badge color="red">Unavailable</Badge>
            ) : (
              <Badge variant="dot" color="green">
                Available
              </Badge>
            )}
          </Center>
        </td>
        <td>
          <Center>
          <Tooltip label="Konfirmasi" withArrow position="bottom">
            <ActionIcon
              variant="transparent"
              onClick={() =>
                router.push(RouterAdminInvestasi.konfirmasi + `${e.id}`)
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
        <ActionIcon variant="outline" onClick={() => router.back()}>
          <IconChevronLeft />
        </ActionIcon>
        <Box>
          <ScrollArea w={"100%"}>
            <Badge color="orange" variant="light" radius={0} size={"xl"}>
              Review
            </Badge>
            <Table withBorder highlightOnHover verticalSpacing={"md"} horizontalSpacing={"md"}>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Nama Proyek Investasi</th>
                  <th><Center>File Prospektus</Center></th>
                  <th><Center>Aksi</Center></th>
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
