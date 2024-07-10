import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import { Button, Group, Modal, Stack, Title } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import router from "next/router";
import { useState } from "react";
import { Portofolio_funDeletePortofolioById } from "../fun/delete/fun_delete_by_id";
import { MODEL_PORTOFOLIO } from "../model/interface";
import { useRouter } from "next/navigation";
import ComponentGlobal_UI_Modal from "@/app_modules/component_global/ui/ui_modal";

export function ComponentPortofolio_ButtonDelete({
  userLoginId,
  dataPorto,
}: {
  userLoginId: string;
  dataPorto: MODEL_PORTOFOLIO;
}) {
  const router = useRouter();
  const [openModal, setModal] = useState(false);
  const [loadingDel, setLoadingDel] = useState(false);

  return (
    <>
      {userLoginId === dataPorto?.Profile.userId ? (
        <Button
          radius={"xl"}
          bg={"red"}
          color="red"
          onClick={() => {
            setModal(true)
          }}
        >
          <IconTrash />
        </Button>
      ) : (
        ""
      )}

      <ComponentGlobal_UI_Modal
        title={"Anda yakin menghapus portofolio ini ?"}
        opened={openModal}
        close={() => setModal(false)}
        buttonKiri={
          <Button radius={"xl"} onClick={() => setModal(false)}>
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            radius={"xl"}
            color="red"
            loaderPosition="center"
            loading={loadingDel ? true : false}
            onClick={() => onDelete(router, dataPorto as any, setLoadingDel)}
          >
            Hapus
          </Button>
        }
      />
    </>
  );
}

async function onDelete(
  router: AppRouterInstance,
  dataPorto: MODEL_PORTOFOLIO,
  setLoadingDel: any
) {
  await Portofolio_funDeletePortofolioById(dataPorto).then((res) => {
    if (res.status === 200) {
      setLoadingDel(true);
      ComponentGlobal_NotifikasiBerhasil(res.message);
      router.back();
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}
