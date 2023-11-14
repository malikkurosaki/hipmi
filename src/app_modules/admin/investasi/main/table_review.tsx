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
import { IconEdit } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TableReview({
  dataInvestsi,
}: {
  dataInvestsi: MODEL_Investasi[];
}) {
  const [investasi, setInvestasi] = useState(dataInvestsi);
  const router = useRouter();

  const tableBody = investasi.map((e) =>
    e.MasterStatusInvestasi.id === "2" ? (
      <tr key={e.id}>
        <td>{e.title}</td>
        <td>
          {e.MasterStatusInvestasi.id === "2" ? (
            <Badge variant="dot" color="orange">
              {e.MasterStatusInvestasi.name}
            </Badge>
          ) : (
            "-"
          )}
        </td>
        <td>
          <Tooltip label="Konfirmasi" withArrow position="bottom">
            <ActionIcon
              variant="transparent"
              onClick={() =>
                router.push(RouterAdminInvestasi.konfirmasi + `${e.id}`)
              }
            >
              <IconEdit />
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
          <Badge color="orange" variant="light" radius={0} size={"xl"}>
            Review
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
