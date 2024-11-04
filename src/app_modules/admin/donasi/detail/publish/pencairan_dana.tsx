"use client";

import ComponentGlobal_ErrorInput from "@/app_modules/_global/component/error_input";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_gagal";
import { ComponentAdminGlobal_NotifikasiPeringatan } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_peringatan";
import ComponentAdminGlobal_TampilanRupiahDonasi from "@/app_modules/admin/_admin_global/tampilan_rupiah";
import adminNotifikasi_funCreateToUser from "@/app_modules/admin/notifikasi/fun/create/fun_create_notif_user";
import ComponentDonasi_NotedBox from "@/app_modules/donasi/component/noted_box";
import mqtt_client from "@/util/mqtt_client";
import {
  AspectRatio,
  Button,
  Center,
  FileButton,
  Image,
  Paper,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import _, { toNumber } from "lodash";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentAdminDonasi_TombolKembali from "../../component/tombol_kembali";
import { AdminDonasi_funCreatePencairanDana } from "../../fun/create/fun_create_pencairan_dana";
import { AdminDonasi_getOneById } from "../../fun/get/get_one_by_id";
import { AdminDonasi_AkumulasiPencairanById } from "../../fun/update/fun_update_akumulasi_pencairan";
import { ComponentGlobal_InputCountDown } from "@/app_modules/_global/component";
import { DIRECTORY_ID } from "@/app/lib";
import { funGlobal_UploadToStorage } from "@/app_modules/_global/fun";

export default function AdminDonasi_PencairanDana({
  donasiId,
  danaTerkumpul,
  totalPencairan,
}: {
  donasiId: string;
  danaTerkumpul: string;
  totalPencairan: number;
}) {
  const [terkumpul, setTerkumpul] = useState(danaTerkumpul);
  const [total, setTotal] = useState(totalPencairan);

  return (
    <>
      <Stack>
        <ComponentAdminDonasi_TombolKembali />
        <TotalDanaView danaTerkumpul={terkumpul} totalPencairan={total} />
        <FormView
          danaTerkumpul={terkumpul}
          donasiId={donasiId}
          totalPencairan={total}
          onSuccess={(val) => {
            setTerkumpul(val.terkumpul);
            setTotal(val.totalPencairan);
          }}
        />
      </Stack>
    </>
  );
}

function TotalDanaView({
  danaTerkumpul,
  totalPencairan,
}: {
  danaTerkumpul: string;
  totalPencairan: number;
}) {
  const terkumpul = toNumber(danaTerkumpul);
  const sisaDana = terkumpul - totalPencairan;

  return (
    <>
      <Center>
        <Paper
          p={"md"}
          w={{ base: 200, sm: 200, md: 300, lg: 400 }}
          withBorder
          bg={"gray.2"}
        >
          <Stack spacing={0} align="center">
            <Text fw={"bold"}>Dana Tersisa</Text>
            <Title>
              {
                <ComponentAdminGlobal_TampilanRupiahDonasi
                  nominal={sisaDana}
                  fontSize={20}
                />
              }
            </Title>
          </Stack>
        </Paper>
      </Center>
    </>
  );
}

function FormView({
  donasiId,
  danaTerkumpul,
  totalPencairan,
  onSuccess,
}: {
  donasiId: string;
  danaTerkumpul: string;
  totalPencairan: number;
  onSuccess: (val: any) => void;
}) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<any | null>();
  const [value, setValue] = useState({
    title: "",
    deskripsi: "",
    nilai: "",
  });
  const [nilaiNominal, setNilaiNominal] = useState(0);
  const [isOver, setIsOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const terkumpul = toNumber(danaTerkumpul);
  const sisaDana = terkumpul - totalPencairan;

  async function onSave() {
    const body = {
      donasiId: donasiId,
      nominalCair: nilaiNominal,
      title: value.title,
      deskripsi: value.deskripsi,
    };

    if (_.values(body).includes(""))
      return ComponentAdminGlobal_NotifikasiPeringatan("Lengkapi Data");

    const uploadImage = await funGlobal_UploadToStorage({
      file: file as File,
      dirId: DIRECTORY_ID.donasi_bukti_trf_pencairan_dana,
    });
    if (!uploadImage.success)
      return ComponentAdminGlobal_NotifikasiPeringatan(
        "Gagal upload file gambar"
      );

    const res = await AdminDonasi_funCreatePencairanDana({
      data: body as any,
      fileId: uploadImage.data.id,
    });
    if (res.status === 200) {
      setIsLoading(true);
      const res2 = await AdminDonasi_AkumulasiPencairanById(
        body.donasiId as any,
        body.nominalCair as any
      );
      if (res2.status === 200) {
        const loadData = await AdminDonasi_getOneById(donasiId);
        onSuccess(loadData);

        const dataNotif = {
          appId: loadData?.id,
          userId: loadData?.authorId,
          pesan: loadData?.title as any,
          status: "Pencairan Dana",
          kategoriApp: "DONASI",
          title: "Dana donasi berhasil dicairkan",
        };

        const notif = await adminNotifikasi_funCreateToUser({
          data: dataNotif as any,
        });

        if (notif.status === 201) {
          mqtt_client.publish(
            "USER",
            JSON.stringify({ userId: loadData?.authorId, count: 1 })
          );
        }

        ComponentAdminGlobal_NotifikasiBerhasil(res2.message);
        router.back();
        setIsLoading(false);
      } else {
        ComponentAdminGlobal_NotifikasiGagal(res2.message);
        setIsLoading(false);
      }
    } else {
      ComponentAdminGlobal_NotifikasiGagal(res.message);
      setIsLoading(false);
    }
  }

  return (
    <>
      <Center>
        <Paper p={"md"} w={{ base: 300, sm: 350, md: 400, lg: 500 }} withBorder>
          <Center mb={"lg"}>
            <Title order={5}>Form Pencairan Dana</Title>
          </Center>
          <Stack>
            <TextInput
              icon={<Text fw={"bold"}>Rp.</Text>}
              withAsterisk
              placeholder="0"
              label="Nominal"
              maxLength={sisaDana.toLocaleString().length}
              error={
                isOver ? (
                  <ComponentGlobal_ErrorInput text="Nominal melebihi sisa dana" />
                ) : (
                  ""
                )
              }
              value={value.nilai}
              onChange={(val) => {
                const match = val.currentTarget.value
                  .replace(/\./g, "")
                  .match(/^[0-9]+$/);

                if (val.currentTarget.value === "")
                  return setValue({
                    ...value,
                    nilai: "",
                  });

                if (!match?.[0]) return null;

                const nilai = val.currentTarget.value.replace(/\./g, "");
                const target = Intl.NumberFormat("id-ID").format(+nilai);

                if (+nilai > sisaDana) {
                  setIsOver(true);
                } else {
                  setIsOver(false);
                }
                setNilaiNominal(+nilai);
                setValue({
                  ...value,
                  nilai: target,
                });
              }}
            />
            <TextInput
              withAsterisk
              placeholder="Masukan judul"
              label="Judul"
              maxLength={100}
              onChange={(val: any) => {
                setValue({
                  ...value,
                  title: val.target.value,
                });
              }}
            />
            <Stack spacing={5}>
              <Textarea
                withAsterisk
                placeholder="Masukan deskripsi"
                label="Deskripsi"
                maxLength={300}
                autosize
                minRows={3}
                maxRows={5}
                onChange={(val: any) => {
                  setValue({
                    ...value,
                    deskripsi: val.target.value,
                  });
                }}
              />

              <ComponentGlobal_InputCountDown
                lengthInput={value.deskripsi.length}
                maxInput={300}
              />
            </Stack>

            <ComponentDonasi_NotedBox informasi="Wajib menyertakan bukti transfer" />
            <Stack>
              <Center>
                <FileButton
                  onChange={async (files: any | null) => {
                    try {
                      const buffer = URL.createObjectURL(
                        new Blob([new Uint8Array(await files.arrayBuffer())])
                      );
                   
                      setImages(buffer);
                      setFile(files);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  accept="image/png,image/jpeg"
                >
                  {(props) => (
                    <Button
                      {...props}
                      radius={"xl"}
                      variant="outline"
                      w={150}
                      leftIcon={<IconCamera />}
                      compact
                    >
                      Upload
                    </Button>
                  )}
                </FileButton>
              </Center>
              {images ? (
                <AspectRatio ratio={9 / 16}>
                  <Paper radius={"md"} withBorder>
                    <Image alt="Foto" src={images} />
                  </Paper>
                </AspectRatio>
              ) : (
                ""
              )}
            </Stack>
            <Button
              loaderPosition="center"
              loading={isLoading}
              disabled={
                _.values(value).includes("") || file === null || isOver
                  ? true
                  : false
              }
              style={{ transition: "0.5s" }}
              radius={"xl"}
              mt={"lg"}
              onClick={() => onSave()}
            >
              Simpan
            </Button>
          </Stack>
        </Paper>
      </Center>
    </>
  );
}
