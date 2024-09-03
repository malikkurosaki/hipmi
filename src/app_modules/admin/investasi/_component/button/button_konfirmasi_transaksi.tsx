import { Button, Stack } from "@mantine/core";
import {
  adminInvestasi_funAcceptTransaksiById,
  adminInvestasi_funGetAllTransaksiById,
  adminInvestasi_funRejectInvoiceById,
} from "../../fun";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_gagal";
import { useState } from "react";
import { IconCircleCheck } from "@tabler/icons-react";
import { IconBan } from "@tabler/icons-react";

export function AdminInvestasi_ComponentButtonKonfirmasiTransaksi({
  invoiceId,
  investasiId,
  onLoadData,
}: {
  invoiceId: string;
  investasiId: string;
  onLoadData: (val: any) => void;
}) {
  const [isLoadingAccpet, setLoadingAccept] = useState(false);
  const [isLoadingReject, setLoadingReject] = useState(false);

  async function onReject() {
    const res = await adminInvestasi_funRejectInvoiceById({ invoiceId });
    if (res.status == 200) {
      try {
        const dataTransaksi = await adminInvestasi_funGetAllTransaksiById({
          investasiId,
          page: 1,
        });
        onLoadData(dataTransaksi);
      } catch (error) {
        console.log(error);
      } finally {
        ComponentAdminGlobal_NotifikasiBerhasil(res.message);
        setLoadingReject(true);
      }
    } else {
      ComponentAdminGlobal_NotifikasiGagal(res.message);
    }
  }

  async function onAccept() {
    const res = await adminInvestasi_funAcceptTransaksiById({ invoiceId });

    if (res.status == 200) {
      try {
        const dataTransaksi = await adminInvestasi_funGetAllTransaksiById({
          investasiId,
          page: 1,
        });
        onLoadData(dataTransaksi);
      } catch (error) {
        console.log(error);
      } finally {
        ComponentAdminGlobal_NotifikasiBerhasil(res.message);
        setLoadingAccept(true);
      }
    } else {
      ComponentAdminGlobal_NotifikasiGagal(res.message);
    }
  }

  return (
    <>
      <Stack>
        <Button
          loaderPosition="center"
          loading={isLoadingAccpet}
          leftIcon={<IconCircleCheck />}
          radius={"xl"}
          color="green"
          onClick={() => {
            onAccept();
          }}
        >
          Terima
        </Button>
        <Button
          loaderPosition="center"
          loading={isLoadingReject}
          leftIcon={<IconBan />}
          radius={"xl"}
          color="red"
          onClick={() => onReject()}
        >
          Tolak
        </Button>
      </Stack>
    </>
  );
}
