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
  Avatar,
  Group,
  Text,
  Center,
} from "@mantine/core";
import { IconChevronLeft, IconEyeCheck } from "@tabler/icons-react";
import { IconEdit, IconEye } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Admin_TablePublishInvestasi({
  dataInvestsi,
}: {
  dataInvestsi: MODEL_Investasi[];
}) {
  const [investasi, setInvestasi] = useState(dataInvestsi);
  const router = useRouter();

  // console.log(investasi);

  const tableBody = investasi.map((e) =>
    e.MasterStatusInvestasi.id === "3" ? (
      <tr key={e.id}>
        <td>
          <Group position="left">
            <Avatar variant="outline" radius={"xl"} />
            <Text>{e.author.username}</Text>
          </Group>
        </td>
        <td>{e.title}</td>
        <td>
          <Center> {e.progress} %</Center>
        </td>
        <td>
          <Center> {new Intl.NumberFormat("id-ID", {maximumFractionDigits: 10}).format(+e.sisaLembar)}</Center>
        </td>
        <td>
        <Center> {new Intl.NumberFormat("id-ID", {maximumFractionDigits: 10}).format(+e.totalLembar)}</Center>

        </td>
        <td>
          <Center>
            <Tooltip label="Detail" withArrow position="bottom">
              <ActionIcon
                variant="transparent"
                onClick={() =>
                  router.push(RouterAdminInvestasi.konfirmasi + `${e.id}`)
                }
              >
                <IconEyeCheck color="green" />
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
      <ActionIcon variant="outline" onClick={() => router.push(RouterAdminInvestasi.main_investasi)}>

          <IconChevronLeft />
        </ActionIcon>
        <Box>
          <ScrollArea w={"100%"}>
            {/* <Title order={5} mb={5}>
              List Publish
            </Title> */}
            <Badge color="green" variant="light" radius={0} size={"xl"}>
              Publish
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
                  <th>
                    <Center>Progres</Center>
                  </th>
                  <th>
                    <Center>Sisa Saham</Center>
                  </th>
                  <th>
                    <Center>Total Saham</Center>
                  </th>
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
