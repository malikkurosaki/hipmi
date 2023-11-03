"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { Badge, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import toast from "react-simple-toasts";

export default function TransaksiInvestasi() {
  const router = useRouter();
  const listStatusTransaksi = [
    { id: 1, name: "Berhasil" },
    { id: 2, name: "Menunggu" },
    { id: 3, name: "Proses" },
    { id: 4, name: "Batal" },
  ];

  const dataDummy = [
    {
      id: 1,
      name: "Judul Investasi",
      status: { id: 1, name: "Berhasil" },
    },
    {
      id: 2,
      name: "Judul Investasi",
      status: { id: 3, name: "Proses" },
    },
    {
      id: 3,
      name: "Judul Investasi",
      status: { id: 2, name: "Menunggu" },
    },
    {
      id: 4,
      name: "Judul Investasi",
      status: { id: 4, name: "Batal" },
    },
    {
      id: 5,
      name: "Judul Investasi",
      status: { id: 1, name: "Berhasil" },
    },
  ];

  async function onKlik(id: any) {
    if (id === 1) {
      return router.push(RouterInvestasi.status_transaksi);
    } else {
      if (id === 2) {
        return router.push(RouterInvestasi.transfer);
      } else {
        if (id === 3) {
            return router.push(RouterInvestasi.dialog_transaksi)
        } else {
            return router.push(RouterInvestasi.status_transaksi_gagal)
        }
      }
    }
  }

  return (
    <>
      <Stack>
        {dataDummy.map((e) => (
          <Paper
            key={e.id}
            p="xs"
            bg={"gray"}
            onClick={() => onKlik(e.status.id)}
          >
            <Group position="apart">
              <Title order={5}>{e.name}</Title>
              <Title order={5}>Rp. 100.000</Title>
            </Group>
            <Group position="apart">
              <Stack spacing={0}>
                <Text fz={"xs"}>Nama Bank</Text>
                <Text fz={"xs"}>10 Oktober 2023</Text>
              </Stack>
              {(() => {
                if (e.status.id === 1) {
                  return (
                    <>
                      <Title order={5} c={"green"}>
                        Berhasil
                      </Title>
                    </>
                  );
                } else {
                  if (e.status.id === 2) {
                    return (
                      <>
                        <Title order={5} c={"orange"}>
                          Menunggu
                        </Title>
                      </>
                    );
                  } else {
                    if (e.status.id === 3) {
                      return (
                        <>
                          <>
                            <Title order={5} c={"blue"}>
                              Proses
                            </Title>
                          </>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <Title order={5} c={"red"}>
                            Dibatalkan
                          </Title>
                        </>
                      );
                    }
                  }
                }
              })()}
            </Group>
          </Paper>
        ))}
      </Stack>
    </>
  );
}
