"use client";

import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { MODEL_DONASI } from "@/app_modules/donasi/model/interface";
import mqtt_client from "@/util/mqtt_client";
import {
  Button,
  Group,
  Modal,
  SimpleGrid,
  Stack,
  Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "../../_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "../../_admin_global/admin_notifikasi/notifikasi_gagal";
import { ComponentAdminGlobal_NotifikasiPeringatan } from "../../_admin_global/admin_notifikasi/notifikasi_peringatan";
import AdminGlobal_ComponentBackButton from "../../_admin_global/back_button";
import adminNotifikasi_funCreateToUser from "../../notifikasi/fun/create/fun_create_notif_user";
import ComponentAdminDonasi_CeritaPenggalangDana from "../component/tampilan_detail_cerita";
import ComponentAdminDonasi_TampilanDetailDonasi from "../component/tampilan_detail_donasi";
import { AdminDonasi_getOneById } from "../fun/get/get_one_by_id";
import { AdminDonasi_funUpdateStatusPublish } from "../fun/update/fun_status_publish";
import { AdminDonasi_funUpdateStatusReject } from "../fun/update/fun_status_reject";
import { Admin_ComponentModalReport } from "../../_admin_global/_component";

export default function AdminDonasi_DetailReview({
  dataReview,
}: {
  dataReview: MODEL_DONASI;
}) {
  const [data, setData] = useState(dataReview);

  return (
    <>
      <Stack>
        <ButtonOnHeader donasi={data} setData={setData} />
        <SimpleGrid
          cols={2}
          spacing="lg"
          breakpoints={[
            { maxWidth: "md", cols: 2, spacing: "md" },
            { maxWidth: "sm", cols: 1, spacing: "sm" },
            { maxWidth: "xs", cols: 1, spacing: "xs" },
          ]}
        >
          <ComponentAdminDonasi_TampilanDetailDonasi donasi={data} />
          <ComponentAdminDonasi_CeritaPenggalangDana
            cerita={data.CeritaDonasi}
          />
        </SimpleGrid>
      </Stack>
    </>
  );
}

function ButtonOnHeader({
  donasi,
  setData,
}: {
  donasi: MODEL_DONASI;
  setData: any;
}) {
  const router = useRouter();
  const [isLoadingPublish, setLoadingPublish] = useState(false);
  const [isLoadingReject, setLoadingReject] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [catatan, setCatatan] = useState("");

  async function onPulish() {
    const res = await AdminDonasi_funUpdateStatusPublish(donasi.id, "1");
    if (res.status === 200) {
      const dataNotif = {
        appId: res.data?.id,
        status: res.data?.DonasiMaster_Status?.name as any,
        userId: res.data?.authorId as any,
        pesan: res.data?.title as any,
        kategoriApp: "DONASI",
        title: "Donasi publish",
      };

      const notif = await adminNotifikasi_funCreateToUser({
        data: dataNotif as any,
      });

      if (notif.status === 201) {
        mqtt_client.publish(
          "USER",
          JSON.stringify({ userId: res?.data?.authorId, count: 1 })
        );
        const newData = await AdminDonasi_getOneById(donasi?.id);
        setData(newData);
        ComponentAdminGlobal_NotifikasiBerhasil(
          "Berhasil Mengubah Status Donasi"
        );
        setLoadingPublish(true);
      }
    } else {
      ComponentAdminGlobal_NotifikasiPeringatan("Gagal Mengubah Status Donasi");
    }
  }

  async function onReject() {
    if (catatan === "")
      return ComponentAdminGlobal_NotifikasiPeringatan(
        "Lengkapi Alasan Penolakan"
      );

    const res = await AdminDonasi_funUpdateStatusReject(
      donasi.id,
      "4",
      catatan
    );
    if (res.status === 200) {
      const dataNotif = {
        appId: res.data?.id,
        status: res.data?.DonasiMaster_Status?.name as any,
        userId: res.data?.authorId as any,
        pesan: res.data?.title as any,
        kategoriApp: "DONASI",
        title: "Donasi anda di tolak !",
      };

      const notif = await adminNotifikasi_funCreateToUser({
        data: dataNotif as any,
      });

      if (notif.status === 201) {
        mqtt_client.publish(
          "USER",
          JSON.stringify({ userId: res?.data?.authorId, count: 1 })
        );
      }

      const newData = await AdminDonasi_getOneById(donasi?.id);
      setData(newData);
      close();
      ComponentAdminGlobal_NotifikasiBerhasil(res.message);
      setLoadingReject(true);
    } else {
      ComponentAdminGlobal_NotifikasiGagal(res.message);
    }
  }

  return (
    <>
      <Group position="apart">
        <AdminGlobal_ComponentBackButton />
        {donasi.donasiMaster_StatusDonasiId === "2" ? (
          <Group>
            <Button
              radius={"xl"}
              bg={"green"}
              color="green"
              onClick={() => onPulish()}
            >
              Publish
            </Button>
            <Button radius={"xl"} bg={"red"} color="red" onClick={open}>
              Reject
            </Button>
          </Group>
        ) : (
          ""
        )}
      </Group>
      {/* <Divider /> */}

      <Admin_ComponentModalReport
        opened={opened}
        onClose={close}
        title={"Alasan penolakan"}
        onHandlerChange={(val: any) => setCatatan(val.target.value)}
        buttonKiri={
          <>
            <Button
              radius={"xl"}
              onClick={() => {
                close();
              }}
            >
              Batal
            </Button>
          </>
        }
        buttonKanan={
          <>
            <Button
              loaderPosition="center"
              loading={isLoadingReject ? true : false}
              radius={"xl"}
              onClick={() => {
                onReject();
              }}
            >
              Simpan
            </Button>
          </>
        }
        cekInputKarakter={
          <>
            <ComponentGlobal_InputCountDown
              maxInput={300}
              lengthInput={catatan.length}
            />
          </>
        }
      />

      {/* <Modal
        opened={opened}
        onClose={close}
        centered
        size={"lg"}
        withCloseButton={false}
      >
        <Stack>
          <Textarea
            autosize
            minRows={3}
            maxRows={5}
            maxLength={300}
            label="Alasan penolakan"
            placeholder="Masukan alasan penolakan"
            onChange={(val) => setCatatan(val.target.value)}
          />
          <ComponentGlobal_InputCountDown
            maxInput={300}
            lengthInput={catatan.length}
          />

          <Group position="right"></Group>
        </Stack>
      </Modal> */}
    </>
  );
}
