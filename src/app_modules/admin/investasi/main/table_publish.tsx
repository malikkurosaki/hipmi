import { RouterAdminInvestasi } from "@/app/lib/router_hipmi/router_admin";
import { MODEL_Investasi } from "@/app_modules/investasi/model/model_investasi";
import {
  Badge,
  ActionIcon,
  Box,
  ScrollArea,
  Table,
  Tooltip,
} from "@mantine/core";
import { IconEyeCheck } from "@tabler/icons-react";
import { IconEdit, IconEye } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TablePublish({
  dataInvestsi,
}: {
  dataInvestsi: MODEL_Investasi[];
}) {
  const [investasi, setInvestasi] = useState(dataInvestsi);
  const router = useRouter();

  const tableBody = investasi.map((e) =>
    e.MasterStatusInvestasi.id === "3" ? (
      <tr key={e.id}>
        <td>{e.title}</td>
        <td>
          {e.MasterStatusInvestasi.id === "3" ? (
            <Badge variant="dot" color="green">
              {e.MasterStatusInvestasi.name}
            </Badge>
          ) : (
            "-"
          )}
        </td>
        <td>
          <Tooltip label="Detail" withArrow position="bottom">
            <ActionIcon
              variant="transparent"
              onClick={() =>
                router.push(RouterAdminInvestasi.konfirmasi + `${e.id}`)
              }
            >
              <IconEyeCheck />
            </ActionIcon>
          </Tooltip>
        </td>
      </tr>
    ) : (
      ""
    )
  );

  return (
    <>
      <Box my={"lg"}>
        <ScrollArea w={"100%"}>
          {/* <Title order={5} mb={5}>
              List Publish
            </Title> */}
          <Badge color="green" variant="light" radius={0} size={"xl"}>
            Publish
          </Badge>
          <Table withBorder highlightOnHover>
            <thead>
              <tr>
                <th>Nama Proyek Investasi</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>{tableBody}</tbody>
          </Table>
        </ScrollArea>
      </Box>
    </>
  );
}
