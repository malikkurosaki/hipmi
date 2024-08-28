import { RouterAdminDonasi } from "@/app/lib/router_admin/router_admin_donasi";
import TampilanRupiahDonasi from "@/app_modules/donasi/component/tampilan_rupiah";
import { MODEL_DONASI_INVOICE } from "@/app_modules/donasi/model/interface";
import {
  Stack,
  Group,
  Title,
  ActionIcon,
  Select,
  Paper,
  ScrollArea,
  Table,
  Center,
  Pagination,
  Badge,
  Button,
} from "@mantine/core";
import { IconReload } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminInvestasi_ViewDaftarTransaksi({
  dataTransaksi,
}: {
  dataTransaksi: any;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [idData, setIdData] = useState("");
  const [data, setData] = useState<MODEL_DONASI_INVOICE[]>(
    dataTransaksi.data
  );
  const [isNPage, setNPage] = useState(dataTransaksi.nPage);
  const [isActivePage, setActivePage] = useState(1);
  const [isSelect, setSelect] = useState("");

  const tableRows = data?.map((e, i) => (
    <tr key={i}>
      <td>
        <Center>{e?.Author.username}</Center>
      </td>
      <td>
        <Center>{e?.DonasiMaster_Bank?.name}</Center>
      </td>
      <td>
        <Center>
          <TampilanRupiahDonasi nominal={+e?.nominal} />
        </Center>
      </td>
      <td>
        <Center>
          {new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(
            e?.createdAt
          )}
        </Center>
      </td>
      <td>
        <Center>
          <Badge w={150} variant="dot">
            {e?.DonasiMaster_StatusInvoice?.name}
          </Badge>
        </Center>
      </td>
      <td>
        <Center>
          {e?.donasiMaster_StatusInvoiceId === "1" ||
          e?.donasiMaster_StatusInvoiceId === "2" ? (
            <Button
              radius={"xl"}
              onClick={() =>
                router.push(
                  RouterAdminDonasi.transfer_invoice + `${e?.imagesId}`
                )
              }
            >
              Cek
            </Button>
          ) : (
            "-"
          )}
        </Center>
      </td>
      <td>
        test
        {/* <Center>
            {e?.donasiMaster_StatusInvoiceId === "1" ? (
              <Button radius={"xl"} disabled>
                Selesai
              </Button>
            ) : e?.DonasiMaster_StatusInvoice?.id === "2" ? (
              <ButtonAccept
                invoiceId={e?.id}
                donasiId={dataDonasi?.id}
                nominal={+e?.nominal}
                danaTerkumpul={+dataDonasi?.terkumpul}
                target={+dataDonasi?.target}
                onSuccessDonasi={(val) => {
                  onSuccessDonasi(val);
                }}
                onSuccessDonatur={(val) => {
                  setListDonatur(val.data);
                  setNPage(val.nPage);
                }}
              />
            ) : (
              <Text>-</Text>
            )}
          </Center> */}
      </td>
    </tr>
  ));
  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        {/* <pre>{JSON.stringify(dataDonasi, null, 2)}</pre> */}
        <Group
          position="apart"
          bg={"gray.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4}>Transaksi</Title>
          <Group>
            <ActionIcon
              size={"lg"}
              radius={"xl"}
              variant="light"
              onClick={() => {
                //   onRelaod();
              }}
            >
              <IconReload />
            </ActionIcon>
            <Select
              placeholder="Pilih status"
              value={isSelect}
              data={[]}
              // data={listMasterStatus.map((e) => ({
              //   value: e.id,
              //   label: e.name,
              // }))}
              // onChange={(val) => {
              //   onSelect(val);
              // }}
            />
          </Group>
        </Group>

        <Paper p={"md"} withBorder shadow="lg" h={"80vh"}>
          <ScrollArea w={"100%"} h={"90%"}>
            <Table
              verticalSpacing={"xl"}
              horizontalSpacing={"md"}
              p={"md"}
              w={1500}
              striped
              highlightOnHover
            >
              <thead>
                <tr>
                  <th>
                    <Center>Nama Investor</Center>
                  </th>
                  <th>
                    <Center>Nama Bank</Center>
                  </th>
                  <th>
                    <Center>Jumlah Investasi</Center>
                  </th>
                  <th>
                    <Center>Tanggal</Center>
                  </th>
                  <th>
                    <Center>Status</Center>
                  </th>
                  <th>
                    <Center>Bukti Transfer</Center>
                  </th>
                  <th>
                    <Center>Aksi</Center>
                  </th>
                </tr>
              </thead>
              <tbody>{tableRows}</tbody>
            </Table>
          </ScrollArea>

          <Center mt={"xl"}>
            <Pagination
              value={isActivePage}
              total={isNPage}
              onChange={(val) => {
                //   onPageClick(val);
              }}
            />
          </Center>
        </Paper>
      </Stack>
    </>
  );
}
