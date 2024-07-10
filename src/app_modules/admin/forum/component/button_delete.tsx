"use client";

import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { Modal, Stack, Title, Group, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { adminForum_funDeletePostingById } from "../fun/delete/fun_delete_posting_by_id";

export default function ComponentAdminForum_ButtonDeletePosting({
  postingId,
  onSuccesDelete,
}: {
  postingId: string;
  onSuccesDelete: (val: any) => void;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [loadingDel2, setLoadingDel2] = useState(false);

  async function onDelete() {
    await adminForum_funDeletePostingById(postingId).then((res) => {
      if (res.status === 200) {
        setLoadingDel2(false);
        close();
        ComponentGlobal_NotifikasiBerhasil(res.message);
        onSuccesDelete(true);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        <Stack>
          <Title order={5}>Anda yakin menghapus posting ini</Title>
          <Group position="center">
            <Button
              radius={"xl"}
              onClick={() => {
                close();
              }}
            >
              Batal
            </Button>
            <Button
              loaderPosition="center"
              loading={loadingDel2 ? true : false}
              radius={"xl"}
              color="red"
              onClick={() => {
                onDelete();
                setLoadingDel2(true);
              }}
            >
              Hapus
            </Button>
          </Group>
        </Stack>
      </Modal>
      <Button
        fz={"xs"}
        loaderPosition="center"
        radius={"xl"}
        w={170}
        color="red"
        leftIcon={<IconTrash size={15} />}
        onClick={() => {
          // onDelete();
          open();
        }}
      >
        Hapus Posting
      </Button>
    </>
  );
}
