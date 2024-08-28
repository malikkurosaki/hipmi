import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import {
  Box,
  Paper,
  Group,
  Title,
  Stack,
  Center,
  Badge,
  Text,
  Card,
} from "@mantine/core";
import moment from "moment";
import { MODEL_INVOICE_INVESTASI } from "../../_lib/interface";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { NEW_RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import ComponentGlobal_CardLoadingOverlay from "@/app_modules/_global/loading_card";

export function Investasi_ComponentCardDaftarTransaksi({
  data,
}: {
  data: MODEL_INVOICE_INVESTASI;
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  async function onClick({
    invoiceId,
    statusInvoiceId,
  }: {
    invoiceId: string;
    statusInvoiceId: string;
  }) {
    // Proses
    if (statusInvoiceId === "2") {
      setVisible(true);
      return router.push(NEW_RouterInvestasi.proses_transaksi + invoiceId, {
        scroll: false,
      });
    }

    // Menunggu
    if (statusInvoiceId === "3") {
      setVisible(true);
      return router.push(NEW_RouterInvestasi.invoice + invoiceId, {
        scroll: false,
      });
    }

    ComponentGlobal_NotifikasiPeringatan("Status Belum Tersedia");
  }
  return (
    <>
      <Card
        style={{
          padding: "15px",
          backgroundColor: AccentColor.darkblue,
          border: `2px solid ${AccentColor.blue}`,
          borderRadius: "10px",
          color: "white",
        }}
        mb={"md"}
        onClick={() =>
          onClick({
            invoiceId: data.id,
            statusInvoiceId: data.statusInvoiceId,
          })
        }
      >
        <Group position="apart">
          <Title order={6}>{data.Investasi.title}</Title>
          <Title order={5}>
            Rp.
            {new Intl.NumberFormat("id-ID", {
              maximumFractionDigits: 10,
            }).format(+data.nominal)}
          </Title>
        </Group>
        <Group position="apart">
          <Stack spacing={0}>
            {/* <Text fz={"xs"}>Bank {data.namaBank}</Text> */}
            <Text fz={"xs"}>{moment(data.createdAt).format("ll")}</Text>
          </Stack>
          <Text>{data.lembarTerbeli} Lembar</Text>
        </Group>
        <Center mt={"sm"}>
          <Badge>{data.StatusInvoice.name}</Badge>
        </Center>
        {visible && <ComponentGlobal_CardLoadingOverlay />}
      </Card>
    </>
  );
}
