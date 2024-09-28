"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import {
  Badge,
  Box,
  Center,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import toast from "react-simple-toasts";
import {
  MODEL_Transaksi_Investasi,
  Model_Status_Transaksi_Investasi,
} from "../model/model_investasi";
import { useState } from "react";
import moment from "moment";
import funCountDown from "../fun/fun_countdown_investasi";
import funGantiStatusTransaksi_Investasi from "../fun/fun_ganti_status_transaksi";
import { useInterval, useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import Link from "next/link";
import ComponentInvestasi_IsEmptyData from "../component/is_empty_data";

export default function TransaksiInvestasi({
  statusTransaksi,
  listTransaksi,
}: {
  statusTransaksi: Model_Status_Transaksi_Investasi[];
  listTransaksi: MODEL_Transaksi_Investasi[];
}) {
  const router = useRouter();
  const [status, setStatus] = useState(statusTransaksi);
  const [transaksi, setTransaksi] = useState(listTransaksi);

  async function onKlik(statusId: string, transaksiId: string) {
    // console.log(id)
    if (statusId === "1") {
      return router.push(RouterInvestasi.transfer + transaksiId);
    } else {
      if (statusId === "2") {
        return router.push(RouterInvestasi.transfer);
      } else {
        if (statusId === "3") {
          return router.push(RouterInvestasi.dialog_transaksi);
        } else {
          return router.push(
            RouterInvestasi.status_transaksi_gagal + transaksiId
          );
        }
      }
    }
  }

  if (_.isEmpty(transaksi))
    return (
      <>
        <ComponentInvestasi_IsEmptyData text="Tidak ada transaksi" />
      </>
    );

  return (
    <>
      <Stack>
        {transaksi.map((e) => (
          <Box
            key={e.id}
            onClick={() =>
              router.push(RouterInvestasi.status_pesanan + `${e.id}`)
            }
          >
            <Paper p="xs" bg={"gray"}>
              <Group position="apart">
                <Title order={6}>{e.Investasi.title}</Title>
                <Title order={5}>
                  Rp.
                  {new Intl.NumberFormat("id-ID", {
                    maximumFractionDigits: 10,
                  }).format(+e.gross_amount)}
                </Title>
              </Group>
              <Group position="apart">
                <Stack spacing={0}>
                  {/* <Text fz={"xs"}>Bank {e.namaBank}</Text> */}
                  <Text fz={"xs"}>{moment(e.createdAt).format("ll")}</Text>
                </Stack>
                <Text>{e.quantity} Lembar</Text>
              </Group>
            </Paper>
          </Box>
        ))}
      </Stack>
      {/* <pre>{JSON.stringify(transaksi, null, 2)}</pre> */}
    </>
  );
}
